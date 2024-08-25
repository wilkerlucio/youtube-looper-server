import {WebSocketServer} from 'ws';
import {createFilePersister} from 'tinybase/persisters/persister-file';
import {createMergeableStore} from 'tinybase';
import {createWsServer} from 'tinybase/synchronizers/synchronizer-ws-server';

const PORT = 8047

const server = createWsServer(
  new WebSocketServer({port: PORT}),
  (pathId) => {
    console.log(`Connecting on persister for path ${pathId}`);

    return [
      createFilePersister(
        createMergeableStore(),
        'server-storage/' + pathId.replace(/[^a-zA-Z0-9]/g, '-') + '.json',
      ),
      (store) => store.setValue('pathId', pathId),
    ]
  },
);

console.log(`Server started on port ${PORT}`);

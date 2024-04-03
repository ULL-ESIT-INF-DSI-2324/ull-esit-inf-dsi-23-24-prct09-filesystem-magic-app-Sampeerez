import { connect } from 'net';
import { MessageEventEmitterClient } from './MessageEventEmitterClient.js';

if (process.argv.length !== 3) {
  console.log('Write the path of the json as an argument.');
  process.exit(1);
}

const filePath = process.argv[2];

const client = connect({ port: 60300 });

const messageClient = new MessageEventEmitterClient(client);

messageClient.on('message', (message) => {
  console.log('Message received:', message);
});

client.write(filePath);

import * as net from 'net';
import { spawn } from 'child_process';

const server = net.createServer((socket) => {
  console.log('Client connected.');

  socket.on('data', (data) => {
    const filePath = data.toString().trim();
    
    const wc = spawn('wc', ['-l', '-w', '-c']);
    const cat = spawn('cat', [filePath]);

    cat.stdout.pipe(wc.stdin);

    wc.stdout.on('data', (output) => {
      socket.write(output.toString());
    });

    cat.stderr.on('data', (err) => {
      console.error(`cat error: ${err}`);
      socket.end();
    });

    wc.stderr.on('data', (err) => {
      console.error(`wc error: ${err}`);
      socket.end();
    });

    wc.on('close', () => {
      socket.end();
      console.log('Client disconnected.');
    });
  });
});

server.listen(60300, () => {
  console.log('Server is listening on port 60300');
});

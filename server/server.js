const express = require('express');
const http = require('http');

const expressServer = express();
const httpServer = http.createServer(expressServer);

httpServer.on('listening', () => {
  console.log('Listening on port %s', httpServer.address().port);
});

expressServer.get('/', (req, res) => {
  return res.send('Hello world!');
});

httpServer.on('error', (err) => {
  console.error('>> %s\n%s\n%s', err.name, err.message, err.stack);
  process.exit(2);
});

function start(port) {
  httpServer.listen(port);
}

module.exports = {
  express: expressServer,
  http: httpServer,
  start,
};

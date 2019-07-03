const debug = require('debug')('server:server');
const express = require('express');
const http = require('http');

const expressServer = express();
const httpServer = http.createServer(expressServer);

httpServer.on('listening', () => {
  debug('Listening on port %s', httpServer.address().port);
});

expressServer.get('/', (req, res) => {
  debug('%s from %s', req.method, req.connection.remoteAddress.replace(/.*\:/, ''));
  return res.send('Hello world!');
});

httpServer.on('error', (err) => {
  debug('CRASH http server\n%s', err.message);
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

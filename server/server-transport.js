const debug = require('debug')('server:transport');
const http = require('http');
const serverExpress = require('./server-express.js');

const serverTransport = http.createServer(serverExpress);

serverTransport.on('listening', () => {
  debug('Listening on port %s', serverTransport.address().port);
});

serverTransport.on('error', (err) => {
  debug('CRASH http server\n%s', err.message);
  process.exit(2);
});

function start(port) {
  serverTransport.listen(port);
}

module.exports = {
  express: serverExpress,
  transport: serverTransport,
  start,
};
const logger = require('../tooling/logger.js')('server:transport');
const http = require('http');
const serverExpress = require('./server-express.js');

const serverTransport = http.createServer(serverExpress);

serverTransport.on('listening', () => {
  logger.log('Listening on port %s', serverTransport.address().port);
});

serverTransport.on('error', (err) => {
  const now = logger.getNow();
  logger.log('>> %s CRASH transport server', now);
  logger.error('>> %s %s\n%s\n%s', now, err.name, err.message, err.stack);
  process.exit(2);
});

function start(port) {
  serverTransport.listen(port);
};

module.exports = {
  express: serverExpress,
  transport: serverTransport,
  start,
};
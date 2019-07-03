const logger = require('./tooling/logger.js')('main');
const config = require('./config/config.js');
const server = require('./server/server-transport.js');

logger.log('>> %s LAUNCH', logger.getNow());

server.start(config.get('serverPort'));

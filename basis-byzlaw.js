const logger = require('./tooling/logger.js')('main');
const config = require('./config/config.js');
const database = require('./database/database.js');
const server = require('./server/server-transport.js');

logger.log('>> %s LAUNCH', logger.getNow());

database.connect(config.get('dbConnect'), config.getDBOptions());
server.start(config.get('serverPort'));

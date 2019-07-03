const debug = require('debug')('main');
const config = require('./config/config.js');
const server = require('./server/server.js');

debug('LAUNCH');

server.start(config.get('serverPort'));

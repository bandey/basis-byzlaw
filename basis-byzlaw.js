const config = require('./config/config.js');
const server = require('./server/server.js');

server.start(config.get('serverPort'));

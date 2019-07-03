const logger = require('../tooling/logger.js')('server:express');
const express = require('express');

const serverExpress = express();

serverExpress.get('/', (req, res) => {
  logger.log('>> %s %s from %s\n%s', logger.getNow(), req.method,
      req.connection.remoteAddress.replace(/.*\:/, ''), req.url);
  return res.send('Hello world!');
});

module.exports = serverExpress;
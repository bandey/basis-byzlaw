const debug = require('debug')('server:express');
const express = require('express');

const serverExpress = express();

serverExpress.get('/', (req, res) => {
  debug('%s from %s', req.method, req.connection.remoteAddress.replace(/.*\:/, ''));
  return res.send('Hello world!');
});

module.exports = serverExpress;
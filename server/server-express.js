const logger = require('../tooling/logger.js')('server:express');
const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');

const serverExpress = express();

serverExpress.set('views', path.join(__dirname, '../views'));
serverExpress.set('view engine', 'ejs');
serverExpress.set('layout', 'layout-main');
serverExpress.use(ejsLayouts);

serverExpress.disable('x-powered-by');
serverExpress.get('/', (req, res) => {
  logger.log('>> %s %s from %s\n%s', logger.getNow(), req.method,
      req.connection.remoteAddress.replace(/.*\:/, ''), req.url);
  return res.render('welcome.ejs');
});

module.exports = serverExpress;
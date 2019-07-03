const logger = require('../tooling/logger.js')('server:express');
const config = require('../config/config.js');
const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');

const serverExpress = express();

// Configure views
serverExpress.set('views', path.join(__dirname, '../views'));
serverExpress.set('view engine', 'ejs');
serverExpress.set('layout', 'layout-main');
serverExpress.use(ejsLayouts);

serverExpress.disable('x-powered-by');
serverExpress.get('/', (req, res) => {
  logger.log('>> %s %s from %s\n%s', logger.getNow(), req.method,
      req.connection.remoteAddress.replace(/.*\:/, ''), req.url);
  return res.render('welcome');
});

// Catch 404 error
serverExpress.use((req, res, next) => {
  logger.log('>> %s %s from %s\n%s\nWRONG Route', logger.getNow(), req.method,
    req.connection.remoteAddress.replace(/.*\:/, ''), req.url);
  res.status(404);
  return res.render('error', {
    layout: 'layout-error',
    error: {status: 404, message: 'Not Found'},
  });
});

// Error handler
serverExpress.use((err, req, res, next) => {
  let objErr = {message: err.message};
  objErr.status = err.status || 500;
  if (config.get('nodeEnv') === 'development') {
    objErr.stack = err.stack;
  }

  const now = logger.getNow();
  logger.log('>> %s %s from %s\n%s\nERR express server %d', now, req.method,
    req.connection.remoteAddress.replace(/.*\:/, ''), req.url, objErr.status);
  logger.error('>> %s %s\n%s\n%s', now, err.name, err.message, err.stack);

  res.status(objErr.status);
  return res.render('error', {
    layout: 'layout-error',
    error: objErr,
  });
});

module.exports = serverExpress;
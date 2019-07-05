const logger = require('../tooling/logger.js')('server:express');
const config = require('../config/config.js');
const express = require('express');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const security = require('./security.js');
const router = require('./router.js');

const serverExpress = express();

serverExpress.disable('x-powered-by');

// Wire up logger and set field locals
serverExpress.use((req, res, next) => {
  const now = logger.getNow();
  logger.log('>> %s %s from %s\n%s', now, req.method,
    req.connection.remoteAddress.replace(/.*\:/, ''), req.url);
  res.locals = {now};
  return next();
});

// Configure static content
serverExpress.use(express.static(path.join(__dirname, '../public')));

// Configure views
serverExpress.set('views', path.join(__dirname, '../views'));
serverExpress.set('view engine', 'ejs');
serverExpress.set('layout', 'layout-main');
serverExpress.use(ejsLayouts);

// Configure HTTP protection 
serverExpress.use(security.helmet);

// Configure routes
serverExpress.use('/', router);

// Catch 404 error
serverExpress.use((req, res, next) => {
  logger.log('WRONG Route');
  res.status(404);
  return res.render('error', {
    layout: 'layout-error',
    error: {status: 404, message: 'Not Found'},
  });
});

// Error handler
serverExpress.use((err, req, res, next) => {
  let objErr = {
    status: err.status || 500,
    message: err.message,
    stack: (config.get('nodeEnv') === 'development') ? err.stack : null,
  };

  logger.log('ERR express server %d', objErr.status);
  logger.error('>> %s %s\n%s\n%s', res.locals.now, err.name, err.message, err.stack);

  res.status(objErr.status);
  return res.render('error', {
    layout: 'layout-error',
    error: objErr,
  });
});

module.exports = serverExpress;
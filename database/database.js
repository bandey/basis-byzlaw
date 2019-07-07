const logger = require('../tooling/logger.js')('database');
const mongoose = require('mongoose');

mongoose.connection.on('open', () => {
  logger.log('Connected to mongodb');
});

mongoose.connection.on('error', (err) => {
  const now = logger.getNow();
  logger.log('>> %s CRASH mongodb', now);
  logger.error('>> %s %s\n%s\n%s', now, err.name, err.message, err.stack);
  process.exit(1);
});

module.exports = mongoose;
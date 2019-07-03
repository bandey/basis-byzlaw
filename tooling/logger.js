const debug = require('debug');

const timeLocale = 'ru';
const timeOptions = {
  year   : 'numeric',
  month  : '2-digit',
  day    : '2-digit',
  hour   : '2-digit',
  minute : '2-digit',
  second : '2-digit',
};

function loggerGetNow() {
  const now = new Date();
  return now.toLocaleString(timeLocale, timeOptions);
};

function loggerError() {
  console.log.apply(console, arguments);
};

function loggerLog() {
  console.log.apply(console, arguments);
};

function createLogger(namespace) {
  return {
    getNow: loggerGetNow,
    error: loggerError,
    log: loggerLog,
    debug: debug(namespace),
  };
};

module.exports = createLogger;

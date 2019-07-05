const helmetCreator = require('helmet'); // HTTP headers protection
const hpp = require('hpp'); // protection from HTTP Parameter Pollution attacks

const helmet = helmetCreator({
  frameguard: { action: 'deny' },
  hidePoweredBy: false, // it was made by hand at begining
  hsts: false, // hsts works only for https
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
    },
    reportOnly: false,
    setAllHeaders: false,
    disableAndroid: false,
  },
});

module.exports = {
  helmet,
  hpp,
};
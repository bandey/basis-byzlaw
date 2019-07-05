const convict = require('convict');
const bytes = require('bytes');

const config = convict({
  configFile: {
    doc: 'Path to additional config json file',
    env: 'CONF_FILE',
    format: String,
    default: '',
  },
  nodeEnv: {
    doc: 'Applicaton environment',
    env: 'NODE_ENV',
    format: ['production', 'development'],
    default: 'development',
  },
  serverHTTPS: {
    doc: 'Server secure protocol: true - https, false - http',
    env: 'SERV_HTTPS',
    format: Boolean,
    default: false,
  },
  pathHTTPSKey: {
    doc: 'Path to file with HTTPS key',
    env: 'PATH_HTTPS_KEY',
    format: String,
    default: 'certs/localhost.key',
  },
  pathHTTPSCrt: {
    doc: 'Path to file with HTTPS certificate',
    env: 'PATH_HTTPS_CRT',
    format: String,
    default: 'certs/localhost.crt',
  },
  serverPort: {
    doc: 'Port to bind http or https server',
    env: 'SERV_PORT',
    format: 'port',
    default: 8080,
  },
  loggerMode: {
    doc: 'Mode of logger output',
    env: 'LOG_MODE',
    format: ['none', 'error', 'log', 'both'],
    default: 'both',
  },
  gzipThreshold: {
    doc: 'Threshold for server response size before compression is used',
    env: 'GZIP_THRESHOLD',
    format: (val) => { // Number or String
      const result = bytes.parse(val);
      if ((!result) && (result !== 0)) {
        throw new Error('must be a number of bytes or any string accepted by the bytes module')
      }
    },
    default: '5kb',
  },
});

if (config.get('configFile')) {
  config.loadFile(config.get('configFile'));
}

config.validate({allowed: 'strict'});
 
module.exports = config;

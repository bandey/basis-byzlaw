const convict = require('convict');

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
  serverPort: {
    doc: 'Port to bind http or https server',
    env: 'SERV_PORT',
    format: 'port',
    default: 8080,
  },
});

if (config.get('configFile')) {
  config.loadFile(config.get('configFile'));
}
 
config.validate({allowed: 'strict'});
 
module.exports = config;

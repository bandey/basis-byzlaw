const express = require('express');
const config = require('./config/config.js');

const app = express();

app.get('/', (req, res) => {
  return res.send('Hello world!');
});

app.listen(config.get('serverPort'), () => {
  console.log('Listening on port ' + config.get('serverPort'));
});
const logger = require('../tooling/logger.js')('server:router');
const config = require('../config/config.js');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  return res.render('hello');
});

module.exports = router;
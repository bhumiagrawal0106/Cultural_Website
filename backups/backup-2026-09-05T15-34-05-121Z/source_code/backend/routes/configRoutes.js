const express = require('express');
const config = require('../controllers/configController');

const router = express.Router();

router.get('/', config.get);

module.exports = router;

const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const places = require('../controllers/placeController');

const router = express.Router();

router.get('/', asyncHandler(places.random));

module.exports = router;

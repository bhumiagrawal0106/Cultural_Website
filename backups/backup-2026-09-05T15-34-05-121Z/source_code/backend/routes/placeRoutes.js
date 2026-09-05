const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const places = require('../controllers/placeController');

const router = express.Router();

router.get('/', asyncHandler(places.list));
router.get('/:id', asyncHandler(places.getById));

module.exports = router;

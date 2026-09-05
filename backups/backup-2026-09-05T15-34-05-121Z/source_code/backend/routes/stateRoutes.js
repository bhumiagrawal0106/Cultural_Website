const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const states = require('../controllers/stateController');

const router = express.Router();

router.get('/', asyncHandler(states.list));
router.get('/:slug', asyncHandler(states.getBySlug));

module.exports = router;

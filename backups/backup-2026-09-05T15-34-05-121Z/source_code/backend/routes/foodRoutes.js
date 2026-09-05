const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const Food = require('../models/Food');
const cultureController = require('../controllers/cultureController');

const controller = cultureController(Food, 'Food item');
const router = express.Router();

router.get('/', asyncHandler(controller.list));
router.get('/:id', asyncHandler(controller.getById));

module.exports = router;

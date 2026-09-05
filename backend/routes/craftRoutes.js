const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const Craft = require('../models/Craft');
const cultureController = require('../controllers/cultureController');

const controller = cultureController(Craft, 'Craft');
const router = express.Router();

router.get('/', asyncHandler(controller.list));
router.get('/:id', asyncHandler(controller.getById));

module.exports = router;

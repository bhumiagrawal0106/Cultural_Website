const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const Tradition = require('../models/Tradition');
const cultureController = require('../controllers/cultureController');

const controller = cultureController(Tradition, 'Tradition');
const router = express.Router();

router.get('/', asyncHandler(controller.list));
router.get('/:id', asyncHandler(controller.getById));

module.exports = router;

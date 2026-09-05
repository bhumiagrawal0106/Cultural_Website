const express = require('express');
const { query } = require('express-validator');
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../middleware/validate');
const search = require('../controllers/searchController');

const router = express.Router();

router.get(
  '/',
  [query('q').optional().isString().isLength({ max: 100 }).withMessage('Query too long')],
  validate,
  asyncHandler(search.search)
);

module.exports = router;

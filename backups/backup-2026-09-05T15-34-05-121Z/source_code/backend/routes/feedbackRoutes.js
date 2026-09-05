const express = require('express');
const { body } = require('express-validator');
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../middleware/validate');
const { optionalAuth, requireAdmin } = require('../middleware/authMiddleware');
const feedback = require('../controllers/feedbackController');
const { FEEDBACK_KINDS } = require('../config/constants');

const router = express.Router();

router.post(
  '/',
  optionalAuth,
  [
    body('message').trim().isLength({ min: 3, max: 2000 }).withMessage('Message must be 3 to 2000 characters'),
    body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5').toInt(),
    body('kind').optional().isIn(FEEDBACK_KINDS).withMessage('Invalid feedback kind'),
    body('placeId').optional({ values: 'falsy' }).isMongoId().withMessage('Invalid place id'),
  ],
  validate,
  asyncHandler(feedback.create)
);

router.get('/', requireAdmin, asyncHandler(feedback.list));

module.exports = router;

const express = require('express');
const { body } = require('express-validator');
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../middleware/validate');
const { optionalAuth } = require('../middleware/authMiddleware');
const chatbot = require('../controllers/chatbotController');

const router = express.Router();

router.post(
  '/message',
  optionalAuth,
  [
    body('message').trim().isLength({ min: 1, max: 500 }).withMessage('Message must be 1 to 500 characters'),
    body('sessionId').optional().isString().isLength({ max: 100 }).withMessage('Invalid session id'),
  ],
  validate,
  asyncHandler(chatbot.message)
);

module.exports = router;

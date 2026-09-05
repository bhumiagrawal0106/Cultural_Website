const express = require('express');
const { body } = require('express-validator');
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/authMiddleware');
const auth = require('../controllers/authController');

const router = express.Router();

router.post(
  '/signup',
  [
    body('name').trim().isLength({ min: 2, max: 60 }).withMessage('Name must be 2 to 60 characters'),
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],
  validate,
  asyncHandler(auth.signup)
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  asyncHandler(auth.login)
);

router.get('/me', requireAuth, asyncHandler(auth.me));

module.exports = router;

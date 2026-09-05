const express = require('express');
const { param } = require('express-validator');
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../middleware/validate');
const { requireAuth } = require('../middleware/authMiddleware');
const user = require('../controllers/userController');

const router = express.Router();
const placeIdRule = [param('placeId').isMongoId().withMessage('Invalid place id')];

router.use(requireAuth);

router.get('/favorites', asyncHandler(user.favorites));
router.post('/favorites/:placeId', placeIdRule, validate, asyncHandler(user.addFavorite));
router.delete('/favorites/:placeId', placeIdRule, validate, asyncHandler(user.removeFavorite));
router.get('/feedback', asyncHandler(user.feedbackHistory));

module.exports = router;

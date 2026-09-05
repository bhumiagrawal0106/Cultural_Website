const express = require('express');
const { param } = require('express-validator');
const asyncHandler = require('../utils/asyncHandler');
const validate = require('../middleware/validate');
const { requireAdmin } = require('../middleware/authMiddleware');
const admin = require('../controllers/adminController');

const router = express.Router();
const idRule = [param('id').isMongoId().withMessage('Invalid id')];

router.use(requireAdmin);
router.param('collection', admin.resolveCollection);

router.post('/:collection', asyncHandler(admin.create));
router.put('/:collection/:id', idRule, validate, asyncHandler(admin.update));
router.delete('/:collection/:id', idRule, validate, asyncHandler(admin.remove));

module.exports = router;

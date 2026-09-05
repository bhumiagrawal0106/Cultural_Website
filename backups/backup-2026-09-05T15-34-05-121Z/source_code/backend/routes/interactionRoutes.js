const express = require('express');
const { toggleLike, recordView, getStats } = require('../controllers/interactionController');

const router = express.Router();

router.post('/like', toggleLike);
router.post('/view', recordView);
router.get('/stats/:collection/:id', getStats);

module.exports = router;

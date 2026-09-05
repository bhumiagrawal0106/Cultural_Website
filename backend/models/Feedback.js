const mongoose = require('mongoose');
const { FEEDBACK_KINDS } = require('../config/constants');

const feedbackSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', default: null },
    kind: { type: String, enum: FEEDBACK_KINDS, default: 'general' },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

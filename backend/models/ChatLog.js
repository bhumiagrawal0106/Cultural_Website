const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, enum: ['user', 'bot'], required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const chatLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    sessionId: { type: String, required: true, unique: true, index: true },
    messages: { type: [messageSchema], default: [] },
    escalatedToHuman: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.models.ChatLog || mongoose.model('ChatLog', chatLogSchema);

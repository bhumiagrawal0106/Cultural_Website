const mongoose = require('mongoose');
const { PLACE_TYPES } = require('../config/constants');

const placeSchema = new mongoose.Schema(
  {
    stateId: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true, index: true },
    name_en: { type: String, required: true, trim: true },
    name_hi: { type: String, required: true, trim: true },
    type: { type: String, enum: PLACE_TYPES, default: 'other', index: true },
    description_en: { type: String, default: '' },
    description_hi: { type: String, default: '' },
    images: { type: [String], default: [] },
    // Optional glb/gltf URL. Frontend falls back to the image carousel when empty.
    model3D: { type: String, default: '' },
    // Optional YouTube or video documentary URL
    videoUrl: { type: String, default: '' },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    bestTimeToVisit: { type: String, default: '' },
    tags: { type: [String], default: [] },
    viewCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

placeSchema.index({
  name_en: 'text',
  name_hi: 'text',
  description_en: 'text',
  description_hi: 'text',
  tags: 'text',
});

module.exports = mongoose.models.Place || mongoose.model('Place', placeSchema);

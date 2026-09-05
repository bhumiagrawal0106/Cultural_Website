const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema(
  {
    name_en: { type: String, required: true, trim: true },
    name_hi: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // Exact state name as it appears in frontend/public/data/india-states.geojson
    geoJsonName: { type: String, trim: true },
    mapCoordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    thumbnail: { type: String, default: '' },
    description_en: { type: String, default: '' },
    description_hi: { type: String, default: '' },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

stateSchema.index({ name_en: 'text', name_hi: 'text', description_en: 'text', description_hi: 'text' });

module.exports = mongoose.models.State || mongoose.model('State', stateSchema);

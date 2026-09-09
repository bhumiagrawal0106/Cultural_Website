const mongoose = require('mongoose');

// Crafts, Traditions and Food share the exact same shape.
// One factory keeps them in sync and avoids three copies of the schema.
function createCultureModel(modelName, collectionName) {
  if (mongoose.models[modelName]) return mongoose.models[modelName];

  const schema = new mongoose.Schema(
    {
      stateId: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true, index: true },
      name_en: { type: String, required: true, trim: true },
      name_hi: { type: String, required: true, trim: true },
      description_en: { type: String, default: '' },
      description_hi: { type: String, default: '' },
      images: { type: [String], default: [] },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
  );

  schema.index({ name_en: 'text', name_hi: 'text', description_en: 'text', description_hi: 'text' });

  return mongoose.model(modelName, schema, collectionName);
}

module.exports = createCultureModel;

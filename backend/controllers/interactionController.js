const mongoose = require('mongoose');
const Place = require('../models/Place');
const Craft = require('../models/Craft');
const Tradition = require('../models/Tradition');
const Food = require('../models/Food');

const MODEL_MAP = {
  places: Place,
  place: Place,
  crafts: Craft,
  craft: Craft,
  traditions: Tradition,
  tradition: Tradition,
  food: Food,
  foods: Food,
};

function getModel(collectionName) {
  if (!collectionName) return null;
  const key = String(collectionName).toLowerCase().trim();
  return MODEL_MAP[key] || null;
}

exports.toggleLike = async (req, res) => {
  const { collection, id, action = 'toggle' } = req.body;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Valid item ID is required' });
  }

  const Model = getModel(collection);
  if (!Model) {
    return res.status(400).json({ error: `Invalid collection: ${collection}` });
  }

  try {
    let doc = await Model.findById(id);
    if (!doc) {
      return res.status(404).json({ error: 'Item not found' });
    }

    let isLiked = true;
    let increment = 1;

    if (action === 'unlike') {
      isLiked = false;
      increment = doc.likesCount > 0 ? -1 : 0;
    } else if (action === 'like') {
      isLiked = true;
      increment = 1;
    } else {
      // Toggle
      isLiked = true;
      increment = 1;
    }

    if (increment !== 0) {
      doc = await Model.findByIdAndUpdate(
        id,
        { $inc: { likesCount: increment } },
        { new: true }
      ).select('likesCount viewCount');
    }

    res.json({
      success: true,
      likesCount: doc.likesCount || 0,
      viewCount: doc.viewCount || 0,
      isLiked,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update like', details: err.message });
  }
};

exports.recordView = async (req, res) => {
  const { collection, id } = req.body;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Valid item ID is required' });
  }

  const Model = getModel(collection);
  if (!Model) {
    return res.status(400).json({ error: `Invalid collection: ${collection}` });
  }

  try {
    const doc = await Model.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    ).select('viewCount likesCount');

    if (!doc) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({
      success: true,
      viewCount: doc.viewCount || 0,
      likesCount: doc.likesCount || 0,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record view', details: err.message });
  }
};

exports.getStats = async (req, res) => {
  const { collection, id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Valid item ID is required' });
  }

  const Model = getModel(collection);
  if (!Model) {
    return res.status(400).json({ error: `Invalid collection: ${collection}` });
  }

  try {
    const doc = await Model.findById(id).select('viewCount likesCount');
    if (!doc) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({
      success: true,
      viewCount: doc.viewCount || 0,
      likesCount: doc.likesCount || 0,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get stats', details: err.message });
  }
};

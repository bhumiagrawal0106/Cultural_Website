const State = require('../models/State');
const Place = require('../models/Place');
const Craft = require('../models/Craft');
const Tradition = require('../models/Tradition');
const Food = require('../models/Food');

exports.list = async (req, res) => {
  const data = await State.find().sort({ name_en: 1 }).lean();
  res.json({ data, total: data.length, page: 1, limit: data.length });
};

exports.getBySlug = async (req, res) => {
  const state = await State.findOne({ slug: req.params.slug.toLowerCase() }).lean();
  if (!state) return res.status(404).json({ error: 'State not found' });

  const [placesByType, crafts, traditions, food] = await Promise.all([
    Place.aggregate([{ $match: { stateId: state._id } }, { $group: { _id: '$type', count: { $sum: 1 } } }]),
    Craft.countDocuments({ stateId: state._id }),
    Tradition.countDocuments({ stateId: state._id }),
    Food.countDocuments({ stateId: state._id }),
  ]);

  const counts = { crafts, traditions, food };
  placesByType.forEach((row) => {
    counts[row._id] = row.count;
  });

  res.json({ data: { ...state, counts } });
};

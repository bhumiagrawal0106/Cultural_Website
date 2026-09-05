const Place = require('../models/Place');
const State = require('../models/State');
const { PLACE_TYPES } = require('../config/constants');
const { parsePagination, containsRegex } = require('../utils/query');

async function resolveStateId(slug) {
  const state = await State.findOne({ slug: slug.toLowerCase() }).select('_id').lean();
  return state ? state._id : null;
}

exports.list = async (req, res) => {
  const { state, type, search } = req.query;
  const { page, limit, skip } = parsePagination(req.query);
  const filter = {};

  if (state) {
    const stateId = await resolveStateId(state);
    if (!stateId) return res.json({ data: [], total: 0, page, limit });
    filter.stateId = stateId;
  }
  if (type) {
    if (!PLACE_TYPES.includes(type)) return res.status(400).json({ error: 'Invalid type' });
    filter.type = type;
  }
  if (search && search.trim()) {
    const rx = containsRegex(search);
    filter.$or = [{ name_en: rx }, { name_hi: rx }, { tags: rx }];
  }

  const [data, total] = await Promise.all([
    Place.find(filter)
      .sort({ name_en: 1 })
      .skip(skip)
      .limit(limit)
      .populate('stateId', 'name_en name_hi slug')
      .lean(),
    Place.countDocuments(filter),
  ]);

  res.json({ data, total, page, limit });
};

exports.getById = async (req, res) => {
  const place = await Place.findByIdAndUpdate(
    req.params.id,
    { $inc: { viewCount: 1 } },
    { new: true }
  )
    .populate('stateId', 'name_en name_hi slug')
    .lean();
  if (!place) return res.status(404).json({ error: 'Place not found' });
  res.json({ data: place });
};

exports.random = async (req, res) => {
  const [place] = await Place.aggregate([{ $sample: { size: 1 } }]);
  if (!place) return res.status(404).json({ error: 'No places available yet' });
  res.json({ data: place });
};

const Feedback = require('../models/Feedback');
const { parsePagination } = require('../utils/query');

exports.create = async (req, res) => {
  const { message, rating, kind = 'general', placeId } = req.body;

  if (kind === 'general' && !rating) {
    return res.status(400).json({ error: 'Rating is required' });
  }

  const feedback = await Feedback.create({
    message,
    rating: kind === 'general' ? rating : undefined,
    kind,
    placeId: placeId || null,
    userId: req.user ? req.user._id : null,
  });

  res.status(201).json({ data: feedback });
};

exports.list = async (req, res) => {
  const { page, limit, skip } = parsePagination(req.query, 20, 100);
  const filter = {};
  if (req.query.kind) filter.kind = req.query.kind;

  const [data, total] = await Promise.all([
    Feedback.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name email')
      .populate('placeId', 'name_en name_hi')
      .lean(),
    Feedback.countDocuments(filter),
  ]);

  res.json({ data, total, page, limit });
};

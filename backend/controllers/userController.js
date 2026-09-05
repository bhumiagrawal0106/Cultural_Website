const User = require('../models/User');
const Place = require('../models/Place');
const Feedback = require('../models/Feedback');

exports.favorites = async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate({ path: 'favorites', populate: { path: 'stateId', select: 'name_en name_hi slug' } })
    .lean();
  const data = (user.favorites || []).filter(Boolean);
  res.json({ data, total: data.length, page: 1, limit: data.length });
};

exports.addFavorite = async (req, res) => {
  const exists = await Place.exists({ _id: req.params.placeId });
  if (!exists) return res.status(404).json({ error: 'Place not found' });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { favorites: req.params.placeId } },
    { new: true }
  ).lean();
  res.json({ data: user.favorites });
};

exports.removeFavorite = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $pull: { favorites: req.params.placeId } },
    { new: true }
  ).lean();
  res.json({ data: user.favorites });
};

exports.feedbackHistory = async (req, res) => {
  const data = await Feedback.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50)
    .populate('placeId', 'name_en name_hi')
    .lean();
  res.json({ data, total: data.length, page: 1, limit: 50 });
};

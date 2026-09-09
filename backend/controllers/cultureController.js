const State = require('../models/State');
const { parsePagination } = require('../utils/query');

// Shared controller for crafts, traditions and food.
module.exports = function cultureController(Model, label) {
  return {
    async list(req, res) {
      const { page, limit, skip } = parsePagination(req.query);
      const filter = {};

      if (req.query.state) {
        const state = await State.findOne({ slug: String(req.query.state).toLowerCase() })
          .select('_id')
          .lean();
        if (!state) return res.json({ data: [], total: 0, page, limit });
        filter.stateId = state._id;
      }

      const [data, total] = await Promise.all([
        Model.find(filter)
          .sort({ name_en: 1 })
          .skip(skip)
          .limit(limit)
          .populate('stateId', 'name_en name_hi slug')
          .lean(),
        Model.countDocuments(filter),
      ]);
      res.json({ data, total, page, limit });
    },

    async getById(req, res) {
      const item = await Model.findById(req.params.id).populate('stateId', 'name_en name_hi slug').lean();
      if (!item) return res.status(404).json({ error: `${label} not found` });
      res.json({ data: item });
    },
  };
};

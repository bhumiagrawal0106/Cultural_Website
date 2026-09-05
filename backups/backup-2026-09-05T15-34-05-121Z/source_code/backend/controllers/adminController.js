const State = require('../models/State');
const Place = require('../models/Place');
const Craft = require('../models/Craft');
const Tradition = require('../models/Tradition');
const Food = require('../models/Food');

const MODELS = {
  states: State,
  places: Place,
  crafts: Craft,
  traditions: Tradition,
  food: Food,
};

exports.resolveCollection = (req, res, next, name) => {
  const Model = MODELS[name];
  if (!Model) return res.status(404).json({ error: 'Unknown collection' });
  req.Model = Model;
  return next();
};

exports.create = async (req, res) => {
  const doc = await req.Model.create(req.body);
  res.status(201).json({ data: doc });
};

exports.update = async (req, res) => {
  const doc = await req.Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json({ data: doc });
};

exports.remove = async (req, res) => {
  const doc = await req.Model.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json({ data: { _id: doc._id, deleted: true } });
};

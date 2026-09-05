const State = require('../models/State');
const Place = require('../models/Place');
const Craft = require('../models/Craft');
const Tradition = require('../models/Tradition');
const Food = require('../models/Food');
const { containsRegex } = require('../utils/query');

const PER_MODEL_LIMIT = 8;

const SOURCES = [
  {
    Model: State,
    resultType: 'state',
    fields: ['name_en', 'name_hi'],
    linkTo: (doc) => `/state/${doc.slug}`,
    populate: false,
  },
  {
    Model: Place,
    resultType: 'place',
    fields: ['name_en', 'name_hi', 'tags'],
    linkTo: (doc) => `/item/places/${doc._id}`,
    populate: true,
  },
  {
    Model: Craft,
    resultType: 'craft',
    fields: ['name_en', 'name_hi'],
    linkTo: (doc) => `/item/crafts/${doc._id}`,
    populate: true,
  },
  {
    Model: Tradition,
    resultType: 'tradition',
    fields: ['name_en', 'name_hi'],
    linkTo: (doc) => `/item/traditions/${doc._id}`,
    populate: true,
  },
  {
    Model: Food,
    resultType: 'food',
    fields: ['name_en', 'name_hi'],
    linkTo: (doc) => `/item/food/${doc._id}`,
    populate: true,
  },
];

async function searchSource(source, q) {
  const { Model, fields, populate } = source;
  let query;

  // Prefer the $text index (fast, handles Devanagari). Fall back to a partial regex
  // match so that autocomplete works while the user is still typing.
  try {
    query = Model.find({ $text: { $search: q } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .limit(PER_MODEL_LIMIT);
    if (populate) query = query.populate('stateId', 'name_en name_hi slug');
    const textResults = await query.lean();
    if (textResults.length) return textResults;
  } catch (_err) {
    // text index may not be ready yet; use regex below
  }

  const rx = containsRegex(q);
  query = Model.find({ $or: fields.map((f) => ({ [f]: rx })) }).limit(PER_MODEL_LIMIT);
  if (populate) query = query.populate('stateId', 'name_en name_hi slug');
  return query.lean();
}

exports.search = async (req, res) => {
  const q = String(req.query.q || '').trim();
  if (!q) return res.json({ data: [], total: 0, query: q });

  const results = await Promise.all(SOURCES.map((source) => searchSource(source, q)));

  const data = results.flatMap((docs, i) => {
    const source = SOURCES[i];
    return docs.map((doc) => ({
      _id: doc._id,
      resultType: source.resultType,
      linkTo: source.linkTo(doc),
      name_en: doc.name_en,
      name_hi: doc.name_hi,
      description_en: doc.description_en,
      description_hi: doc.description_hi,
      image: (doc.images && doc.images[0]) || doc.thumbnail || '',
      type: doc.type,
      state: doc.stateId && doc.stateId.name_en ? doc.stateId : undefined,
    }));
  });

  res.json({ data, total: data.length, query: q });
};

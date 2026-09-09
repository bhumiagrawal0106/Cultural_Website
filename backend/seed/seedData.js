require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const { BCRYPT_ROUNDS } = require('../config/constants');

const State = require('../models/State');
const Place = require('../models/Place');
const Craft = require('../models/Craft');
const Tradition = require('../models/Tradition');
const Food = require('../models/Food');
const User = require('../models/User');

const STATES = [
  require('./data/rajasthan'),
  require('./data/uttarPradesh'),
  require('./data/tamilNadu'),
  require('./data/kerala'),
  require('./data/delhi'),
];

async function run() {
  await connectDB();

  console.log('Clearing content collections...');
  await Promise.all([State, Place, Craft, Tradition, Food].map((m) => m.deleteMany({})));

  let totals = { states: 0, places: 0, crafts: 0, traditions: 0, food: 0 };

  for (const entry of STATES) {
    const { places = [], crafts = [], traditions = [], food = [], ...stateData } = entry;
    const state = await State.create(stateData);
    const withState = (items) => items.map((i) => ({ ...i, stateId: state._id }));

    await Promise.all([
      Place.insertMany(withState(places)),
      Craft.insertMany(withState(crafts)),
      Tradition.insertMany(withState(traditions)),
      Food.insertMany(withState(food)),
    ]);

    totals = {
      states: totals.states + 1,
      places: totals.places + places.length,
      crafts: totals.crafts + crafts.length,
      traditions: totals.traditions + traditions.length,
      food: totals.food + food.length,
    };
    console.log(`  seeded ${state.name_en}`);
  }

  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@bharatdarshan.local').toLowerCase();
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'ChangeMe123!', BCRYPT_ROUNDS);
  await User.findOneAndUpdate(
    { email: adminEmail },
    { $set: { name: 'Admin', passwordHash, role: 'admin' } },
    { upsert: true, setDefaultsOnInsert: true }
  );

  console.log('Building indexes...');
  await Promise.all(Object.values(mongoose.models).map((m) => m.syncIndexes()));

  console.log('Seed complete:', totals, `admin: ${adminEmail}`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});

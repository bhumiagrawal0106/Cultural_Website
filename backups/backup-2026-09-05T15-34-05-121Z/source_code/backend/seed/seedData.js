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

// ─── 28 States + 8 Union Territories = 36 total ──────────────────────────────
const STATES = [
  // Original 21 states
  require('./data/rajasthan'),
  require('./data/uttarPradesh'),
  require('./data/tamilNadu'),
  require('./data/kerala'),
  require('./data/delhi'),
  require('./data/maharashtra'),
  require('./data/gujarat'),
  require('./data/westBengal'),
  require('./data/karnataka'),
  require('./data/madhyaPradesh'),
  require('./data/punjab'),
  require('./data/odisha'),
  require('./data/himachalPradesh'),
  require('./data/goa'),
  require('./data/jammuKashmir'),
  require('./data/uttarakhand'),
  require('./data/bihar'),
  require('./data/assam'),
  require('./data/telangana'),
  require('./data/andhraPradesh'),
  require('./data/sikkim'),
  // 7 additional states
  require('./data/arunachalPradesh'),
  require('./data/chhattisgarh'),
  require('./data/haryana'),
  require('./data/jharkhand'),
  require('./data/manipur'),
  require('./data/meghalaya'),
  require('./data/nagaland'),
  require('./data/mizoram'),
  require('./data/tripura'),
  // 6 additional UTs (Delhi & J&K already above)
  require('./data/ladakh'),
  require('./data/andamanNicobar'),
  require('./data/lakshadweep'),
  require('./data/puducherry'),
  require('./data/chandigarh'),
  require('./data/dadraAndNagarHaveliAndDamanAndDiu'),
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
    console.log(`  ✓ ${state.name_en}  [${places.length}pl ${crafts.length}cr ${traditions.length}tr ${food.length}fo]`);
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

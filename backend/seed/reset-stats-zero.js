require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const connectDB = require('../config/db');
const Place = require('../models/Place');
const Craft = require('../models/Craft');
const Tradition = require('../models/Tradition');
const Food = require('../models/Food');

async function resetStats() {
  await connectDB();
  console.log('Connected to MongoDB. Resetting likes and views to 0 for all items...');

  const models = [
    { Model: Place, name: 'Places' },
    { Model: Craft, name: 'Crafts' },
    { Model: Tradition, name: 'Traditions' },
    { Model: Food, name: 'Food' },
  ];

  let totalReset = 0;
  for (const { Model, name } of models) {
    const res = await Model.updateMany(
      {},
      { $set: { viewCount: 0, likesCount: 0 } }
    );
    console.log(`Reset ${res.modifiedCount || res.matchedCount} items in ${name} to views=0, likes=0`);
    totalReset += (res.modifiedCount || res.matchedCount);
  }

  console.log(`✅ Successfully reset ${totalReset} items across all categories to 0 views and 0 likes!`);
  process.exit(0);
}

resetStats().catch((err) => {
  console.error('Failed to reset stats:', err);
  process.exit(1);
});

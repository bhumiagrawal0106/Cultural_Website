require('dotenv').config();
const connectDB = require('../config/db');
const Place = require('../models/Place');
const Craft = require('../models/Craft');
const Tradition = require('../models/Tradition');
const Food = require('../models/Food');

// Simple deterministic hash to get stable, consistent numbers per item
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

async function seedStats() {
  await connectDB();
  console.log('Connected to MongoDB. Initializing social stats (views + likes)...');

  const collections = [
    { Model: Place, name: 'Places', baseMin: 1500, baseMax: 18000 },
    { Model: Craft, name: 'Crafts', baseMin: 900, baseMax: 7500 },
    { Model: Tradition, name: 'Traditions', baseMin: 850, baseMax: 8200 },
    { Model: Food, name: 'Food', baseMin: 1100, baseMax: 9500 },
  ];

  let totalUpdated = 0;

  for (const { Model, name, baseMin, baseMax } of collections) {
    const docs = await Model.find({});
    console.log(`Processing ${docs.length} ${name}...`);

    for (const doc of docs) {
      const h = hashCode(String(doc._id) + (doc.name_en || ''));
      const span = baseMax - baseMin;
      const initialViews = baseMin + (h % span);
      // Likes between 12% and 24% of views
      const likeRatio = 0.12 + ((h % 120) / 1000);
      const initialLikes = Math.floor(initialViews * likeRatio);

      const updates = {};
      if (!doc.viewCount || doc.viewCount <= 0) {
        updates.viewCount = initialViews;
      }
      if (!doc.likesCount || doc.likesCount <= 0) {
        updates.likesCount = initialLikes;
      }

      if (Object.keys(updates).length > 0) {
        await Model.findByIdAndUpdate(doc._id, { $set: updates });
        totalUpdated++;
      }
    }
  }

  console.log(`✅ Successfully initialized social stats for ${totalUpdated} items!`);
  process.exit(0);
}

seedStats().catch((err) => {
  console.error('Failed to seed social stats:', err);
  process.exit(1);
});

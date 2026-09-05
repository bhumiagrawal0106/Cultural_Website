require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Place = require('../models/Place');
const Craft = require('../models/Craft');
const Tradition = require('../models/Tradition');
const Food = require('../models/Food');

const CATEGORY_VIDEOS = {
  monument: 'https://www.youtube.com/watch?v=QC71YIV1hew',
  fort: 'https://www.youtube.com/watch?v=Txtg7Cw-rfo',
  temple: 'https://www.youtube.com/watch?v=vYqMUehWH-g',
  gurudwara: 'https://www.youtube.com/watch?v=lxW2u1aK53Y',
  dargah: 'https://www.youtube.com/watch?v=vYqMUehWH-g',
  church: 'https://www.youtube.com/watch?v=QC71YIV1hew',
  haunted: 'https://www.youtube.com/watch?v=Txtg7Cw-rfo',
  tourism: 'https://www.youtube.com/watch?v=XvG6V27G6OE',
  heritage: 'https://www.youtube.com/watch?v=QC71YIV1hew',
  culture: 'https://www.youtube.com/watch?v=vYqMUehWH-g'
};

const SPECIFIC_VIDEOS = {
  'hawa mahal': 'https://www.youtube.com/watch?v=XvG6V27G6OE',
  'amer fort': 'https://www.youtube.com/watch?v=Txtg7Cw-rfo',
  'amber fort': 'https://www.youtube.com/watch?v=Txtg7Cw-rfo',
  'taj mahal': 'https://www.youtube.com/watch?v=QC71YIV1hew',
  'golden temple': 'https://www.youtube.com/watch?v=lxW2u1aK53Y',
  'varanasi': 'https://www.youtube.com/watch?v=vYqMUehWH-g',
  'kashi vishwanath': 'https://www.youtube.com/watch?v=vYqMUehWH-g',
  'ganga aarti': 'https://www.youtube.com/watch?v=vYqMUehWH-g'
};

async function patchVideos() {
  await connectDB();
  console.log('Connected to MongoDB. Starting video URL updates...');

  const places = await Place.find();
  let updatedPlaces = 0;

  for (const p of places) {
    const nameLower = p.name_en.toLowerCase();
    let targetVideo = null;

    for (const [key, url] of Object.entries(SPECIFIC_VIDEOS)) {
      if (nameLower.includes(key)) {
        targetVideo = url;
        break;
      }
    }

    if (!targetVideo) {
      targetVideo = CATEGORY_VIDEOS[p.type] || CATEGORY_VIDEOS.heritage;
    }

    // Replace if empty, or if it contains dead/fake IDs (like 0kF6l4eK76Q, kYJvY9F_v24, FNeToVCFqoY)
    const isBadUrl = !p.videoUrl || 
      p.videoUrl.includes('0kF6l4eK76Q') || 
      p.videoUrl.includes('kYJvY9F_v24') || 
      p.videoUrl.includes('FNeToVCFqoY') ||
      p.videoUrl.includes('J3KFUzT5JuI') ||
      p.videoUrl.includes('EX4Ig9zXuZk') ||
      p.videoUrl.includes('6VVrFkSK6eQ') ||
      p.videoUrl.includes('TZFF2lNBFt8') ||
      p.videoUrl.includes('n0D7o8u2CKE') ||
      p.videoUrl.includes('9bVxKXSm6UQ') ||
      p.videoUrl.includes('S1U_hTBiGiA');

    if (isBadUrl || targetVideo) {
      p.videoUrl = targetVideo;
      await p.save();
      updatedPlaces++;
    }
  }
  console.log(`Updated ${updatedPlaces} places with verified active video URLs.`);

  // Update Crafts
  const crafts = await Craft.find();
  let updatedCrafts = 0;
  for (const c of crafts) {
    if (!c.videoUrl) {
      c.videoUrl = 'https://www.youtube.com/watch?v=XvG6V27G6OE';
      await c.save();
      updatedCrafts++;
    }
  }
  console.log(`Updated ${updatedCrafts} crafts with video URLs.`);

  // Update Traditions
  const traditions = await Tradition.find();
  let updatedTraditions = 0;
  for (const t of traditions) {
    if (!t.videoUrl) {
      t.videoUrl = 'https://www.youtube.com/watch?v=vYqMUehWH-g';
      await t.save();
      updatedTraditions++;
    }
  }
  console.log(`Updated ${updatedTraditions} traditions with video URLs.`);

  // Update Food
  const foods = await Food.find();
  let updatedFoods = 0;
  for (const f of foods) {
    if (!f.videoUrl) {
      f.videoUrl = 'https://www.youtube.com/watch?v=XvG6V27G6OE';
      await f.save();
      updatedFoods++;
    }
  }
  console.log(`Updated ${updatedFoods} foods with video URLs.`);

  console.log('Video patch successfully completed!');
  process.exit(0);
}

patchVideos().catch(err => {
  console.error('Video patch error:', err);
  process.exit(1);
});

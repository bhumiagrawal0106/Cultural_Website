require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const { searchYouTube } = require('../utils/youtubeSearch');
const Place = require('../models/Place');
const State = require('../models/State');
const Craft = require('../models/Craft');
const Tradition = require('../models/Tradition');
const Food = require('../models/Food');

async function populate() {
  await connectDB();
  console.log('Connected to MongoDB. Populating topic-matched videos...');

  const states = await State.find().lean();
  const stateMap = {};
  for (const s of states) {
    stateMap[s._id.toString()] = s.name_en;
  }

  // 1. Process Places
  const places = await Place.find();
  console.log(`Processing ${places.length} places...`);
  let placeCount = 0;

  for (const p of places) {
    const sName = stateMap[p.stateId?.toString()] || '';
    const query = `${p.name_en} ${sName} ${p.type} documentary tour`.trim();
    const result = await searchYouTube(query);
    if (result && result.watchUrl) {
      p.videoUrl = result.watchUrl;
      await p.save();
      placeCount++;
      if (placeCount % 10 === 0 || placeCount === places.length) {
        console.log(`Updated ${placeCount}/${places.length} places (Last: "${p.name_en}" -> ${result.title})`);
      }
    }
  }

  // 2. Process Crafts
  const crafts = await Craft.find();
  console.log(`Processing ${crafts.length} crafts...`);
  for (const c of crafts) {
    const sName = stateMap[c.stateId?.toString()] || '';
    const query = `${c.name_en} ${sName} craft handloom making`.trim();
    const result = await searchYouTube(query);
    if (result && result.watchUrl) {
      c.videoUrl = result.watchUrl;
      await c.save();
    }
  }
  console.log(`Updated all ${crafts.length} crafts.`);

  // 3. Process Traditions
  const traditions = await Tradition.find();
  console.log(`Processing ${traditions.length} traditions...`);
  for (const t of traditions) {
    const sName = stateMap[t.stateId?.toString()] || '';
    const query = `${t.name_en} ${sName} tradition festival dance`.trim();
    const result = await searchYouTube(query);
    if (result && result.watchUrl) {
      t.videoUrl = result.watchUrl;
      await t.save();
    }
  }
  console.log(`Updated all ${traditions.length} traditions.`);

  // 4. Process Food
  const foods = await Food.find();
  console.log(`Processing ${foods.length} foods...`);
  for (const f of foods) {
    const sName = stateMap[f.stateId?.toString()] || '';
    const query = `${f.name_en} ${sName} recipe food culture`.trim();
    const result = await searchYouTube(query);
    if (result && result.watchUrl) {
      f.videoUrl = result.watchUrl;
      await f.save();
    }
  }
  console.log(`Updated all ${foods.length} foods.`);

  console.log('Finished populating topic-matched videos for all collections!');
  process.exit(0);
}

populate().catch(err => {
  console.error('Error populating videos:', err);
  process.exit(1);
});

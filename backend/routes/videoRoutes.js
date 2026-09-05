const express = require('express');
const { getCuratedMonumentVideo, verifyVideoIdWithOembed } = require('../utils/verifiedMonuments');
const Place = require('../models/Place');
const Craft = require('../models/Craft');
const Tradition = require('../models/Tradition');
const Food = require('../models/Food');

const router = express.Router();

const MODEL_MAP = {
  places: Place,
  place: Place,
  crafts: Craft,
  craft: Craft,
  traditions: Tradition,
  tradition: Tradition,
  food: Food,
  foods: Food,
};

router.get('/', async (req, res) => {
  const { q, name, stateName, collection, id } = req.query;
  const monumentName = (name || q || '').trim();

  if (!monumentName) {
    return res.status(400).json({ error: 'Query parameter "name" or "q" is required.' });
  }

  const ytSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${monumentName} ${stateName || ''} virtual tour documentary`.trim()
  )}`;

  // Step 1: Check curated 100% verified monument video repository
  const curated = getCuratedMonumentVideo(monumentName);
  if (curated) {
    return res.json({
      success: true,
      isStrictMatch: true,
      redirectUrl: ytSearchUrl,
      ...curated,
    });
  }

  // Step 2: If entity in DB has a custom videoUrl, strictly verify it
  if (collection && id && MODEL_MAP[collection]) {
    try {
      const doc = await MODEL_MAP[collection].findById(id).lean();
      if (doc && doc.videoUrl) {
        const m = doc.videoUrl.match(
          /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
        );
        if (m && m[1]) {
          const verified = await verifyVideoIdWithOembed(m[1], monumentName);
          if (verified) {
            return res.json({
              success: true,
              isStrictMatch: true,
              redirectUrl: ytSearchUrl,
              ...verified,
            });
          }
        }
      }
    } catch (e) {
      // Proceed to YouTube redirect
    }
  }

  // Step 3: No verified video strictly matches the monument name -> REDIRECT TO YOUTUBE
  // Per user rule: Videos must be strictly based on monument name, otherwise redirect to YouTube!
  return res.json({
    success: false,
    isStrictMatch: false,
    monumentName,
    message: 'No video strictly verified for this monument. Redirecting directly to YouTube.',
    redirectUrl: ytSearchUrl,
    searchQuery: `${monumentName} ${stateName || ''}`.trim(),
  });
});

module.exports = router;

const request = require('supertest');
const app = require('../app');
const State = require('../models/State');
const Place = require('../models/Place');
const Craft = require('../models/Craft');
const User = require('../models/User');

async function signup(overrides = {}) {
  const payload = {
    name: 'Test User',
    email: `user${Date.now()}${Math.random().toString(16).slice(2)}@example.com`,
    password: 'password123',
    ...overrides,
  };
  const res = await request(app).post('/api/auth/signup').send(payload);
  return { res, token: res.body.token, user: res.body.user, payload };
}

async function makeAdmin(userId) {
  await User.findByIdAndUpdate(userId, { role: 'admin' });
}

async function seedState() {
  const state = await State.create({
    name_en: 'Rajasthan',
    name_hi: 'राजस्थान',
    slug: 'rajasthan',
    geoJsonName: 'Rajasthan',
    mapCoordinates: { lat: 27.0238, lng: 74.2179 },
    description_en: 'Land of Kings.',
    description_hi: 'राजाओं की भूमि।',
  });

  const places = await Place.insertMany([
    {
      stateId: state._id,
      name_en: 'Hawa Mahal',
      name_hi: 'हवा महल',
      type: 'monument',
      description_en: 'Palace of Winds in Jaipur.',
      description_hi: 'जयपुर का हवाओं का महल।',
      coordinates: { lat: 26.9239, lng: 75.8267 },
      tags: ['jaipur', 'palace'],
    },
    {
      stateId: state._id,
      name_en: 'Brahma Temple',
      name_hi: 'ब्रह्मा मंदिर',
      type: 'temple',
      description_en: 'Temple in Pushkar.',
      description_hi: 'पुष्कर का मंदिर।',
      coordinates: { lat: 26.4897, lng: 74.5511 },
    },
  ]);

  const craft = await Craft.create({
    stateId: state._id,
    name_en: 'Blue Pottery',
    name_hi: 'नीली मिट्टी के बर्तन',
    description_en: 'Glazed pottery of Jaipur.',
    description_hi: 'जयपुर के चमकदार बर्तन।',
  });

  return { state, places, craft };
}

module.exports = { request, app, signup, makeAdmin, seedState };

require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX } = require('./config/constants');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.set('trust proxy', 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow no-origin (curl, Postman, mobile apps)
      if (!origin) return callback(null, true);
      // Always allow localhost dev
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) return callback(null, true);
      // Allow all localtunnel subdomains
      if (origin.endsWith('.loca.lt')) return callback(null, true);
      // Allow configured origins
      const allowed = (process.env.CLIENT_URL || '').split(',').map((s) => s.trim());
      if (allowed.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));

const limiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/auth', limiter);
app.use('/api/feedback', limiter);
app.use('/api/chatbot', limiter);

// Locally hosted seed images (optional)
app.use('/images', express.static(path.join(__dirname, 'seed', 'images'), { maxAge: '7d' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/states', require('./routes/stateRoutes'));
app.use('/api/places', require('./routes/placeRoutes'));
app.use('/api/crafts', require('./routes/craftRoutes'));
app.use('/api/traditions', require('./routes/traditionRoutes'));
app.use('/api/food', require('./routes/foodRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/random', require('./routes/randomRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/config', require('./routes/configRoutes'));
app.use('/api/video', require('./routes/videoRoutes'));
app.use('/api/interactions', require('./routes/interactionRoutes'));

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;

const jwt = require('jsonwebtoken');
const User = require('../models/User');

function extractToken(req) {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7).trim() : null;
}

async function loadUserFromToken(token) {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return User.findById(payload.id);
}

// Rejects the request when no valid JWT is present.
async function requireAuth(req, res, next) {
  const token = extractToken(req);
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  try {
    const user = await loadUserFromToken(token);
    if (!user) return res.status(401).json({ error: 'User no longer exists' });
    req.user = user;
    return next();
  } catch (_err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Attaches req.user when a valid JWT is present, but never blocks the request.
async function optionalAuth(req, res, next) {
  const token = extractToken(req);
  if (!token) return next();
  try {
    const user = await loadUserFromToken(token);
    if (user) req.user = user;
  } catch (_err) {
    // ignore invalid tokens for optional auth
  }
  return next();
}

function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    return next();
  });
}

module.exports = { requireAuth, optionalAuth, requireAdmin };

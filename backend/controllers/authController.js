const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_EXPIRES_IN, BCRYPT_ROUNDS } = require('../config/constants');

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

exports.signup = async (req, res) => {
  const { name, password } = req.body;
  const email = String(req.body.email).toLowerCase().trim();

  const existing = await User.findOne({ email }).lean();
  if (existing) return res.status(409).json({ error: 'Email already in use' });

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const user = await User.create({ name, email, passwordHash });

  res.status(201).json({ token: signToken(user), user: user.toSafeJSON() });
};

exports.login = async (req, res) => {
  const email = String(req.body.email).toLowerCase().trim();
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(req.body.password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  res.json({ token: signToken(user), user: user.toSafeJSON() });
};

exports.me = async (req, res) => {
  res.json({ user: req.user.toSafeJSON() });
};

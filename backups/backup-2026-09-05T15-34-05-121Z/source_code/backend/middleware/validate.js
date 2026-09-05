const { validationResult } = require('express-validator');

// Sends the first validation error as { error } with HTTP 400.
module.exports = function validate(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.array()[0].msg });
  }
  return next();
};

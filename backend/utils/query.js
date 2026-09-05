const { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } = require('../config/constants');

function parsePagination(query, defaultLimit = DEFAULT_PAGE_SIZE, maxLimit = MAX_PAGE_SIZE) {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || defaultLimit, 1), maxLimit);
  return { page, limit, skip: (page - 1) * limit };
}

function escapeRegex(text = '') {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function containsRegex(text) {
  return new RegExp(escapeRegex(text.trim()), 'i');
}

module.exports = { parsePagination, escapeRegex, containsRegex };

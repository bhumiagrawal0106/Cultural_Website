// Wikimedia Commons redirect URL: stable, freely licensed, no API key.
// The frontend falls back to a placeholder automatically if a file name is wrong.
function img(fileName, width = 1200) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=${width}`;
}

module.exports = { img };

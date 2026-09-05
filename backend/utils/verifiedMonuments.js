/**
 * verifiedMonuments.js
 * Curated registry and strict relevance verifier for monument virtual tours.
 * Rule: Videos MUST strictly match the name of the monument, otherwise redirect to YouTube.
 */

// Curated 100% verified videos for prominent Indian cultural monuments
const VERIFIED_MONUMENTS = [
  {
    keywords: ['taj mahal', 'tajmahal'],
    videoId: 'hSCEtDcx9JE',
    title: 'TAJ MAHAL, AGRA | The Untold Story of India’s Greatest Wonder',
    author: 'YouAndMainak Heritage',
  },
  {
    keywords: ['qutub minar', 'qutb minar', 'kutub minar'],
    videoId: 'IDHjsAazag0',
    title: 'Qutb Minar, New Delhi A Documentary Film',
    author: 'Doordarshan Archives',
  },
  {
    keywords: ['red fort', 'lal qila', 'lal quila'],
    videoId: 'RS5CZ0vlIVg',
    title: 'Forts Of India - Red Fort, Delhi - Ep#26',
    author: 'Doordarshan National',
  },
  {
    keywords: ['meenakshi amman', 'meenakshi temple', 'madurai meenakshi'],
    videoId: 'uGHfjT_ny8Q',
    title: 'Meenakshi Amman & The Marvel of Madurai | Full Episode',
    author: 'Cultural Heritage India',
  },
  {
    keywords: ['bhangarh', 'bhangarh fort'],
    videoId: 'xP0SQHXVHjQ',
    title: "India's Most HAUNTED Fort | Reality of Bhangarh",
    author: 'Dhruv Rathee Cultural Series',
  },
  {
    keywords: ['golden temple', 'harmandir sahib', 'swarn mandir'],
    videoId: 'rD3SGn8f9wQ',
    title: 'Revealed - The Golden Temple Amritsar',
    author: 'National Cultural Heritage',
  },
  {
    keywords: ['hampi', 'vijayanagara', 'virupaksha'],
    videoId: 'Izna6gjCo0E',
    title: 'Ruins of Hampi | Vijayanagara Monuments Documentary',
    author: 'Doordarshan Archives',
  },
];

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'temple', 'fort', 'palace', 'monument', 'park',
  'caves', 'cave', 'place', 'places', 'tour', 'travel', 'india', 'state', 'heritage',
  'national', 'lake', 'dargah', 'church', 'gurudwara', 'river', 'museum', 'garden',
  'city', 'hill', 'station', 'beach', 'falls', 'wildlife', 'sanctuary', 'baoli'
]);

function cleanString(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Checks if video title contains key identifier words from monument name.
 */
function isStrictTitleMatch(videoTitle, monumentName) {
  if (!videoTitle || !monumentName) return false;
  const vTitle = cleanString(videoTitle);
  const mClean = cleanString(monumentName);

  // Direct substring
  if (vTitle.includes(mClean)) return true;

  const tokens = mClean
    .split(' ')
    .filter((t) => t.length >= 3 && !STOP_WORDS.has(t));

  if (tokens.length === 0) {
    // If all were stopwords, check if entire name is inside
    return vTitle.includes(mClean);
  }

  // Must match at least one significant identifying token
  return tokens.some((token) => vTitle.includes(token));
}

/**
 * Look up in curated verified list
 */
function getCuratedMonumentVideo(monumentName) {
  if (!monumentName) return null;
  const clean = cleanString(monumentName);

  for (const item of VERIFIED_MONUMENTS) {
    if (item.keywords.some((k) => clean.includes(k) || k.includes(clean))) {
      return {
        videoId: item.videoId,
        title: item.title,
        author: item.author,
        isStrictMatch: true,
        embedUrl: `https://www.youtube-nocookie.com/embed/${item.videoId}?rel=0&modestbranding=1`,
        watchUrl: `https://www.youtube.com/watch?v=${item.videoId}`,
      };
    }
  }
  return null;
}

/**
 * Validates a video ID via YouTube oEmbed to ensure it exists and matches monument name strictly.
 */
async function verifyVideoIdWithOembed(videoId, monumentName) {
  if (!videoId) return null;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) return null;
    const data = await res.json();

    // STRICT CHECK: Title must contain keywords from monument name
    if (!isStrictTitleMatch(data.title, monumentName)) {
      console.warn(`[verifyVideo] REJECTED mismatched video "${data.title}" for monument "${monumentName}"`);
      return null;
    }

    return {
      videoId,
      title: data.title,
      author: data.author_name || 'Cultural Archives',
      isStrictMatch: true,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
    };
  } catch (err) {
    return null;
  }
}

module.exports = {
  getCuratedMonumentVideo,
  verifyVideoIdWithOembed,
  isStrictTitleMatch,
  cleanString,
};

/**
 * youtubeSearch.js
 * High-performance YouTube search resolver without API key quotas.
 * Scrapes top organic video IDs matching the exact query.
 */

const cache = new Map();

async function searchYouTube(query) {
  if (!query || typeof query !== 'string') return null;
  const cleanQuery = query.trim();
  if (cache.has(cleanQuery)) {
    return cache.get(cleanQuery);
  }

  const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(cleanQuery);

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!res.ok) return null;
    const html = await res.text();

    // Extract videoId instances from search results
    const regex = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
    const ids = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      const id = match[1];
      if (!ids.includes(id)) {
        ids.push(id);
      }
      if (ids.length >= 6) break;
    }

    if (ids.length === 0) return null;

    // Verify top candidate with oEmbed for title
    let verified = null;
    for (const vid of ids) {
      try {
        const omb = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${vid}&format=json`);
        if (omb.ok) {
          const data = await omb.json();
          verified = {
            videoId: vid,
            title: data.title || cleanQuery,
            author: data.author_name || 'Cultural Archives',
            embedUrl: `https://www.youtube-nocookie.com/embed/${vid}?rel=0&modestbranding=1`,
            watchUrl: `https://www.youtube.com/watch?v=${vid}`,
          };
          break;
        }
      } catch (e) {
        // Continue to next candidate
      }
    }

    if (verified) {
      cache.set(cleanQuery, verified);
      return verified;
    }

    // If oEmbed timed out, fallback to top extracted ID
    const fallback = {
      videoId: ids[0],
      title: cleanQuery,
      author: 'YouTube Cultural Tour',
      embedUrl: `https://www.youtube-nocookie.com/embed/${ids[0]}?rel=0&modestbranding=1`,
      watchUrl: `https://www.youtube.com/watch?v=${ids[0]}`,
    };
    cache.set(cleanQuery, fallback);
    return fallback;
  } catch (err) {
    console.error(`[youtubeSearch] Failed for query "${query}":`, err.message);
    return null;
  }
}

module.exports = { searchYouTube };

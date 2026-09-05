// Service for querying Wikimedia Commons media repository
const cache = new Map();

/**
 * Fetches high-resolution images and metadata from Wikimedia Commons.
 * @param {string} query - Monument or cultural site name
 * @param {number} [limit=8] - Number of media files to retrieve
 * @returns {Promise<Array<Object>>}
 */
export async function fetchCommonsImages(query, limit = 8) {
  if (!query) return [];
  const cacheKey = `${query.toLowerCase()}_${limit}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  try {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      query
    )}&gsrnamespace=6&gsrlimit=${limit}&prop=imageinfo&iiprop=url|size|extmetadata&format=json&origin=*`;

    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.query || !data.query.pages) return [];

    const pages = Object.values(data.query.pages);
    const media = pages
      .map((p) => {
        const info = p.imageinfo && p.imageinfo[0];
        if (!info || !info.url) return null;

        // Skip non-image extensions (e.g. ogg, pdf, svg icons)
        const isPhoto = /\.(jpe?g|png|webp)/i.test(info.url);
        if (!isPhoto) return null;

        const meta = info.extmetadata || {};
        const cleanHtml = (str) => (str ? str.replace(/<\/?[^>]+(>|$)/g, '').trim() : '');

        return {
          pageId: p.pageid,
          title: p.title.replace(/^File:/, ''),
          url: info.url,
          width: info.width,
          height: info.height,
          thumbUrl: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
            p.title.replace(/^File:/, '')
          )}?width=600`,
          commonsUrl: info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(p.title)}`,
          artist: cleanHtml(meta.Artist && meta.Artist.value) || 'Wikimedia Contributor',
          license: (meta.LicenseShortName && meta.LicenseShortName.value) || 'CC BY-SA / Commons',
          licenseUrl: meta.LicenseUrl && meta.LicenseUrl.value,
          description: cleanHtml(meta.ImageDescription && meta.ImageDescription.value) || p.title,
          date: cleanHtml(meta.DateTimeOriginal && meta.DateTimeOriginal.value) || null,
        };
      })
      .filter(Boolean);

    cache.set(cacheKey, media);
    return media;
  } catch (err) {
    console.warn('[Wikimedia Commons] Fetch error:', err);
    return [];
  }
}

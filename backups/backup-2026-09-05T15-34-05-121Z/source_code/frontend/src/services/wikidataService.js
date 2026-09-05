// Service for fetching Linked Open Data from Wikidata API
const cache = new Map();

/**
 * Searches and retrieves enriched Wikidata entity information for a place or heritage site.
 * @param {string} query - The name of the monument or site
 * @param {string} [state] - State name for disambiguation
 * @returns {Promise<Object|null>}
 */
export async function fetchWikidata(query, state = '') {
  if (!query) return null;
  const cacheKey = `${query.toLowerCase()}_${state.toLowerCase()}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  try {
    // 1. Search for matching entity on Wikidata
    const searchUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(
      query
    )}&language=en&limit=8&format=json&origin=*`;

    const searchRes = await fetch(searchUrl);
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();
    if (!searchData.search || searchData.search.length === 0) return null;

    // Rank candidate entities using context clues (India, heritage, state, monument, etc.)
    const candidates = searchData.search;
    let match = candidates[0];
    const keywords = [
      'india',
      state.toLowerCase(),
      'temple',
      'monument',
      'fort',
      'mosque',
      'building',
      'mausoleum',
      'unesco',
      'heritage',
      'palace',
      'archaeological',
      'shrine',
      'caves',
      'church',
    ];

    const scored = candidates.map((c) => {
      let score = 0;
      const desc = (c.description || '').toLowerCase();
      const label = (c.label || '').toLowerCase();
      if (label === query.toLowerCase()) score += 5;
      keywords.forEach((kw) => {
        if (kw && (desc.includes(kw) || label.includes(kw))) score += 2;
      });
      return { ...c, score };
    });

    scored.sort((a, b) => b.score - a.score);
    if (scored.length > 0 && scored[0].score > 0) {
      match = scored[0];
    }

    const qid = match.id;

    // 2. Fetch complete entity claims & sitelinks
    const entityUrl = `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${qid}&props=claims|descriptions|labels|sitelinks&format=json&origin=*`;
    const entityRes = await fetch(entityUrl);
    if (!entityRes.ok) return null;
    const entityData = await entityRes.json();
    const entity = entityData.entities && entityData.entities[qid];
    if (!entity) return null;

    const claims = entity.claims || {};

    // Helper to extract claim values
    const getClaimString = (prop) => {
      const c = claims[prop];
      if (!c || !c[0] || !c[0].mainsnak || !c[0].mainsnak.datavalue) return null;
      return c[0].mainsnak.datavalue.value;
    };

    const getClaimTime = (prop) => {
      const v = getClaimString(prop);
      if (v && v.time) {
        // e.g. "+1631-00-00T00:00:00Z" -> "1631"
        const m = v.time.match(/([+-]?\d+)/);
        if (m) {
          const yr = parseInt(m[1], 10);
          return yr < 0 ? `${Math.abs(yr)} BCE` : `${yr} CE`;
        }
      }
      return null;
    };

    const unescoId = getClaimString('P757');
    const inception = getClaimTime('P571');
    const commonsCat = getClaimString('P373');
    const asiId = getClaimString('P3573') || getClaimString('P1435');

    // Sitelinks
    const sitelinks = entity.sitelinks || {};
    const enWikipedia = sitelinks.enwiki
      ? `https://en.wikipedia.org/wiki/${encodeURIComponent(sitelinks.enwiki.title)}`
      : null;
    const hiWikipedia = sitelinks.hiwiki
      ? `https://hi.wikipedia.org/wiki/${encodeURIComponent(sitelinks.hiwiki.title)}`
      : null;

    const result = {
      qid,
      wikidataUrl: `https://www.wikidata.org/wiki/${qid}`,
      label: (entity.labels && entity.labels.en && entity.labels.en.value) || match.label,
      label_hi: (entity.labels && entity.labels.hi && entity.labels.hi.value) || null,
      description:
        (entity.descriptions && entity.descriptions.en && entity.descriptions.en.value) ||
        match.description,
      description_hi:
        (entity.descriptions && entity.descriptions.hi && entity.descriptions.hi.value) || null,
      unescoId,
      unescoUrl: unescoId ? `https://whc.unesco.org/en/list/${unescoId}` : null,
      inception,
      commonsCategory: commonsCat,
      commonsUrl: commonsCat
        ? `https://commons.wikimedia.org/wiki/Category:${encodeURIComponent(commonsCat)}`
        : null,
      enWikipedia,
      hiWikipedia,
      matchScore: match.score,
    };

    cache.set(cacheKey, result);
    return result;
  } catch (err) {
    console.warn('[Wikidata] Fetch error:', err);
    return null;
  }
}

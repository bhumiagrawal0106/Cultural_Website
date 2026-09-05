// Prepares public/data/india-states.geojson for the 3D map.
//
//   npm run fetch-geojson                         download DEFAULT_URL, simplify, validate, write
//   npm run fetch-geojson -- <url>                same, from a custom URL
//   npm run fetch-geojson -- --input file.json    use a local file (e.g. from datameet/maps or a Survey of India export)
//   npm run fetch-geojson -- --tolerance 0.02     Douglas-Peucker tolerance in degrees (default 0.015, ~1.5 km)
//   npm run fetch-geojson -- --precision 3        coordinate decimals (default 3, ~100 m)
//   npm run check-geojson                         validate the committed file without rewriting it (used in CI)
//
// The script fails when a feature name has no slug in src/utils/stateSlugMap.js, so the map never
// silently shows an unclickable state. It also lists expected states that are missing from the
// dataset (for example Ladakh or Telangana in older files) so the team can pick a better source.
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EXPECTED_SLUGS, slugForFeature } from '../src/utils/stateSlugMap.js';

const DEFAULT_URL = 'https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson';
const MAX_BYTES = 1024 * 1024;

const args = process.argv.slice(2);
const VALUE_OPTS = new Set(['--input', '--tolerance', '--precision']);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
};
const flag = (name) => args.includes(`--${name}`);
const positional = args.filter((a, i) => !a.startsWith('--') && !VALUE_OPTS.has(args[i - 1]));

const here = dirname(fileURLToPath(import.meta.url));
const target = resolve(here, '../public/data/india-states.geojson');
const check = flag('check');
const tolerance = Number(opt('tolerance', '0.015'));
const precision = Number(opt('precision', '3'));
const input = opt('input', null);
const url = positional[0] || DEFAULT_URL;

function fail(message) {
  console.error(`\n\u2716 ${message}`);
  process.exit(1);
}

// ---------- geometry helpers ----------

function perpendicularDistance([x, y], [x1, y1], [x2, y2]) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) return Math.hypot(x - x1, y - y1);
  const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy));
}

/** Iterative Douglas-Peucker on a ring. Keeps both end points. */
function simplifyRing(ring, tol) {
  if (!Array.isArray(ring) || ring.length <= 4 || tol <= 0) return ring;
  const keep = new Uint8Array(ring.length);
  keep[0] = 1;
  keep[ring.length - 1] = 1;
  const stack = [[0, ring.length - 1]];
  while (stack.length) {
    const [s, e] = stack.pop();
    let maxD = 0;
    let idx = -1;
    for (let i = s + 1; i < e; i += 1) {
      const d = perpendicularDistance(ring[i], ring[s], ring[e]);
      if (d > maxD) {
        maxD = d;
        idx = i;
      }
    }
    if (idx !== -1 && maxD > tol) {
      keep[idx] = 1;
      stack.push([s, idx], [idx, e]);
    }
  }
  const out = ring.filter((_, i) => keep[i]);
  return out.length >= 4 ? out : ring;
}

/** Rounds coordinates, drops consecutive duplicates and guarantees the ring is closed. */
function cleanRing(ring, decimals) {
  const f = 10 ** decimals;
  const out = [];
  for (const [lng, lat] of ring) {
    const p = [Math.round(lng * f) / f, Math.round(lat * f) / f];
    const last = out[out.length - 1];
    if (!last || last[0] !== p[0] || last[1] !== p[1]) out.push(p);
  }
  if (out.length > 1) {
    const [first, last] = [out[0], out[out.length - 1]];
    if (first[0] !== last[0] || first[1] !== last[1]) out.push([first[0], first[1]]);
  }
  return out;
}

function simplifyPolygon(polygon, tol, decimals) {
  const [outer, ...holes] = polygon;
  const cleanOuter = cleanRing(simplifyRing(outer, tol), decimals);
  if (cleanOuter.length < 4) return null;
  const cleanHoles = holes.map((h) => cleanRing(simplifyRing(h, tol), decimals)).filter((h) => h.length >= 4);
  return [cleanOuter, ...cleanHoles];
}

function simplifyGeometry(geometry, tol, decimals) {
  if (!geometry) return null;
  if (geometry.type === 'Polygon') {
    const poly = simplifyPolygon(geometry.coordinates, tol, decimals);
    return poly ? { type: 'Polygon', coordinates: poly } : null;
  }
  if (geometry.type === 'MultiPolygon') {
    const polys = geometry.coordinates.map((p) => simplifyPolygon(p, tol, decimals)).filter(Boolean);
    if (!polys.length) return null;
    return polys.length === 1 ? { type: 'Polygon', coordinates: polys[0] } : { type: 'MultiPolygon', coordinates: polys };
  }
  return null;
}

function countPoints(geometry) {
  if (!geometry) return 0;
  const polys = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.type === 'MultiPolygon' ? geometry.coordinates : [];
  return polys.reduce((n, poly) => n + poly.reduce((m, ring) => m + ring.length, 0), 0);
}

// ---------- load ----------

async function load() {
  if (check) {
    try {
      await stat(target);
    } catch (err) {
      console.warn(`\u26a0 No file at ${target}.`);
      console.warn('  The 3D map will use the hex-tile fallback. Run "npm run fetch-geojson" to add real state boundaries.');
      process.exit(0);
    }
    return JSON.parse(await readFile(target, 'utf8'));
  }
  if (input) {
    const path = resolve(process.cwd(), input);
    console.log(`Reading ${path} ...`);
    return JSON.parse(await readFile(path, 'utf8'));
  }
  console.log(`Downloading ${url} ...`);
  const res = await fetch(url);
  if (!res.ok) fail(`Download failed: ${res.status} ${res.statusText}`);
  return res.json();
}

// ---------- main ----------

const geo = await load();
if (!geo || geo.type !== 'FeatureCollection' || !Array.isArray(geo.features)) {
  fail('Input is not a GeoJSON FeatureCollection');
}

const features = [];
const unmapped = [];
const seen = new Map();
let pointsBefore = 0;
let pointsAfter = 0;

for (const feature of geo.features) {
  const { name, slug, mapped } = slugForFeature(feature.properties || {});
  const geometry = check ? feature.geometry : simplifyGeometry(feature.geometry, tolerance, precision);
  if (!geometry) {
    console.warn(`\u26a0 Skipping "${name}": no usable polygon geometry`);
    continue;
  }
  if (!mapped) unmapped.push(name);
  pointsBefore += countPoints(feature.geometry);
  pointsAfter += countPoints(geometry);
  seen.set(slug, (seen.get(slug) || 0) + 1);
  features.push({ type: 'Feature', properties: { name, slug }, geometry });
}

console.log(`\nFeatures: ${features.length}`);
if (!check) console.log(`Vertices: ${pointsBefore.toLocaleString()} \u2192 ${pointsAfter.toLocaleString()} (tolerance ${tolerance}\u00b0, ${precision} decimals)`);

const missing = EXPECTED_SLUGS.filter((s) => !seen.has(s));
if (missing.length) {
  console.warn(`\n\u26a0 ${missing.length} expected state(s)/UT(s) not in this dataset:\n  ${missing.join('\n  ')}`);
  console.warn('  These will not appear on the map. For a current 28 states + 8 UTs file try https://github.com/datameet/maps');
  console.warn('  and pass it with: npm run fetch-geojson -- --input <file.geojson>');
}

if (unmapped.length) {
  fail(
    `${unmapped.length} feature name(s) have no slug in src/utils/stateSlugMap.js:\n  ${unmapped.join('\n  ')}\n` +
      '  Add them to MAP (normalised: lowercase, "&" -> "and") and run again.'
  );
}

if (check) {
  console.log('\n\u2714 GeoJSON is valid and every state maps to a slug.');
  process.exit(0);
}

const json = JSON.stringify({ type: 'FeatureCollection', features });
await mkdir(dirname(target), { recursive: true });
await writeFile(target, json);

const bytes = Buffer.byteLength(json);
console.log(`\n\u2714 Saved ${(bytes / 1024).toFixed(0)} KB to ${target}`);
if (bytes > MAX_BYTES) {
  console.warn(`\u26a0 File is over 1 MB. Re-run with a larger tolerance, e.g. --tolerance ${(tolerance * 2).toFixed(3)}`);
}
console.log('\nStates found:\n  ' + [...seen.keys()].sort().join('\n  '));

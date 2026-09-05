// Maps state names as they appear in common India GeoJSON datasets to backend slugs.
// Keys are normalised: lowercase, '&' -> 'and', extra spaces collapsed.
const MAP = {
  'andaman and nicobar islands': 'andaman-and-nicobar-islands',
  'andaman and nicobar island': 'andaman-and-nicobar-islands',
  'andaman and nicobar': 'andaman-and-nicobar-islands',
  'andhra pradesh': 'andhra-pradesh',
  'arunachal pradesh': 'arunachal-pradesh',
  'arunanchal pradesh': 'arunachal-pradesh',
  assam: 'assam',
  bihar: 'bihar',
  chandigarh: 'chandigarh',
  chhattisgarh: 'chhattisgarh',
  chattisgarh: 'chhattisgarh',
  'dadra and nagar haveli': 'dadra-and-nagar-haveli-and-daman-and-diu',
  'dadara and nagar havelli': 'dadra-and-nagar-haveli-and-daman-and-diu',
  'dadra and nagar haveli and daman and diu': 'dadra-and-nagar-haveli-and-daman-and-diu',
  'daman and diu': 'dadra-and-nagar-haveli-and-daman-and-diu',
  delhi: 'delhi',
  'nct of delhi': 'delhi',
  'national capital territory of delhi': 'delhi',
  goa: 'goa',
  gujarat: 'gujarat',
  haryana: 'haryana',
  'himachal pradesh': 'himachal-pradesh',
  'jammu and kashmir': 'jammu-and-kashmir',
  jharkhand: 'jharkhand',
  karnataka: 'karnataka',
  kerala: 'kerala',
  ladakh: 'ladakh',
  lakshadweep: 'lakshadweep',
  'madhya pradesh': 'madhya-pradesh',
  maharashtra: 'maharashtra',
  manipur: 'manipur',
  meghalaya: 'meghalaya',
  mizoram: 'mizoram',
  nagaland: 'nagaland',
  odisha: 'odisha',
  orissa: 'odisha',
  puducherry: 'puducherry',
  pondicherry: 'puducherry',
  punjab: 'punjab',
  rajasthan: 'rajasthan',
  sikkim: 'sikkim',
  'tamil nadu': 'tamil-nadu',
  tamilnadu: 'tamil-nadu',
  telangana: 'telangana',
  tripura: 'tripura',
  'uttar pradesh': 'uttar-pradesh',
  uttarakhand: 'uttarakhand',
  uttaranchal: 'uttarakhand',
  'west bengal': 'west-bengal',
};

const NAME_KEYS = ['NAME_1', 'ST_NM', 'st_nm', 'STATE', 'State_Name', 'state_name', 'NAME', 'name', 'STATE_NAME'];

const KNOWN_SLUGS = new Set(Object.values(MAP));

/** Every state and union territory the map is expected to show (28 + 8). */
export const EXPECTED_SLUGS = [...KNOWN_SLUGS].sort();

export function normaliseName(name = '') {
  return String(name)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function slugify(name = '') {
  return normaliseName(name).replace(/\s+/g, '-');
}

export function featureName(properties = {}) {
  for (const key of NAME_KEYS) {
    if (properties[key]) return String(properties[key]);
  }
  return '';
}

/** Returns { name, slug, mapped } for a GeoJSON feature's properties. */
export function slugForFeature(properties = {}) {
  const name = featureName(properties);
  // Files prepared by scripts/fetchGeojson.mjs carry a pre-computed slug.
  if (properties.slug && KNOWN_SLUGS.has(properties.slug)) {
    return { name: name || properties.slug, slug: properties.slug, mapped: true };
  }
  const key = normaliseName(name);
  const slug = MAP[key];
  return { name: name || 'Unknown', slug: slug || slugify(name), mapped: Boolean(slug) };
}

export default MAP;

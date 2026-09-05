// Field definitions that drive the admin panel forms for each collection.
// Field `name` supports dotted paths (e.g. 'coordinates.lat'). Types:
//   text | textarea | number | select | state | list (one URL per line) | tags (comma separated)
import { PLACE_TYPES } from './catalog';

const NAME_EN = { name: 'name_en', label: 'Name (English)', type: 'text', required: true };
const NAME_HI = { name: 'name_hi', label: 'Name (Hindi)', type: 'text', required: true, lang: 'hi' };
const DESC_EN = { name: 'description_en', label: 'Description (English)', type: 'textarea', hint: '2 to 3 short, simple sentences' };
const DESC_HI = { name: 'description_hi', label: 'Description (Hindi)', type: 'textarea', lang: 'hi' };
const IMAGES = {
  name: 'images',
  label: 'Image URLs (one per line)',
  type: 'list',
  hint: 'Direct upload.wikimedia.org links or /images/<file> served by the backend',
};
const STATE_REF = { name: 'stateId', label: 'State', type: 'state', required: true };

function culture(key, singular, label, icon) {
  return {
    key,
    singular,
    label,
    icon,
    hasStateFilter: true,
    listPath: (state) => `/api/${key}?limit=50${state ? `&state=${encodeURIComponent(state)}` : ''}`,
    publicLink: (item) => `/item/${key}/${item._id}`,
    fields: [STATE_REF, NAME_EN, NAME_HI, DESC_EN, DESC_HI, IMAGES],
  };
}

export const ADMIN_COLLECTIONS = [
  {
    key: 'states',
    singular: 'State',
    label: ['States', 'राज्य'],
    icon: '🗺️',
    hasStateFilter: false,
    listPath: () => '/api/states',
    publicLink: (item) => `/state/${item.slug}`,
    fields: [
      NAME_EN,
      NAME_HI,
      { name: 'slug', label: 'Slug', type: 'text', required: true, hint: 'lowercase-with-dashes, must match src/utils/stateSlugMap.js' },
      { name: 'geoJsonName', label: 'GeoJSON name', type: 'text', hint: 'Exact feature name in india-states.geojson' },
      { name: 'mapCoordinates.lat', label: 'Map latitude', type: 'number', required: true },
      { name: 'mapCoordinates.lng', label: 'Map longitude', type: 'number', required: true },
      { name: 'thumbnail', label: 'Thumbnail URL', type: 'text' },
      DESC_EN,
      DESC_HI,
    ],
  },
  {
    key: 'places',
    singular: 'Place',
    label: ['Places', 'स्थान'],
    icon: '🏰',
    hasStateFilter: true,
    listPath: (state) => `/api/places?limit=50${state ? `&state=${encodeURIComponent(state)}` : ''}`,
    publicLink: (item) => `/item/places/${item._id}`,
    fields: [
      STATE_REF,
      {
        name: 'type',
        label: 'Type',
        type: 'select',
        required: true,
        options: [...PLACE_TYPES.map((t) => ({ value: t.type, label: `${t.icon} ${t.label[0]}` })), { value: 'other', label: 'Other' }],
      },
      NAME_EN,
      NAME_HI,
      DESC_EN,
      DESC_HI,
      IMAGES,
      { name: 'model3D', label: '3D model URL (.glb / .gltf, optional)', type: 'text' },
      { name: 'coordinates.lat', label: 'Latitude', type: 'number' },
      { name: 'coordinates.lng', label: 'Longitude', type: 'number' },
      { name: 'bestTimeToVisit', label: 'Best time to visit', type: 'text', placeholder: 'October to March' },
      { name: 'tags', label: 'Tags (comma separated)', type: 'tags', placeholder: 'jaipur, palace, unesco' },
    ],
  },
  culture('crafts', 'Craft', ['Crafts', 'शिल्प'], '🎨'),
  culture('traditions', 'Tradition', ['Traditions', 'परंपराएँ'], '🪔'),
  culture('food', 'Dish', ['Food', 'भोजन'], '🍛'),
];

export function getPath(obj, path) {
  return path.split('.').reduce((o, k) => (o === null || o === undefined ? undefined : o[k]), obj);
}

export function setPath(obj, path, value) {
  const keys = path.split('.');
  let cur = obj;
  keys.slice(0, -1).forEach((k) => {
    if (typeof cur[k] !== 'object' || cur[k] === null) cur[k] = {};
    cur = cur[k];
  });
  cur[keys[keys.length - 1]] = value;
}

/** Converts an API document into flat string form values. */
export function itemToForm(fields, item) {
  const values = {};
  fields.forEach((f) => {
    let v = item ? getPath(item, f.name) : undefined;
    if (f.type === 'state' && v && typeof v === 'object') v = v._id;
    if (f.type === 'list') v = Array.isArray(v) ? v.join('\n') : '';
    else if (f.type === 'tags') v = Array.isArray(v) ? v.join(', ') : '';
    else if (v === undefined || v === null) v = '';
    values[f.name] = String(v);
  });
  return values;
}

/** Converts flat form values into the JSON body expected by /api/admin/:collection. */
export function formToPayload(fields, values) {
  const payload = {};
  fields.forEach((f) => {
    const raw = String(values[f.name] || '').trim();
    let v;
    if (f.type === 'list') v = raw.split('\n').map((s) => s.trim()).filter(Boolean);
    else if (f.type === 'tags') v = raw.split(',').map((s) => s.trim()).filter(Boolean);
    else if (f.type === 'number') v = raw === '' ? undefined : Number(raw);
    else v = raw;
    if (v !== undefined) setPath(payload, f.name, v);
  });
  return payload;
}

export function validateForm(fields, values) {
  const errors = {};
  fields.forEach((f) => {
    const raw = String(values[f.name] || '').trim();
    if (f.required && !raw) errors[f.name] = 'Required';
    else if (f.type === 'number' && raw && Number.isNaN(Number(raw))) errors[f.name] = 'Must be a number';
    else if (f.name === 'slug' && raw && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(raw)) errors[f.name] = 'Use lowercase letters, numbers and dashes only';
  });
  return errors;
}

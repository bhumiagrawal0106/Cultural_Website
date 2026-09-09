// Shared catalogue of content types used by StatePage tiles, cards and search results.

export const PLACE_TYPES = [
  { type: 'monument', label: ['Monuments', 'स्मारक'], icon: '🏛️' },
  { type: 'fort', label: ['Forts', 'किले'], icon: '🏰' },
  { type: 'temple', label: ['Temples', 'मंदिर'], icon: '🛕' },
  { type: 'gurudwara', label: ['Gurudwaras', 'गुरुद्वारे'], icon: '🔯' },
  { type: 'dargah', label: ['Dargahs', 'दरगाह'], icon: '🕌' },
  { type: 'church', label: ['Churches', 'गिरजाघर'], icon: '⛪' },
  { type: 'heritage', label: ['Heritage Sites', 'विरासत स्थल'], icon: '🏺' },
  { type: 'culture', label: ['Culture & Art', 'संस्कृति व कला'], icon: '🎭' },
  { type: 'haunted', label: ['Haunted Places', 'रहस्यमयी स्थान'], icon: '👻' },
  { type: 'tourism', label: ['Tourism Spots', 'पर्यटन स्थल'], icon: '🌄' },
];

export const CULTURE_COLLECTIONS = [
  { collection: 'crafts', label: ['Crafts', 'शिल्प'], icon: '🎨' },
  { collection: 'traditions', label: ['Traditions', 'परंपराएँ'], icon: '🪔' },
  { collection: 'food', label: ['Food', 'भोजन'], icon: '🍛' },
];

export const TABS = [
  ...PLACE_TYPES.map((t) => ({ key: t.type, collection: 'places', type: t.type, label: t.label, icon: t.icon })),
  ...CULTURE_COLLECTIONS.map((c) => ({ key: c.collection, collection: c.collection, label: c.label, icon: c.icon })),
];

export const COLLECTIONS = ['places', 'crafts', 'traditions', 'food'];

export const COLLECTION_LABEL = {
  places: ['Place', 'स्थान'],
  crafts: ['Craft', 'शिल्प'],
  traditions: ['Tradition', 'परंपरा'],
  food: ['Food', 'भोजन'],
};

export const RESULT_TYPE_LABEL = {
  state: ['State', 'राज्य'],
  place: ['Place', 'स्थान'],
  craft: ['Craft', 'शिल्प'],
  tradition: ['Tradition', 'परंपरा'],
  food: ['Food', 'भोजन'],
};

export function typeLabel(type) {
  const found = PLACE_TYPES.find((t) => t.type === type);
  return found ? found.label : ['Other', 'अन्य'];
}

export function typeIcon(type) {
  const found = PLACE_TYPES.find((t) => t.type === type);
  return found ? found.icon : '📍';
}

export function itemLink(collection, id) {
  return `/item/${collection}/${id}`;
}

export function placeholderImage(text = 'Bharat Darshan') {
  // Use a more visually appealing gradient placeholder from Placehold.co
  return `https://placehold.co/800x600/1a1a2e/FFD700?font=playfair-display&text=${encodeURIComponent(text)}`;
}

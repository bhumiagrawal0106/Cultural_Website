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

export const STATE_THUMBNAILS = {
  'andaman-nicobar': 'https://images.unsplash.com/photo-1589136777351-fdc9c9cab193?w=1200&q=80',
  'andaman-and-nicobar-islands': 'https://images.unsplash.com/photo-1589136777351-fdc9c9cab193?w=1200&q=80',
  'andhra-pradesh': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80',
  'arunachal-pradesh': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80',
  'assam': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
  'bihar': 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80',
  'chandigarh': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
  'chhattisgarh': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
  'dadra-nagar-haveli-daman-diu': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
  'dadra-and-nagar-haveli-and-daman-and-diu': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
  'delhi': 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80',
  'goa': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80',
  'gujarat': 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1200&q=80',
  'haryana': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80',
  'himachal-pradesh': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  'jammu-and-kashmir': 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1200&q=80',
  'jharkhand': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80',
  'karnataka': 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=1200&q=80',
  'kerala': 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80',
  'ladakh': 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80',
  'lakshadweep': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
  'madhya-pradesh': 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200&q=80',
  'maharashtra': 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1200&q=80',
  'manipur': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80',
  'meghalaya': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  'mizoram': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  'nagaland': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
  'odisha': 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=1200&q=80',
  'puducherry': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80',
  'punjab': 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=1200&q=80',
  'rajasthan': 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80',
  'sikkim': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  'tamil-nadu': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80',
  'telangana': 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&q=80',
  'tripura': 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80',
  'uttar-pradesh': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&q=80',
  'uttarakhand': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  'west-bengal': 'https://images.unsplash.com/photo-1558431382-27e303142255?w=1200&q=80'
};

export function getStateThumbnail(slug) {
  if (!slug) return null;
  const clean = String(slug).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return STATE_THUMBNAILS[clean] || null;
}


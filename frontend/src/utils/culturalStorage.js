import fallbackCatalog from '../data/fallbackCatalog.json';

const STORAGE_KEY = 'bharat_cultural_overrides';

export function getOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveOverride(item) {
  try {
    const overrides = getOverrides();
    const id = item._id || item.slug;
    overrides[id] = {
      ...overrides[id],
      ...item,
      _updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    window.dispatchEvent(new CustomEvent('cultural-data-updated', { detail: item }));
  } catch (e) {
    console.error('Failed to save override:', e);
  }
}

export function deleteOverride(id) {
  try {
    const overrides = getOverrides();
    delete overrides[id];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    window.dispatchEvent(new CustomEvent('cultural-data-updated', { detail: { _id: id } }));
  } catch (e) {
    console.error('Failed to delete override:', e);
  }
}

export function clearAllOverrides() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('cultural-data-updated', { detail: {} }));
  } catch (e) {
    console.error('Failed to clear overrides:', e);
  }
}

export function applyOverrides(target) {
  if (!target) return target;
  if (Array.isArray(target)) {
    return target.map((it) => applyOverrides(it));
  }
  const overrides = getOverrides();
  const id = target._id || target.slug;
  if (id && overrides[id]) {
    const o = overrides[id];
    const res = { ...target, ...o };
    // Synchronize image and images array
    if (o.image) {
      const existing = Array.isArray(res.images) ? res.images.filter((img) => img !== o.image) : [];
      res.images = [o.image, ...existing];
    } else if (Array.isArray(o.images) && o.images.length > 0) {
      res.image = o.images[0];
    }
    // Fallback sync for name/description if single field was updated
    if (o.name && !o.name_en) res.name_en = o.name;
    if (o.description && !o.description_en) res.description_en = o.description;
    return res;
  }
  return target;
}

/**
 * Returns all items for any of the 13 tabs across all 36 states,
 * merging with any admin overrides.
 */
export function getCatalogForTab(tabKey, stateSlug = '') {
  const overrides = getOverrides();
  const list = [];

  for (const st of fallbackCatalog) {
    if (stateSlug && st.slug !== stateSlug) continue;

    if (tabKey === 'states') {
      const stateItem = overrides[st.slug] ? { ...st, ...overrides[st.slug] } : st;
      list.push(stateItem);
      continue;
    }

    if (tabKey === 'crafts' || tabKey === 'traditions' || tabKey === 'food') {
      const colItems = st[tabKey] || [];
      for (const item of colItems) {
        const merged = overrides[item._id] ? { ...item, ...overrides[item._id] } : item;
        list.push({ ...merged, stateId: { slug: st.slug, name_en: st.name_en, name_hi: st.name_hi } });
      }
      continue;
    }

    // It's one of the 10 place types (fort, monument, temple, etc.)
    const places = st.places || [];
    for (const p of places) {
      if (tabKey === 'places' || p.type === tabKey) {
        const merged = overrides[p._id] ? { ...p, ...overrides[p._id] } : p;
        list.push({ ...merged, stateId: { slug: st.slug, name_en: st.name_en, name_hi: st.name_hi } });
      }
    }
  }

  return list;
}

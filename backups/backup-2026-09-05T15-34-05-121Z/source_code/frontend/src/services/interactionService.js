/**
 * interactionService.js
 * Manages social media interactions (Likes, Views, Engagement) across all categories.
 */

const LIKES_STORAGE_KEY = 'bharat_darshan_liked_items';
const VIEWS_SESSION_KEY = 'bharat_darshan_viewed_session';

// Format numbers into social-media style: 1.2K, 3.4M, or 450
export function formatSocialCount(num) {
  if (num === null || num === undefined || isNaN(num)) return '0';
  const val = Number(num);
  if (val >= 1000000) {
    return (val / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (val >= 1000) {
    return (val / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return String(val);
}

// Get set of locally liked item IDs
export function getLikedItemIds() {
  try {
    const raw = localStorage.getItem(LIKES_STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) {
    return new Set();
  }
}

// Check if specific item is liked by current user
export function isItemLiked(id) {
  if (!id) return false;
  const liked = getLikedItemIds();
  return liked.has(String(id));
}

// Toggle like for an item (optimistic update + server sync)
export async function toggleLike(collection, id, currentLiked) {
  const nextLiked = !currentLiked;
  const strId = String(id);

  // Update local storage immediately for snappy UI
  try {
    const liked = getLikedItemIds();
    if (nextLiked) {
      liked.add(strId);
    } else {
      liked.delete(strId);
    }
    localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify([...liked]));
  } catch (e) {
    // Ignore storage issues
  }

  // Trigger server sync
  try {
    const res = await fetch('/api/interactions/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        collection,
        id,
        action: nextLiked ? 'like' : 'unlike',
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: true,
        isLiked: nextLiked,
        likesCount: data.likesCount,
        viewCount: data.viewCount,
      };
    }
  } catch (err) {
    console.warn('[interactionService] Failed to sync like with backend:', err.message);
  }

  return {
    success: false,
    isLiked: nextLiked,
  };
}

// Record a view for an item (throttled to once per session per item)
export async function recordView(collection, id) {
  if (!id) return;
  const strId = String(id);

  try {
    const raw = sessionStorage.getItem(VIEWS_SESSION_KEY);
    const viewed = raw ? new Set(JSON.parse(raw)) : new Set();

    // Only record once per session to avoid inflated counts on page refresh
    if (viewed.has(strId)) return;

    viewed.add(strId);
    sessionStorage.setItem(VIEWS_SESSION_KEY, JSON.stringify([...viewed]));

    const res = await fetch('/api/interactions/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collection, id }),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // Non-blocking
  }
}

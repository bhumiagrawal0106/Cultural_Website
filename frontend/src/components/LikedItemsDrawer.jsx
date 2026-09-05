import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getLikedItemIds, toggleLike } from '../services/interactionService';
import { itemLink } from '../utils/catalog';

export default function LikedItemsDrawer({ isOpen, onClose }) {
  const { isHindi } = useLanguage();
  const [likedItems, setLikedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const likedIds = [...getLikedItemIds()];

    if (likedIds.length === 0) {
      setLikedItems([]);
      return;
    }

    setLoading(true);
    // Fetch places, crafts, food, traditions that match liked IDs
    Promise.all([
      fetch('/api/places?limit=100').then((r) => (r.ok ? r.json() : { data: [] })),
      fetch('/api/crafts?limit=50').then((r) => (r.ok ? r.json() : { data: [] })),
      fetch('/api/food?limit=50').then((r) => (r.ok ? r.json() : { data: [] })),
      fetch('/api/traditions?limit=50').then((r) => (r.ok ? r.json() : { data: [] })),
    ])
      .then(([places, crafts, food, traditions]) => {
        const all = [
          ...(places.data || []).map((p) => ({ ...p, collection: 'places' })),
          ...(crafts.data || []).map((c) => ({ ...c, collection: 'crafts' })),
          ...(food.data || []).map((f) => ({ ...f, collection: 'food' })),
          ...(traditions.data || []).map((t) => ({ ...t, collection: 'traditions' })),
        ];

        const matched = all.filter((item) => likedIds.includes(String(item._id)));
        setLikedItems(matched);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [isOpen]);

  const handleRemove = async (item) => {
    await toggleLike(item.collection, item._id, true);
    setLikedItems((prev) => prev.filter((i) => i._id !== item._id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-white shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-rose-50 to-pink-50">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl" aria-hidden="true">❤️</span>
              <div>
                <h3 className="text-lg font-black text-india-navy">
                  {isHindi ? 'मेरी पसंदीदा धरोहर' : 'My Heritage Diary'}
                </h3>
                <p className="text-xs text-gray-500">
                  {likedItems.length} {isHindi ? 'पसंदीदा वस्तुएं' : 'liked landmarks & traditions'}
                </p>
              </div>
            </div>
            <button type="button" onClick={onClose} className="rounded-full p-2 text-gray-400 hover:bg-white hover:text-gray-700 transition">
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {loading ? (
              <div className="py-20 text-center text-gray-400">Loading your diary...</div>
            ) : likedItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <span className="text-5xl mb-3">🤍</span>
                <h4 className="text-base font-bold text-gray-800">
                  {isHindi ? 'कोई पसंदीदा वस्तु नहीं' : 'No Liked Items Yet'}
                </h4>
                <p className="mt-1 text-xs text-gray-500 max-w-xs leading-relaxed">
                  {isHindi
                    ? 'किसी भी स्मारक, शिल्प या व्यंजन पर दिल (❤️) आइकन दबाकर अपनी व्यक्तिगत सांस्कृतिक डायरी बनाएं।'
                    : 'Tap the heart icon on any monument, craft, or cuisine card to save it to your personal cultural diary.'}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-5 rounded-xl bg-india-navy px-5 py-2.5 text-xs font-bold text-white hover:bg-opacity-90 transition"
                >
                  {isHindi ? 'खोजें' : 'Browse Catalog'}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {likedItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-xs hover:border-rose-200 transition"
                  >
                    {item.images?.[0] && (
                      <img
                        src={item.images[0]}
                        alt={item.name_en}
                        className="h-14 w-14 rounded-xl object-cover bg-gray-100 flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={itemLink(item.collection, item._id)}
                        onClick={onClose}
                        className="block font-bold text-xs text-gray-900 hover:text-rose-600 truncate"
                      >
                        {item.name_en}
                      </Link>
                      <p className="text-[11px] text-gray-500 truncate">
                        {item.stateId?.name_en || ''} • <span className="capitalize">{item.collection}</span>
                      </p>
                      <p className="text-[10px] text-rose-500 font-semibold mt-0.5">
                        ❤️ {item.likesCount || 1} likes
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(item)}
                      title="Remove from favorites"
                      className="text-gray-300 hover:text-rose-500 p-1.5 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

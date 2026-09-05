import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { itemLink } from '../utils/catalog';

export default function CommandPalette({ isOpen, onClose }) {
  const { isHindi } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Load states once on mount for instant state jumps
  useEffect(() => {
    fetch('/api/states')
      .then((r) => (r.ok ? r.json() : { data: [] }))
      .then((res) => {
        if (res.data) setStates(res.data);
      })
      .catch(() => {});
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Live query search across states and items
  useEffect(() => {
    if (!isOpen) return;
    const q = query.trim().toLowerCase();

    if (!q) {
      // Default recommended quick shortcuts
      const quickStates = states.slice(0, 5).map((s) => ({
        type: 'state',
        title: s.name_en,
        subtitle: `${s.type === 'ut' ? 'Union Territory' : 'State'} • Capital: ${s.capital || 'India'}`,
        url: `/state/${s.slug}`,
        icon: '🗺️',
      }));

      const quickTools = [
        { type: 'tool', title: isHindi ? '3D भारत सांस्कृतिक मानचित्र' : '3D Bharat Cultural Map', subtitle: 'Interactive 3D Explorer', url: '/map3d', icon: '🌐' },
        { type: 'tool', title: isHindi ? 'सांस्कृतिक प्रश्नोत्तरी (Quiz)' : 'Heritage Cultural Quiz', subtitle: 'Test your knowledge', url: '/quiz', icon: '🏆' },
        { type: 'tool', title: isHindi ? 'राज्यों की तुलना करें' : 'Compare Indian States', subtitle: 'Side-by-side comparison', url: '/compare', icon: '⚖️' },
      ];

      setResults([...quickTools, ...quickStates]);
      setSelectedIndex(0);
      return;
    }

    setLoading(true);
    const controller = new AbortController();

    // 1. Filter local states
    const matchedStates = states
      .filter((s) => s.name_en?.toLowerCase().includes(q) || s.name_hi?.toLowerCase().includes(q))
      .map((s) => ({
        type: 'state',
        title: s.name_en,
        subtitle: `Explore ${s.name_en} (${s.type === 'ut' ? 'UT' : 'State'})`,
        url: `/state/${s.slug}`,
        icon: '🗺️',
      }));

    // 2. Fetch search results from backend
    fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const itemResults = [];
        if (data) {
          ['places', 'crafts', 'traditions', 'food'].forEach((col) => {
            if (Array.isArray(data[col])) {
              data[col].forEach((item) => {
                const iconMap = { places: '🏛️', crafts: '🎨', traditions: '🎭', food: '🍛' };
                itemResults.push({
                  type: col,
                  title: item.name_en || item.name || '',
                  subtitle: `${item.stateId?.name_en || ''} • ${col.toUpperCase()}`,
                  url: itemLink(col, item._id),
                  icon: iconMap[col] || '📍',
                });
              });
            }
          });
        }
        setResults([...matchedStates, ...itemResults].slice(0, 10));
        setSelectedIndex(0);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setResults(matchedStates.slice(0, 10));
          setSelectedIndex(0);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [query, isOpen, states, isHindi]);

  // Keyboard navigation (ArrowUp, ArrowDown, Enter, Escape)
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        navigate(results[selectedIndex].url);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Palette Modal */}
      <div className="relative mx-auto max-w-2xl transform divide-y divide-gray-100 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 transition-all">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3 bg-white">
          <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isHindi ? 'स्मारक, राज्य, शिल्प, परंपरा या व्यंजन खोजें... (Ctrl+K)' : 'Search any monument, state, craft, tradition, or cuisine... (Ctrl+K)'}
            className="h-11 w-full border-0 bg-transparent pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-hidden"
          />
          {loading && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-india-orange border-t-transparent mr-2" />
          )}
          <kbd className="hidden sm:inline-block rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-semibold text-gray-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-500">
              <span className="text-3xl block mb-2">🔍</span>
              {isHindi ? 'कोई परिणाम नहीं मिला।' : `No cultural landmarks found matching "${query}".`}
            </div>
          ) : (
            <ul className="space-y-1">
              {results.map((item, idx) => (
                <li key={`${item.type}-${item.url}-${idx}`}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate(item.url);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                      selectedIndex === idx
                        ? 'bg-amber-50 text-india-navy font-bold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-semibold text-gray-900">{item.title}</p>
                      <p className="truncate text-xs text-gray-500 font-normal">{item.subtitle}</p>
                    </div>
                    {selectedIndex === idx && (
                      <span className="text-xs text-india-orange font-bold hidden sm:inline">
                        Jump →
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer info */}
        <div className="flex flex-wrap items-center justify-between px-4 py-2 text-[11px] text-gray-400 bg-gray-50">
          <div className="flex items-center gap-3">
            <span>Navigate: <kbd className="font-semibold text-gray-600">↑</kbd> <kbd className="font-semibold text-gray-600">↓</kbd></span>
            <span>Select: <kbd className="font-semibold text-gray-600">Enter</kbd></span>
          </div>
          <span>36 States & UTs • 454 Landmarks</span>
        </div>
      </div>
    </div>
  );
}

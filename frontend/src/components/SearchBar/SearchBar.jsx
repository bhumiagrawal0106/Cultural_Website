import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import { RESULT_TYPE_LABEL } from '../../utils/catalog';
import fallbackCatalog from '../../data/fallbackCatalog.json';

function searchLocalCatalog(q) {
  const lower = q.toLowerCase();
  const list = [];
  for (const s of fallbackCatalog) {
    if (s.name_en?.toLowerCase().includes(lower) || s.name_hi?.toLowerCase().includes(lower)) {
      list.push({
        _id: s._id,
        resultType: 'state',
        name_en: s.name_en,
        name_hi: s.name_hi,
        description_en: s.description_en,
        description_hi: s.description_hi,
        linkTo: `/state/${s.slug}`,
      });
    }
  }
  for (const s of fallbackCatalog) {
    for (const col of ['places', 'crafts', 'food', 'traditions']) {
      for (const item of s[col] || []) {
        if (
          item.name_en?.toLowerCase().includes(lower) ||
          item.name_hi?.toLowerCase().includes(lower) ||
          item.type?.toLowerCase().includes(lower)
        ) {
          const singular = col === 'places' ? 'place' : col === 'crafts' ? 'craft' : col === 'traditions' ? 'tradition' : 'food';
          list.push({
            _id: item._id,
            resultType: singular,
            name_en: item.name_en,
            name_hi: item.name_hi,
            description_en: item.description_en,
            description_hi: item.description_hi,
            linkTo: `/state/${s.slug}?tab=${item.type || col}`,
          });
        }
      }
    }
  }
  return list.slice(0, 8);
}

export default function SearchBar({ size = 'md', autoFocus = false, onNavigate }) {
  const { ui, pick, pickTuple } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapperRef = useRef(null);

  // Debounced autocomplete
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setLoading(false);
      return undefined;
    }
    setLoading(true);
    const handle = setTimeout(() => {
      api
        .get(`/api/search?q=${encodeURIComponent(q)}`)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setResults(res.data.slice(0, 8));
          } else {
            setResults(searchLocalCatalog(q));
          }
          setOpen(true);
        })
        .catch(() => {
          const local = searchLocalCatalog(q);
          setResults(local);
          if (local.length > 0) setOpen(true);
        })
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(handle);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const go = (to) => {
    setOpen(false);
    setQuery('');
    setResults([]);
    navigate(to);
    if (onNavigate) onNavigate();
  };

  const submit = (e) => {
    e.preventDefault();
    if (active >= 0 && results[active]) return go(results[active].linkTo);
    const q = query.trim();
    if (q) go(`/search?q=${encodeURIComponent(q)}`);
    return undefined;
  };

  const onKeyDown = (e) => {
    if (!open || !results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a <= 0 ? results.length - 1 : a - 1));
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const large = size === 'lg';

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={submit} role="search" className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </span>
        <input
          type="search"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
          }}
          onFocus={() => results.length && setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={ui('searchPlaceholder')}
          aria-label={ui('search')}
          aria-expanded={open}
          aria-autocomplete="list"
          className={`input pl-10 ${large ? 'py-3.5 text-base shadow-card' : ''}`}
        />
        {loading && (
          <span className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-india-orange border-t-transparent" />
        )}
      </form>

      {open && results.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-40 mt-2 max-h-80 w-full overflow-auto rounded-xl border border-gray-100 bg-white p-1 shadow-card"
        >
          {results.map((r, i) => (
            <li key={`${r.resultType}-${r._id}`} role="option" aria-selected={i === active}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r.linkTo)}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm ${
                  i === active ? 'bg-india-navy/5' : 'hover:bg-gray-50'
                }`}
              >
                <span className="truncate font-medium text-india-text">{pick(r, 'name')}</span>
                <span className="chip shrink-0 bg-india-orange/15 text-india-text">
                  {pickTuple(RESULT_TYPE_LABEL[r.resultType])}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

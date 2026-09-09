import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import fallbackCatalog from '../data/fallbackCatalog.json';

export default function StateCompareModal({ isOpen, onClose }) {
  const { isHindi } = useLanguage();
  const [states, setStates] = useState(fallbackCatalog);
  const defaultRaj = fallbackCatalog.find((s) => s.slug === 'rajasthan') || fallbackCatalog[0];
  const defaultKer = fallbackCatalog.find((s) => s.slug === 'kerala') || fallbackCatalog[1];
  const [stateAId, setStateAId] = useState(defaultRaj._id);
  const [stateBId, setStateBId] = useState(defaultKer._id);
  const [stateAData, setStateAData] = useState(null);
  const [stateBData, setStateBData] = useState(null);
  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);

  useEffect(() => {
    fetch('/api/states')
      .then((r) => (r.ok ? r.json() : { data: [] }))
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setStates(res.data);
          const raj = res.data.find((s) => s.slug === 'rajasthan') || res.data[0];
          const ker = res.data.find((s) => s.slug === 'kerala') || res.data[1];
          if (raj) setStateAId(raj._id);
          if (ker) setStateBId(ker._id);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch full details for State A
  useEffect(() => {
    if (!stateAId) return;
    const st = states.find((s) => s._id === stateAId) || fallbackCatalog.find((s) => s._id === stateAId || s.slug === stateAId);
    if (!st) return;

    // Display rich data immediately
    setStateAData({
      state: st,
      placesCount: st.places?.length || 0,
      crafts: st.crafts || [],
      food: st.food || [],
      traditions: st.traditions || [],
    });

    setLoadingA(true);
    Promise.all([
      fetch(`/api/places?state=${st.slug}&limit=50`).then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch(`/api/crafts?state=${st.slug}&limit=20`).then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch(`/api/food?state=${st.slug}&limit=20`).then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch(`/api/traditions?state=${st.slug}&limit=20`).then((r) => (r.ok ? r.json() : null)).catch(() => null),
    ])
      .then(([p, c, f, t]) => {
        if (p || c || f || t) {
          setStateAData({
            state: st,
            placesCount: p?.total || p?.data?.length || st.places?.length || 0,
            crafts: c?.data && c.data.length ? c.data : st.crafts || [],
            food: f?.data && f.data.length ? f.data : st.food || [],
            traditions: t?.data && t.data.length ? t.data : st.traditions || [],
          });
        }
        setLoadingA(false);
      })
      .catch(() => setLoadingA(false));
  }, [stateAId, states]);

  // Fetch full details for State B
  useEffect(() => {
    if (!stateBId) return;
    const st = states.find((s) => s._id === stateBId) || fallbackCatalog.find((s) => s._id === stateBId || s.slug === stateBId);
    if (!st) return;

    // Display rich data immediately
    setStateBData({
      state: st,
      placesCount: st.places?.length || 0,
      crafts: st.crafts || [],
      food: st.food || [],
      traditions: st.traditions || [],
    });

    setLoadingB(true);
    Promise.all([
      fetch(`/api/places?state=${st.slug}&limit=50`).then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch(`/api/crafts?state=${st.slug}&limit=20`).then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch(`/api/food?state=${st.slug}&limit=20`).then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch(`/api/traditions?state=${st.slug}&limit=20`).then((r) => (r.ok ? r.json() : null)).catch(() => null),
    ])
      .then(([p, c, f, t]) => {
        if (p || c || f || t) {
          setStateBData({
            state: st,
            placesCount: p?.total || p?.data?.length || st.places?.length || 0,
            crafts: c?.data && c.data.length ? c.data : st.crafts || [],
            food: f?.data && f.data.length ? f.data : st.food || [],
            traditions: t?.data && t.data.length ? t.data : st.traditions || [],
          });
        }
        setLoadingB(false);
      })
      .catch(() => setLoadingB(false));
  }, [stateBId, states]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative mx-auto max-w-4xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">⚖️</span>
            <div>
              <h3 className="text-lg font-black text-india-navy">
                {isHindi ? 'राज्यों की सांस्कृतिक तुलना' : 'State & UT Cultural Comparison'}
              </h3>
              <p className="text-xs text-gray-500">
                {isHindi ? 'किन्हीं भी 2 भारतीय राज्यों की विरासत, कला और भोजन की तुलना करें' : 'Compare heritage landmarks, crafts, cuisine, and traditions side-by-side'}
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-gray-400 hover:bg-white hover:text-gray-700 transition">
            ✕
          </button>
        </div>

        {/* State Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-gray-50/70 border-b border-gray-100">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              {isHindi ? 'पहला राज्य / केंद्र शासित प्रदेश' : 'Select State A'}
            </label>
            <select
              value={stateAId}
              onChange={(e) => setStateAId(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-800 shadow-xs focus:border-india-orange focus:ring-1 focus:ring-india-orange"
            >
              {states.map((s) => (
                <option key={`a-${s._id}`} value={s._id}>
                  {s.name_en} ({s.type === 'ut' ? 'UT' : 'State'})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              {isHindi ? 'दूसरा राज्य / केंद्र शासित प्रदेश' : 'Select State B'}
            </label>
            <select
              value={stateBId}
              onChange={(e) => setStateBId(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-800 shadow-xs focus:border-india-orange focus:ring-1 focus:ring-india-orange"
            >
              {states.map((s) => (
                <option key={`b-${s._id}`} value={s._id}>
                  {s.name_en} ({s.type === 'ut' ? 'UT' : 'State'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="p-5 max-h-[65vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-6">
            {/* Column A */}
            <div className="space-y-4">
              {loadingA || !stateAData ? (
                <div className="py-12 text-center text-gray-400">Loading State A...</div>
              ) : (
                <>
                  <div className="text-center pb-3 border-b border-gray-100">
                    <h4 className="text-xl font-black text-india-navy">{stateAData.state.name_en}</h4>
                    <span className="inline-block mt-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-800 border border-amber-200">
                      Capital: {stateAData.state.capital || 'N/A'}
                    </span>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-3 bg-white shadow-xs">
                    <p className="text-xs text-gray-400 font-bold uppercase">🏛️ Heritage Landmarks</p>
                    <p className="text-2xl font-black text-india-navy mt-1">{stateAData.placesCount} Sites</p>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-3 bg-white shadow-xs">
                    <p className="text-xs text-gray-400 font-bold uppercase">🎨 Signature Crafts ({stateAData.crafts.length})</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {stateAData.crafts.map((c) => (
                        <span key={c._id} className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700">
                          {c.name_en}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-3 bg-white shadow-xs">
                    <p className="text-xs text-gray-400 font-bold uppercase">🍛 Famous Foods ({stateAData.food.length})</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {stateAData.food.map((f) => (
                        <span key={f._id} className="rounded-md bg-orange-50 px-2 py-0.5 text-[11px] font-medium text-orange-800">
                          {f.name_en}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={`/state/${stateAData.state.slug}`}
                    onClick={onClose}
                    className="block text-center rounded-xl bg-india-navy py-2.5 text-xs font-bold text-white hover:bg-opacity-90 transition"
                  >
                    View Full {stateAData.state.name_en} Guide →
                  </Link>
                </>
              )}
            </div>

            {/* Column B */}
            <div className="space-y-4">
              {loadingB || !stateBData ? (
                <div className="py-12 text-center text-gray-400">Loading State B...</div>
              ) : (
                <>
                  <div className="text-center pb-3 border-b border-gray-100">
                    <h4 className="text-xl font-black text-india-navy">{stateBData.state.name_en}</h4>
                    <span className="inline-block mt-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-800 border border-amber-200">
                      Capital: {stateBData.state.capital || 'N/A'}
                    </span>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-3 bg-white shadow-xs">
                    <p className="text-xs text-gray-400 font-bold uppercase">🏛️ Heritage Landmarks</p>
                    <p className="text-2xl font-black text-india-navy mt-1">{stateBData.placesCount} Sites</p>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-3 bg-white shadow-xs">
                    <p className="text-xs text-gray-400 font-bold uppercase">🎨 Signature Crafts ({stateBData.crafts.length})</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {stateBData.crafts.map((c) => (
                        <span key={c._id} className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700">
                          {c.name_en}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-gray-200 p-3 bg-white shadow-xs">
                    <p className="text-xs text-gray-400 font-bold uppercase">🍛 Famous Foods ({stateBData.food.length})</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {stateBData.food.map((f) => (
                        <span key={f._id} className="rounded-md bg-orange-50 px-2 py-0.5 text-[11px] font-medium text-orange-800">
                          {f.name_en}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={`/state/${stateBData.state.slug}`}
                    onClick={onClose}
                    className="block text-center rounded-xl bg-india-navy py-2.5 text-xs font-bold text-white hover:bg-opacity-90 transition"
                  >
                    View Full {stateBData.state.name_en} Guide →
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

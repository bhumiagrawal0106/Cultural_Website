import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import usePageMeta from '../hooks/usePageMeta';

export default function ComparePage() {
  const { isHindi, pick } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [states, setStates] = useState([]);
  const [stateAId, setStateAId] = useState('');
  const [stateBId, setStateBId] = useState('');
  const [stateAData, setStateAData] = useState(null);
  const [stateBData, setStateBData] = useState(null);
  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);

  usePageMeta(
    isHindi ? 'राज्यों की तुलना | भारत दर्शन' : 'Compare Indian States & UTs | Bharat Darshan',
    'Compare heritage monuments, crafts, cuisine, and culture between any two Indian states or union territories side-by-side.'
  );

  useEffect(() => {
    fetch('/api/states')
      .then((r) => (r.ok ? r.json() : { data: [] }))
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setStates(res.data);
          const aSlug = searchParams.get('a');
          const bSlug = searchParams.get('b');

          const sA = aSlug ? res.data.find((s) => s.slug === aSlug) : res.data.find((s) => s.slug === 'rajasthan') || res.data[0];
          const sB = bSlug ? res.data.find((s) => s.slug === bSlug) : res.data.find((s) => s.slug === 'kerala') || res.data[1];

          setStateAId(sA?._id || res.data[0]._id);
          setStateBId(sB?._id || res.data[1]._id);
        }
      });
  }, [searchParams]);

  // Fetch full details for State A
  useEffect(() => {
    if (!stateAId || states.length === 0) return;
    const st = states.find((s) => s._id === stateAId);
    if (!st) return;
    setLoadingA(true);

    Promise.all([
      fetch(`/api/places?state=${st.slug}&limit=50`).then((r) => r.json()),
      fetch(`/api/crafts?state=${st.slug}&limit=20`).then((r) => r.json()),
      fetch(`/api/food?state=${st.slug}&limit=20`).then((r) => r.json()),
      fetch(`/api/traditions?state=${st.slug}&limit=20`).then((r) => r.json()),
    ])
      .then(([p, c, f, t]) => {
        setStateAData({
          state: st,
          placesCount: p.total || p.data?.length || 0,
          places: p.data || [],
          crafts: c.data || [],
          food: f.data || [],
          traditions: t.data || [],
        });
        setLoadingA(false);
      })
      .catch(() => setLoadingA(false));
  }, [stateAId, states]);

  // Fetch full details for State B
  useEffect(() => {
    if (!stateBId || states.length === 0) return;
    const st = states.find((s) => s._id === stateBId);
    if (!st) return;
    setLoadingB(true);

    Promise.all([
      fetch(`/api/places?state=${st.slug}&limit=50`).then((r) => r.json()),
      fetch(`/api/crafts?state=${st.slug}&limit=20`).then((r) => r.json()),
      fetch(`/api/food?state=${st.slug}&limit=20`).then((r) => r.json()),
      fetch(`/api/traditions?state=${st.slug}&limit=20`).then((r) => r.json()),
    ])
      .then(([p, c, f, t]) => {
        setStateBData({
          state: st,
          placesCount: p.total || p.data?.length || 0,
          places: p.data || [],
          crafts: c.data || [],
          food: f.data || [],
          traditions: t.data || [],
        });
        setLoadingB(false);
      })
      .catch(() => setLoadingB(false));
  }, [stateBId, states]);

  const handleStateAChange = (id) => {
    setStateAId(id);
    const st = states.find((s) => s._id === id);
    if (st) {
      setSearchParams((prev) => {
        prev.set('a', st.slug);
        return prev;
      });
    }
  };

  const handleStateBChange = (id) => {
    setStateBId(id);
    const st = states.find((s) => s._id === id);
    if (st) {
      setSearchParams((prev) => {
        prev.set('b', st.slug);
        return prev;
      });
    }
  };

  return (
    <div className="container-page py-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-800 border border-amber-200">
          <span>⚖️</span> {isHindi ? 'सांस्कृतिक तुलना' : 'Interactive Comparison'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-india-navy mt-3">
          {isHindi ? 'राज्यों व केंद्र शासित प्रदेशों की तुलना करें' : 'Compare Indian States & UTs'}
        </h1>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          {isHindi
            ? 'विरासत, शिल्प, पारंपरिक व्यंजन और पर्यटन विशेषताओं की आमने-सामने तुलना करें।'
            : 'Compare heritage monuments, artistic traditions, signature cuisines, and travel highlights between any two regions of India.'}
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
            {isHindi ? 'पहला राज्य चुनें' : 'State A'}
          </label>
          <select
            value={stateAId}
            onChange={(e) => handleStateAChange(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm font-bold text-gray-900 shadow-xs focus:border-india-orange focus:ring-1 focus:ring-india-orange"
          >
            {states.map((s) => (
              <option key={`opt-a-${s._id}`} value={s._id}>
                {s.name_en} ({s.type === 'ut' ? 'UT' : 'State'})
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
            {isHindi ? 'दूसरा राज्य चुनें' : 'State B'}
          </label>
          <select
            value={stateBId}
            onChange={(e) => handleStateBChange(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm font-bold text-gray-900 shadow-xs focus:border-india-orange focus:ring-1 focus:ring-india-orange"
          >
            {states.map((s) => (
              <option key={`opt-b-${s._id}`} value={s._id}>
                {s.name_en} ({s.type === 'ut' ? 'UT' : 'State'})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Column A */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          {loadingA || !stateAData ? (
            <div className="py-20 text-center text-gray-400">Loading State A...</div>
          ) : (
            <>
              <div className="border-b border-gray-100 pb-5">
                <span className="text-xs font-bold uppercase text-india-orange tracking-wider">
                  {stateAData.state.type === 'ut' ? 'Union Territory' : 'Indian State'}
                </span>
                <h2 className="text-3xl font-black text-india-navy mt-1">{stateAData.state.name_en}</h2>
                <p className="text-sm font-medium text-gray-500 mt-1">
                  Capital: <span className="text-gray-900 font-bold">{stateAData.state.capital || 'N/A'}</span>
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider">🏛️ Monuments & Heritage Sites</h3>
                <p className="text-2xl font-black text-india-navy mt-1">{stateAData.placesCount} Verified Sites</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {stateAData.places.slice(0, 4).map((p) => (
                    <span key={p._id} className="chip bg-blue-50 text-blue-900 text-xs">
                      {p.name_en}
                    </span>
                  ))}
                  {stateAData.places.length > 4 && (
                    <span className="chip bg-gray-100 text-gray-600 text-xs">
                      +{stateAData.places.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider">🎨 Signature Crafts & Handlooms</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {stateAData.crafts.length > 0 ? (
                    stateAData.crafts.map((c) => (
                      <span key={c._id} className="chip bg-emerald-50 text-emerald-900 text-xs">
                        {c.name_en}
                      </span>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic">No crafts listed</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider">🍛 Signature Culinary Traditions</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {stateAData.food.length > 0 ? (
                    stateAData.food.map((f) => (
                      <span key={f._id} className="chip bg-orange-50 text-orange-900 text-xs">
                        {f.name_en}
                      </span>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic">No food items listed</p>
                  )}
                </div>
              </div>

              <Link
                to={`/state/${stateAData.state.slug}`}
                className="block w-full text-center rounded-xl bg-india-navy py-3 text-sm font-bold text-white shadow-sm hover:bg-opacity-90 transition"
              >
                Explore All {stateAData.state.name_en} Heritage →
              </Link>
            </>
          )}
        </div>

        {/* Column B */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          {loadingB || !stateBData ? (
            <div className="py-20 text-center text-gray-400">Loading State B...</div>
          ) : (
            <>
              <div className="border-b border-gray-100 pb-5">
                <span className="text-xs font-bold uppercase text-india-orange tracking-wider">
                  {stateBData.state.type === 'ut' ? 'Union Territory' : 'Indian State'}
                </span>
                <h2 className="text-3xl font-black text-india-navy mt-1">{stateBData.state.name_en}</h2>
                <p className="text-sm font-medium text-gray-500 mt-1">
                  Capital: <span className="text-gray-900 font-bold">{stateBData.state.capital || 'N/A'}</span>
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider">🏛️ Monuments & Heritage Sites</h3>
                <p className="text-2xl font-black text-india-navy mt-1">{stateBData.placesCount} Verified Sites</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {stateBData.places.slice(0, 4).map((p) => (
                    <span key={p._id} className="chip bg-blue-50 text-blue-900 text-xs">
                      {p.name_en}
                    </span>
                  ))}
                  {stateBData.places.length > 4 && (
                    <span className="chip bg-gray-100 text-gray-600 text-xs">
                      +{stateBData.places.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider">🎨 Signature Crafts & Handlooms</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {stateBData.crafts.length > 0 ? (
                    stateBData.crafts.map((c) => (
                      <span key={c._id} className="chip bg-emerald-50 text-emerald-900 text-xs">
                        {c.name_en}
                      </span>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic">No crafts listed</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider">🍛 Signature Culinary Traditions</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {stateBData.food.length > 0 ? (
                    stateBData.food.map((f) => (
                      <span key={f._id} className="chip bg-orange-50 text-orange-900 text-xs">
                        {f.name_en}
                      </span>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 italic">No food items listed</p>
                  )}
                </div>
              </div>

              <Link
                to={`/state/${stateBData.state.slug}`}
                className="block w-full text-center rounded-xl bg-india-navy py-3 text-sm font-bold text-white shadow-sm hover:bg-opacity-90 transition"
              >
                Explore All {stateBData.state.name_en} Heritage →
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

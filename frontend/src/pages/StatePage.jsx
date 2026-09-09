import { useMemo, useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import usePageMeta from '../hooks/usePageMeta';
import { useLanguage } from '../context/LanguageContext';
import { TABS } from '../utils/catalog';
import PlaceCard from '../components/PlaceCard/PlaceCard';
import Spinner from '../components/Spinner/Spinner';
import ErrorState from '../components/ErrorState/ErrorState';
import SafeImage from '../components/SafeImage';
import NotFound from './NotFound';

import fallbackCatalog from '../data/fallbackCatalog.json';
import { applyOverrides, getCatalogForTab } from '../utils/culturalStorage';

export default function StatePage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { ui, pick, pickTuple, isHindi } = useLanguage();

  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setDataVersion((v) => v + 1);
    window.addEventListener('cultural-data-updated', handleUpdate);
    return () => window.removeEventListener('cultural-data-updated', handleUpdate);
  }, []);

  const { data: stateRes, loading, error, refetch } = useFetch(`/api/states/${slug}`);
  const fallbackState = useMemo(() => fallbackCatalog.find((s) => s.slug === slug) || null, [slug, dataVersion]);
  const rawState = (stateRes && stateRes.data) || fallbackState;
  const state = useMemo(() => applyOverrides(rawState), [rawState, dataVersion]);

  const activeKey = TABS.some((t) => t.key === searchParams.get('tab')) ? searchParams.get('tab') : TABS[0].key;
  const tab = TABS.find((t) => t.key === activeKey);

  const listPath = useMemo(() => {
    if (!state) return null;
    if (tab.collection === 'places') return `/api/places?state=${slug}&type=${tab.type}&limit=24`;
    return `/api/${tab.collection}?state=${slug}&limit=24`;
  }, [state, slug, tab]);

  const { data: listRes, loading: listLoading, error: listError, refetch: refetchList } = useFetch(listPath);

  const fallbackItems = useMemo(() => {
    return getCatalogForTab(tab?.key || 'fort', slug);
  }, [tab, slug, dataVersion]);

  const rawItems = (listRes && listRes.data && listRes.data.length > 0) ? listRes.data : fallbackItems;
  const items = useMemo(() => rawItems.map((it) => applyOverrides(it)), [rawItems, dataVersion]);

  usePageMeta(state ? pick(state, 'name') : ui('loading'), state ? pick(state, 'description') : undefined);

  if (loading && !rawState) return <Spinner className="min-h-[50vh]" />;
  if (error && !rawState && error.status === 404) return <NotFound />;
  if (error && !rawState) return <ErrorState error={error} onRetry={refetch} className="mt-10" />;
  if (!state) return <NotFound />;

  const counts = state.counts || (() => {
    const resCounts = {};
    for (const t of TABS) {
      if (t.collection === 'places') {
        resCounts[t.key] = (state.places || []).filter((p) => p.type === t.type).length;
      } else {
        resCounts[t.key] = (state[t.collection] || []).length;
      }
    }
    return resCounts;
  })();

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <section className="relative h-64 w-full overflow-hidden bg-india-navy sm:h-80">
        <SafeImage
          src={state.thumbnail}
          alt=""
          fallbackText={state.name_en}
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="container-page absolute inset-x-0 bottom-0 pb-6 text-white">
          <Link to="/" className="text-sm opacity-90 hover:underline">
            ← {ui('home')}
          </Link>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-5xl" lang={isHindi ? 'hi' : 'en'}>
            {pick(state, 'name')}
          </h1>
        </div>
      </section>

      <section className="container-page mt-6">
        <p className="max-w-3xl text-base leading-relaxed text-gray-700 sm:text-lg" lang={isHindi ? 'hi' : 'en'}>
          {pick(state, 'description')}
        </p>
      </section>

      {/* Category tiles */}
      <section className="container-page mt-8">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist">
          {TABS.map((t) => {
            const count = counts[t.key];
            const active = t.key === activeKey;
            return (
              <button
                key={t.key}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setSearchParams({ tab: t.key }, { replace: true })}
                className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                  active
                    ? 'border-india-orange bg-india-orange text-india-text shadow'
                    : 'border-gray-200 bg-white text-india-text hover:border-india-navy/40'
                }`}
              >
                <span aria-hidden="true">{t.icon}</span>
                {pickTuple(t.label)}
                {typeof count === 'number' && (
                  <span className={`rounded-full px-1.5 text-xs ${active ? 'bg-white/70' : 'bg-gray-100 text-gray-600'}`}>{count}</span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid */}
      <section className="container-page mt-6 min-h-[300px]">
        {listLoading ? (
          <Spinner />
        ) : listError ? (
          <ErrorState error={listError} onRetry={refetchList} />
        ) : items.length === 0 ? (
          <div className="card p-10 text-center text-gray-500">
            <p className="text-4xl" aria-hidden="true">
              {tab.icon}
            </p>
            <p className="mt-3">{ui('nothingHere')}</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <PlaceCard key={item._id} item={item} collection={tab.collection} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

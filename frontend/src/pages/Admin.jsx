import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import useFetch from '../hooks/useFetch';
import usePageMeta from '../hooks/usePageMeta';
import { useLanguage } from '../context/LanguageContext';
import { ADMIN_COLLECTIONS } from '../utils/adminSchema';
import { typeIcon } from '../utils/catalog';
import AdminForm from '../components/admin/AdminForm';
import FeedbackInbox from '../components/admin/FeedbackInbox';
import SafeImage from '../components/SafeImage';
import Spinner from '../components/Spinner/Spinner';
import ErrorState from '../components/ErrorState/ErrorState';
import fallbackCatalog from '../data/fallbackCatalog.json';
import { getCatalogForTab, applyOverrides, clearAllOverrides, deleteOverride } from '../utils/culturalStorage';

const FEEDBACK_TAB = 'feedback';

export default function Admin() {
  const { ui, pickTuple, isHindi } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabKey = searchParams.get('tab') || 'fort';
  const isFeedback = tabKey === FEEDBACK_TAB;
  const collection = ADMIN_COLLECTIONS.find((c) => c.key === tabKey) || ADMIN_COLLECTIONS[0];
  const stateFilter = searchParams.get('state') || '';

  const { data: statesRes, refetch: refetchStates } = useFetch('/api/states');
  const states = (statesRes && statesRes.data && statesRes.data.length > 0) ? statesRes.data : fallbackCatalog;

  const listPath = isFeedback ? null : collection.listPath(collection.hasStateFilter ? stateFilter : '');
  const list = useFetch(listPath);

  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setDataVersion((v) => v + 1);
    window.addEventListener('cultural-data-updated', handleUpdate);
    return () => window.removeEventListener('cultural-data-updated', handleUpdate);
  }, []);

  const localCatalogItems = useMemo(() => {
    if (isFeedback) return [];
    return getCatalogForTab(collection.key, stateFilter);
  }, [collection.key, stateFilter, isFeedback, dataVersion]);

  const items = useMemo(() => {
    if (list.data && list.data.data && list.data.data.length > 0) {
      return list.data.data.map(applyOverrides);
    }
    return localCatalogItems;
  }, [list.data, localCatalogItems, dataVersion]);

  const [editing, setEditing] = useState(null); // null = closed, {} = new, doc = edit
  const [deleting, setDeleting] = useState(null);
  const [notice, setNotice] = useState(null); // { text, tone }

  usePageMeta(ui('adminPanel'), ui('adminSub'));

  useEffect(() => {
    if (!notice) return undefined;
    const t = setTimeout(() => setNotice(null), 4000);
    return () => clearTimeout(t);
  }, [notice]);

  const setTab = (key) => {
    const next = { tab: key };
    if (key !== FEEDBACK_TAB && stateFilter) next.state = stateFilter;
    setSearchParams(next, { replace: true });
    setEditing(null);
  };

  const setStateFilter = (slug) => {
    const next = { tab: tabKey };
    if (slug) next.state = slug;
    setSearchParams(next, { replace: true });
  };

  const afterChange = () => {
    setDataVersion((v) => v + 1);
    list.refetch();
    if (collection.key === 'states') refetchStates();
  };

  const onSaved = (doc) => {
    setEditing(null);
    setNotice({ text: `${ui('saved')}: ${doc.name_en || doc.slug}`, tone: 'ok' });
    afterChange();
  };

  const remove = async (item) => {
    if (!window.confirm(`${ui('confirmDelete')}\n\n${item.name_en}`)) return;
    setDeleting(item._id);
    deleteOverride(item._id);
    try {
      const backendKey = collection.backendKey || collection.key;
      await api.del(`/api/admin/${backendKey}/${item._id}`);
      setNotice({ text: `${ui('deleted')}: ${item.name_en}`, tone: 'ok' });
      afterChange();
    } catch (err) {
      setNotice({ text: `${ui('deleted')}: ${item.name_en}`, tone: 'ok' });
      afterChange();
    } finally {
      setDeleting(null);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to reset all customized images, names, and descriptions to factory defaults?')) {
      clearAllOverrides();
      setNotice({ text: 'All custom modifications reset to defaults.', tone: 'ok' });
      afterChange();
    }
  };

  const tabClass = (active) =>
    `flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-1.5 text-xs font-bold transition whitespace-nowrap shadow-2xs ${
      active ? 'border-india-orange bg-india-orange text-india-text shadow' : 'border-gray-200 bg-white text-gray-700 hover:border-india-navy/40 hover:bg-gray-50'
    }`;

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <section className="bg-india-navy text-white">
        <div className="container-page py-8">
          <span className="chip bg-india-orange text-india-text">{ui('admin')}</span>
          <h1 className="mt-2 text-3xl font-extrabold" lang={isHindi ? 'hi' : 'en'}>
            {ui('adminPanel')}
          </h1>
          <p className="mt-1 text-sm opacity-90" lang={isHindi ? 'hi' : 'en'}>
            {ui('adminSub')}
          </p>
        </div>
      </section>

      <div className="container-page mt-6">
        {/* Tabs */}
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist">
          {ADMIN_COLLECTIONS.map((c) => (
            <button key={c.key} type="button" role="tab" aria-selected={!isFeedback && c.key === collection.key} onClick={() => setTab(c.key)} className={tabClass(!isFeedback && c.key === collection.key)}>
              <span aria-hidden="true">{c.icon}</span> {pickTuple(c.label)}
            </button>
          ))}
          <button type="button" role="tab" aria-selected={isFeedback} onClick={() => setTab(FEEDBACK_TAB)} className={tabClass(isFeedback)}>
            <span aria-hidden="true">📫</span> {ui('feedbackInbox')}
          </button>
        </div>

        {/* Notice */}
        {notice && (
          <div
            role="status"
            className={`mt-4 rounded-lg border px-4 py-2 text-sm ${
              notice.tone === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-india-green/30 bg-india-green/10 text-india-green'
            }`}
          >
            {notice.text}
          </div>
        )}

        {isFeedback ? (
          <div className="mt-6">
            <FeedbackInbox />
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-india-navy">
                  {pickTuple(collection.label)}{' '}
                  <span className="text-sm font-normal text-gray-500">({list.data ? list.data.total : '\u2026'})</span>
                </h2>
                {collection.hasStateFilter && (
                  <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="input w-auto py-1.5 text-sm" aria-label={ui('allStates')}>
                    <option value="">{ui('allStates')}</option>
                    {states.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.name_en}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <button type="button" onClick={() => setEditing({})} className="btn-primary" disabled={Boolean(editing)}>
                + {ui('addNew')}
              </button>
            </div>

            {/* Form */}
            {editing && (
              <div className="mt-4">
                <AdminForm
                  key={editing._id || 'new'}
                  collection={collection}
                  item={editing._id ? editing : null}
                  states={states}
                  onSaved={onSaved}
                  onCancel={() => setEditing(null)}
                />
              </div>
            )}

            {/* Table */}
            <div className="card mt-4 overflow-x-auto">
              {list.loading ? (
                <Spinner />
              ) : list.error ? (
                <ErrorState error={list.error} onRetry={list.refetch} className="my-6 shadow-none" />
              ) : items.length === 0 ? (
                <p className="p-8 text-center text-sm text-gray-500">{ui('nothingHere')}</p>
              ) : (
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="px-4 py-3" />
                      <th className="px-4 py-3">Name</th>
                      {collection.key === 'states' ? <th className="px-4 py-3">Slug</th> : <th className="px-4 py-3">State</th>}
                      {collection.key === 'places' && <th className="px-4 py-3">Type</th>}
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {items.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="px-4 py-2">
                          <SafeImage
                            src={item.thumbnail || (item.images && item.images[0])}
                            alt=""
                            fallbackText={item.name_en}
                            className="h-10 w-14 rounded object-cover"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <p className="font-semibold text-india-text">{item.name_en}</p>
                          <p className="text-xs text-gray-500" lang="hi">
                            {item.name_hi}
                          </p>
                        </td>
                        <td className="px-4 py-2 text-gray-600">
                          {collection.key === 'states' ? <code className="text-xs">{item.slug}</code> : item.stateId && item.stateId.name_en}
                        </td>
                        {collection.key === 'places' && (
                          <td className="px-4 py-2 text-gray-600">
                            <span aria-hidden="true">{typeIcon(item.type)}</span> {item.type}
                          </td>
                        )}
                        <td className="px-4 py-2">
                          <div className="flex justify-end gap-1">
                            <Link to={collection.publicLink(item)} className="btn-ghost px-2 py-1 text-xs" target="_blank" rel="noreferrer">
                              {ui('view')} ↗
                            </Link>
                            <button type="button" onClick={() => setEditing(item)} className="btn-ghost px-2 py-1 text-xs">
                              {ui('edit')}
                            </button>
                            <button
                              type="button"
                              onClick={() => remove(item)}
                              disabled={deleting === item._id}
                              className="rounded-lg px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                            >
                              {ui('delete')}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useLanguage } from '../../context/LanguageContext';
import Spinner from '../Spinner/Spinner';
import ErrorState from '../ErrorState/ErrorState';
import { formatDate } from '../../utils/format';

const LIMIT = 20;

export default function FeedbackInbox() {
  const { ui, pick, lang } = useLanguage();
  const [kind, setKind] = useState('');
  const [page, setPage] = useState(1);
  const { data, loading, error, refetch } = useFetch(`/api/feedback?page=${page}&limit=${LIMIT}${kind ? `&kind=${kind}` : ''}`);

  const items = (data && data.data) || [];
  const total = (data && data.total) || 0;
  const pages = Math.max(1, Math.ceil(total / LIMIT));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-india-navy">{ui('feedbackInbox')}</h2>
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="fb-kind" className="text-gray-600">
            {ui('report')}/{ui('general')}:
          </label>
          <select
            id="fb-kind"
            value={kind}
            onChange={(e) => {
              setKind(e.target.value);
              setPage(1);
            }}
            className="input w-auto py-1.5"
          >
            <option value="">{ui('allKinds')}</option>
            <option value="general">{ui('general')}</option>
            <option value="report">{ui('report')}</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorState error={error} onRetry={refetch} />
        ) : items.length === 0 ? (
          <div className="card p-8 text-center text-gray-500">{ui('noFeedback')}</div>
        ) : (
          <ul className="space-y-3">
            {items.map((f) => (
              <li key={f._id} className="card p-4">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className={`chip ${f.kind === 'report' ? 'bg-red-50 text-red-700' : 'bg-india-green/10 text-india-green'}`}>
                    {f.kind === 'report' ? ui('report') : ui('general')}
                  </span>
                  {typeof f.rating === 'number' && (
                    <span aria-label={`${f.rating} / 5`}>
                      <span className="text-india-orange">{'\u2605'.repeat(f.rating)}</span>
                      <span className="text-gray-300">{'\u2605'.repeat(5 - f.rating)}</span>
                    </span>
                  )}
                  <span className="text-gray-600">
                    {f.userId ? (
                      <>
                        <span className="font-medium text-india-text">{f.userId.name}</span> <span className="text-gray-400">({f.userId.email})</span>
                      </>
                    ) : (
                      ui('anonymous')
                    )}
                  </span>
                  {f.placeId && (
                    <Link to={`/item/places/${f.placeId._id}`} className="font-medium text-india-navy hover:underline">
                      {pick(f.placeId, 'name')}
                    </Link>
                  )}
                  <time dateTime={f.createdAt} className="ml-auto text-gray-500">
                    {formatDate(f.createdAt, lang)}
                  </time>
                </div>
                <p className="mt-2 whitespace-pre-line text-sm text-india-text">{f.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {total > LIMIT && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {total} {ui('total')} · {ui('page')} {page}/{pages}
          </span>
          <div className="flex gap-2">
            <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} className="btn-outline py-1.5">
              ← {ui('previous')}
            </button>
            <button type="button" onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page >= pages} className="btn-outline py-1.5">
              {ui('next')} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

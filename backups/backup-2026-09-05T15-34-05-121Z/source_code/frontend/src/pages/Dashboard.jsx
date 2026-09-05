import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import useFetch from '../hooks/useFetch';
import usePageMeta from '../hooks/usePageMeta';
import PlaceCard from '../components/PlaceCard/PlaceCard';
import Spinner from '../components/Spinner/Spinner';
import ErrorState from '../components/ErrorState/ErrorState';
import { formatDate, initialOf } from '../utils/format';

function Stat({ value, label }) {
  return (
    <div className="rounded-xl bg-white/10 px-4 py-3 text-center">
      <p className="text-2xl font-extrabold leading-none">{value}</p>
      <p className="mt-1 text-xs opacity-80">{label}</p>
    </div>
  );
}

function Stars({ rating }) {
  return (
    <span aria-label={`${rating} / 5`} className="text-sm tracking-tight">
      <span className="text-india-orange">{'★'.repeat(rating)}</span>
      <span className="text-gray-300">{'★'.repeat(5 - rating)}</span>
    </span>
  );
}

export default function Dashboard() {
  const { user, isAdmin, isFavorite, toggleFavorite } = useAuth();
  const { ui, pick, lang, isHindi } = useLanguage();
  const [removing, setRemoving] = useState(null);

  const favs = useFetch('/api/user/favorites');
  const history = useFetch('/api/user/feedback');

  usePageMeta(ui('dashboard'));

  // Filter by the live favourites list so removals are reflected instantly without a refetch.
  const favorites = ((favs.data && favs.data.data) || []).filter((p) => isFavorite(p._id));
  const feedback = (history.data && history.data.data) || [];

  const remove = async (placeId) => {
    setRemoving(placeId);
    try {
      await toggleFavorite(placeId);
    } catch (err) {
      // keep the card; the user can retry
    } finally {
      setRemoving(null);
    }
  };

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <section className="bg-india-navy text-white">
        <div className="container-page flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-india-orange text-2xl font-extrabold text-india-text"
              aria-hidden="true"
            >
              {initialOf(user.name)}
            </span>
            <div className="min-w-0">
              <p className="text-sm opacity-80" lang={isHindi ? 'hi' : 'en'}>
                {ui('welcomeBack')}
              </p>
              <h1 className="truncate text-2xl font-extrabold sm:text-3xl">{user.name}</h1>
              <p className="flex flex-wrap items-center gap-2 text-sm opacity-90">
                <span className="truncate">{user.email}</span>
                {isAdmin && <span className="chip bg-india-orange text-india-text">{ui('admin')}</span>}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <Stat value={favs.loading ? '…' : favorites.length} label={ui('savedPlaces')} />
            <Stat value={history.loading ? '…' : feedback.length} label={ui('feedback')} />
            <Stat value={formatDate(user.createdAt, lang) || '—'} label={ui('memberSince')} />
          </div>
        </div>
      </section>

      {/* Favourites */}
      <section className="container-page mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="section-title" lang={isHindi ? 'hi' : 'en'}>
            {ui('myFavorites')}
          </h2>
          <Link to="/" className="text-sm font-semibold text-india-navy hover:underline">
            {ui('exploreMap')} →
          </Link>
        </div>

        <div className="mt-5">
          {favs.loading ? (
            <Spinner />
          ) : favs.error ? (
            <ErrorState error={favs.error} onRetry={favs.refetch} />
          ) : favorites.length === 0 ? (
            <div className="card p-10 text-center">
              <p className="text-4xl" aria-hidden="true">
                🤍
              </p>
              <p className="mx-auto mt-3 max-w-md text-gray-600" lang={isHindi ? 'hi' : 'en'}>
                {ui('noFavorites')}
              </p>
              <Link to="/" className="btn-primary mt-5">
                {ui('exploreMap')}
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((place) => (
                <PlaceCard
                  key={place._id}
                  item={place}
                  collection="places"
                  action={
                    <button
                      type="button"
                      onClick={() => remove(place._id)}
                      disabled={removing === place._id}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <span aria-hidden="true">❤️</span> {removing === place._id ? ui('submitting') : ui('remove')}
                    </button>
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feedback history */}
      <section className="container-page mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="section-title" lang={isHindi ? 'hi' : 'en'}>
            {ui('feedbackHistory')}
          </h2>
          <Link to="/feedback" className="btn-outline">
            {ui('giveFeedback')}
          </Link>
        </div>

        <div className="mt-5">
          {history.loading ? (
            <Spinner />
          ) : history.error ? (
            <ErrorState error={history.error} onRetry={history.refetch} />
          ) : feedback.length === 0 ? (
            <div className="card p-8 text-center text-gray-600" lang={isHindi ? 'hi' : 'en'}>
              {ui('noFeedback')}
            </div>
          ) : (
            <ul className="space-y-3">
              {feedback.map((f) => (
                <li key={f._id} className="card p-4 sm:p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className={`chip ${f.kind === 'report' ? 'bg-red-50 text-red-700' : 'bg-india-green/10 text-india-green'}`}>
                      {f.kind === 'report' ? ui('report') : ui('general')}
                    </span>
                    {typeof f.rating === 'number' && <Stars rating={f.rating} />}
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
      </section>
    </div>
  );
}

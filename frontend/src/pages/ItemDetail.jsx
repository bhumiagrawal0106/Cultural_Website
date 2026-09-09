import { lazy, Suspense, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import usePageMeta from '../hooks/usePageMeta';
import useSpeech from '../hooks/useSpeech';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { COLLECTIONS, COLLECTION_LABEL, typeIcon, typeLabel } from '../utils/catalog';
import ImageCarousel from '../components/ImageCarousel';
import PlaceCard from '../components/PlaceCard/PlaceCard';
import Spinner from '../components/Spinner/Spinner';
import ErrorState from '../components/ErrorState/ErrorState';
import NotFound from './NotFound';

const ModelViewer = lazy(() => import('../components/ModelViewer'));

export default function ItemDetail() {
  const { collection, id } = useParams();
  const { ui, pick, pickTuple, lang, isHindi } = useLanguage();
  const { isAuthenticated, isFavorite, toggleFavorite } = useAuth();
  const speech = useSpeech();
  const [favBusy, setFavBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const validCollection = COLLECTIONS.includes(collection);
  const { data: res, loading, error, refetch } = useFetch(validCollection ? `/api/${collection}/${id}` : null);
  const item = res && res.data;
  const state = item && item.stateId && item.stateId.slug ? item.stateId : null;

  const { data: moreRes } = useFetch(state ? `/api/${collection}?state=${state.slug}&limit=6` : null);
  const more = ((moreRes && moreRes.data) || []).filter((m) => m._id !== id).slice(0, 3);

  usePageMeta(item ? pick(item, 'name') : ui('loading'), item ? pick(item, 'description') : undefined);

  if (!validCollection) return <NotFound />;
  if (loading) return <Spinner className="min-h-[50vh]" />;
  if (error && error.status === 404) return <NotFound />;
  if (error) return <ErrorState error={error} onRetry={refetch} className="mt-10" />;

  const isPlace = collection === 'places';
  const name = pick(item, 'name');
  const description = pick(item, 'description');
  const hasCoords = isPlace && item.coordinates && typeof item.coordinates.lat === 'number';
  const mapEmbed = hasCoords
    ? `https://maps.google.com/maps?q=${item.coordinates.lat},${item.coordinates.lng}&z=14&output=embed`
    : null;
  const mapLink = hasCoords ? `https://www.google.com/maps?q=${item.coordinates.lat},${item.coordinates.lng}` : null;
  const fav = isPlace && isFavorite(item._id);

  const onToggleFav = async () => {
    setFavBusy(true);
    try {
      await toggleFavorite(item._id);
    } finally {
      setFavBusy(false);
    }
  };

  const onShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: name, text: description, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      // user cancelled share
    }
  };

  return (
    <div className="container-page animate-fade-up pt-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-india-navy">
          {ui('home')}
        </Link>
        {state && (
          <>
            <span className="mx-2">/</span>
            <Link to={`/state/${state.slug}`} className="hover:text-india-navy">
              {pick(state, 'name')}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-india-text">{name}</span>
      </nav>

      <div className="mt-4 grid gap-8 lg:grid-cols-5">
        {/* Media */}
        <div className="lg:col-span-3">
          {isPlace && item.model3D ? (
            <Suspense fallback={<Spinner className="card h-72 sm:h-96" />}>
              <ModelViewer url={item.model3D} fallback={<ImageCarousel images={item.images} alt={name} />} />
            </Suspense>
          ) : (
            <ImageCarousel images={item.images} alt={name} />
          )}
        </div>

        {/* Info */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip bg-india-orange/20 text-india-text">
              {isPlace ? (
                <>
                  <span className="mr-1" aria-hidden="true">
                    {typeIcon(item.type)}
                  </span>
                  {pickTuple(typeLabel(item.type))}
                </>
              ) : (
                pickTuple(COLLECTION_LABEL[collection])
              )}
            </span>
            {isPlace && typeof item.viewCount === 'number' && (
              <span className="text-xs text-gray-500">
                {item.viewCount.toLocaleString()} {ui('views')}
              </span>
            )}
          </div>

          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-india-navy sm:text-4xl" lang={isHindi ? 'hi' : 'en'}>
            {name}
          </h1>
          {state && (
            <Link to={`/state/${state.slug}`} className="mt-1 inline-block text-sm font-semibold text-india-green hover:underline">
              {pick(state, 'name')}
            </Link>
          )}

          <p className="mt-5 text-lg leading-relaxed text-gray-700" lang={isHindi ? 'hi' : 'en'}>
            {description}
          </p>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-2">
            {speech.supported && (
              <button
                type="button"
                onClick={() => (speech.speaking ? speech.stop() : speech.speak(`${name}. ${description}`, lang))}
                className="btn-outline"
                aria-pressed={speech.speaking}
              >
                <span aria-hidden="true">{speech.speaking ? '⏹' : '🔊'}</span> {speech.speaking ? ui('stop') : ui('listen')}
              </button>
            )}
            {isPlace &&
              (isAuthenticated ? (
                <button type="button" onClick={onToggleFav} disabled={favBusy} className={fav ? 'btn-secondary' : 'btn-primary'}>
                  <span aria-hidden="true">{fav ? '❤️' : '🤍'}</span> {fav ? ui('removeFav') : ui('saveFav')}
                </button>
              ) : (
                <Link to="/login" state={{ from: `/item/${collection}/${id}` }} className="btn-primary">
                  <span aria-hidden="true">🤍</span> {ui('loginToSave')}
                </Link>
              ))}
            <button type="button" onClick={onShare} className="btn-ghost">
              <span aria-hidden="true">↗</span> {copied ? ui('linkCopied') : ui('share')}
            </button>
          </div>

          {/* Meta */}
          {isPlace && (item.bestTimeToVisit || (item.tags && item.tags.length > 0)) && (
            <div className="card mt-6 space-y-4 p-5">
              {item.bestTimeToVisit && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{ui('bestTime')}</p>
                  <p className="mt-1 flex items-center gap-2 text-sm font-medium text-india-text">
                    <span aria-hidden="true">🗓️</span> {item.bestTimeToVisit}
                  </p>
                </div>
              )}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <span key={t} className="chip bg-india-green/10 text-india-green">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {isPlace && (
            <Link
              to={`/feedback?kind=report&placeId=${item._id}`}
              className="mt-4 inline-block text-xs text-gray-500 underline-offset-2 hover:text-india-navy hover:underline"
            >
              {ui('reportInfo')}
            </Link>
          )}
        </div>
      </div>

      {/* Map */}
      {mapEmbed && (
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="section-title">{ui('location')}</h2>
            <a href={mapLink} target="_blank" rel="noreferrer" className="text-sm font-semibold text-india-navy hover:underline">
              {ui('openInMaps')} ↗
            </a>
          </div>
          <div className="card mt-4 aspect-[16/7] min-h-[260px]">
            <iframe
              title={`${name} map`}
              src={mapEmbed}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {/* More from state */}
      {state && more.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="section-title">
              {ui('moreFrom')} {pick(state, 'name')}
            </h2>
            <Link to={`/state/${state.slug}?tab=${isPlace ? item.type : collection}`} className="text-sm font-semibold text-india-navy hover:underline">
              {ui('viewAll')} →
            </Link>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((m) => (
              <PlaceCard key={m._id} item={m} collection={collection} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

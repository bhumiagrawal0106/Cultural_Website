import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import useFetch from '../hooks/useFetch';
import usePageMeta from '../hooks/usePageMeta';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import FormField, { FormError } from '../components/FormField';
import StarRating from '../components/StarRating';
import { isMongoId, MESSAGE_MAX, MESSAGE_MIN } from '../utils/validation';

export default function Feedback() {
  const [params] = useSearchParams();
  const location = useLocation();
  const placeId = isMongoId(params.get('placeId')) ? params.get('placeId') : null;
  const isReport = params.get('kind') === 'report' && Boolean(placeId);

  const { ui, pick, isHindi } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  const { data: placeRes } = useFetch(isReport ? `/api/places/${placeId}` : null);
  const place = placeRes && placeRes.data;

  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const title = isReport ? ui('reportTitle') : ui('feedbackTitle');
  const subtitle = isReport ? ui('reportSub') : ui('feedbackSub');
  usePageMeta(title, subtitle);

  const reset = () => {
    setRating(0);
    setMessage('');
    setErrors({});
    setServerError('');
    setDone(false);
  };

  // Start fresh when switching between general and report mode (state setters are stable)
  useEffect(() => {
    setRating(0);
    setMessage('');
    setErrors({});
    setServerError('');
    setDone(false);
  }, [isReport, placeId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    const next = {};
    if (trimmed.length < MESSAGE_MIN) next.message = ui('messageTooShort');
    if (!isReport && !rating) next.rating = ui('ratingRequired');
    setErrors(next);
    if (Object.keys(next).length) return;

    setBusy(true);
    setServerError('');
    try {
      await api.post('/api/feedback', {
        message: trimmed,
        kind: isReport ? 'report' : 'general',
        ...(isReport ? { placeId } : { rating }),
      });
      setDone(true);
    } catch (err) {
      setServerError(err.message || ui('errorGeneric'));
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="container-page animate-fade-up flex min-h-[60vh] items-center justify-center py-10">
        <div className="card w-full max-w-lg p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-india-green/10 text-3xl" aria-hidden="true">
            🙏
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-india-navy" lang={isHindi ? 'hi' : 'en'}>
            {ui('thankYou')}
          </h1>
          <p className="mt-2 text-gray-600" lang={isHindi ? 'hi' : 'en'}>
            {ui('feedbackReceived')}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={reset} className="btn-outline">
              {ui('sendAnother')}
            </button>
            {isReport ? (
              <Link to={`/item/places/${placeId}`} className="btn-primary">
                {ui('viewPlace')}
              </Link>
            ) : (
              <Link to="/" className="btn-primary">
                {ui('backHome')}
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page animate-fade-up py-10">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <span className="chip bg-india-orange/15 text-india-text">{isReport ? ui('report') : ui('feedback')}</span>
          <h1 className="mt-3 text-3xl font-extrabold text-india-navy sm:text-4xl" lang={isHindi ? 'hi' : 'en'}>
            {title}
          </h1>
          <p className="mt-2 text-gray-600" lang={isHindi ? 'hi' : 'en'}>
            {subtitle}
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="card mt-8 space-y-6 p-6 sm:p-8">
          <FormError message={serverError} />

          {isReport && (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-india-orange/40 bg-india-orange/10 px-4 py-3 text-sm">
              <p>
                <span className="text-gray-600">{ui('reportingAbout')}: </span>
                {place ? (
                  <Link to={`/item/places/${placeId}`} className="font-semibold text-india-navy hover:underline">
                    {pick(place, 'name')}
                  </Link>
                ) : (
                  <span className="inline-block h-4 w-32 animate-pulse rounded bg-india-orange/30 align-middle" />
                )}
              </p>
              <Link to="/feedback" className="text-xs font-medium text-india-navy underline-offset-2 hover:underline">
                {ui('switchToGeneral')}
              </Link>
            </div>
          )}

          {!isReport && (
            <div>
              <p id="rating-label" className="text-sm font-semibold text-india-text">
                {ui('yourRating')}
              </p>
              <div className="mt-2">
                <StarRating value={rating} onChange={(n) => { setRating(n); setErrors((er) => ({ ...er, rating: undefined })); }} disabled={busy} labelledBy="rating-label" />
              </div>
              {errors.rating && (
                <p className="mt-1 text-xs text-red-600" role="alert">
                  {errors.rating}
                </p>
              )}
            </div>
          )}

          <FormField id="feedback-message" label={ui('yourMessage')} error={errors.message}>
            <textarea
              id="feedback-message"
              rows={6}
              maxLength={MESSAGE_MAX}
              value={message}
              disabled={busy}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) setErrors((er) => ({ ...er, message: undefined }));
              }}
              placeholder={ui('messagePlaceholder')}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'feedback-message-error' : undefined}
              className={`input mt-1 resize-y ${errors.message ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''}`}
            />
            <p className="mt-1 text-right text-xs text-gray-400">
              {message.length}/{MESSAGE_MAX} {ui('characters')}
            </p>
          </FormField>

          <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-500" lang={isHindi ? 'hi' : 'en'}>
              {isAuthenticated ? (
                <>
                  {ui('submittingAs')} <span className="font-semibold text-india-text">{user.name}</span>
                </>
              ) : (
                <>
                  {ui('anonymousNote')}{' '}
                  <Link to="/login" state={{ from: `${location.pathname}${location.search}` }} className="font-semibold text-india-navy hover:underline">
                    {ui('loginToTrack')}
                  </Link>
                </>
              )}
            </p>
            <button type="submit" disabled={busy} className="btn-primary px-6 py-2.5">
              {busy ? ui('submitting') : ui('submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

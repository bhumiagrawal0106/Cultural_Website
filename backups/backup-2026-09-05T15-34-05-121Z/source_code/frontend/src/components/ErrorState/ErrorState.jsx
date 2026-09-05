import { useLanguage } from '../../context/LanguageContext';

export default function ErrorState({ error, onRetry, className = '' }) {
  const { ui } = useLanguage();
  const message = (error && error.message) || ui('errorGeneric');
  return (
    <div className={`card mx-auto max-w-md p-8 text-center ${className}`} role="alert">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-2xl">!</div>
      <p className="font-semibold text-india-text">{ui('errorGeneric')}</p>
      {message && message !== ui('errorGeneric') && <p className="mt-1 text-sm text-gray-500">{message}</p>}
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-primary mt-5">
          {ui('retry')}
        </button>
      )}
    </div>
  );
}

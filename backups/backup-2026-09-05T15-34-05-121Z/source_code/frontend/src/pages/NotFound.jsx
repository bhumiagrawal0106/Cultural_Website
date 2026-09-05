import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import { useLanguage } from '../context/LanguageContext';
import SearchBar from '../components/SearchBar/SearchBar';

export default function NotFound() {
  const { ui, isHindi } = useLanguage();
  usePageMeta(ui('notFoundTitle'), ui('notFoundText'));

  return (
    <div className="container-page animate-fade-up flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <div className="relative">
        <p className="text-8xl font-extrabold tracking-tight text-india-orange sm:text-9xl" aria-hidden="true">
          404
        </p>
        <span className="absolute -right-6 -top-2 text-4xl sm:-right-8" aria-hidden="true">
          🧭
        </span>
      </div>

      <h1 className="mt-2 text-2xl font-extrabold text-india-navy sm:text-3xl" lang={isHindi ? 'hi' : 'en'}>
        {ui('notFoundTitle')}
      </h1>
      <p className="mt-2 max-w-md text-gray-600" lang={isHindi ? 'hi' : 'en'}>
        {ui('notFoundText')}
      </p>

      <div className="mt-8 w-full max-w-md">
        <SearchBar />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          {ui('backHome')}
        </Link>
        <Link to="/about" className="btn-outline">
          {ui('about')}
        </Link>
      </div>
    </div>
  );
}

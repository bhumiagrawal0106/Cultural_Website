import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { ui } = useLanguage();
  const { data } = useFetch('/api/config');
  const phone = data && data.supportPhone;

  return (
    <footer className="mt-16 border-t border-gray-100 bg-white">
      <div className="container-page grid gap-8 py-10 md:grid-cols-3">
        <div>
          <p className="text-xl font-extrabold text-india-navy">{ui('brand')}</p>
          <p className="mt-2 max-w-xs text-sm text-gray-600">{ui('tagline')}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">{ui('quickLinks')}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/about" className="text-india-navy hover:underline">
                {ui('about')}
              </Link>
            </li>
            <li>
              <Link to="/feedback" className="text-india-navy hover:underline">
                {ui('feedback')}
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-india-navy hover:underline">
                {ui('login')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">{ui('customerCare')}</p>
          {phone ? (
            <a
              href={`tel:${phone}`}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-india-green px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              <span aria-hidden="true">📞</span> {phone}
            </a>
          ) : (
            <span className="mt-3 inline-block h-9 w-40 animate-pulse rounded-lg bg-gray-100" />
          )}
        </div>
      </div>
      <div className="border-t border-gray-100">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-4 text-xs text-gray-500 sm:flex-row">
          <span>{ui('madeFor')}</span>
          <span>© {new Date().getFullYear()} Bharat Darshan</span>
        </div>
      </div>
    </footer>
  );
}

import { Link, useSearchParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import usePageMeta from '../hooks/usePageMeta';
import { useLanguage } from '../context/LanguageContext';
import { RESULT_TYPE_LABEL } from '../utils/catalog';
import SafeImage from '../components/SafeImage';
import SearchBar from '../components/SearchBar/SearchBar';
import Spinner from '../components/Spinner/Spinner';
import ErrorState from '../components/ErrorState/ErrorState';

const ORDER = ['state', 'place', 'craft', 'tradition', 'food'];

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = (params.get('q') || '').trim();
  const { ui, pick, pickTuple } = useLanguage();
  const { data, loading, error, refetch } = useFetch(q ? `/api/search?q=${encodeURIComponent(q)}` : null);
  const results = (data && data.data) || [];

  usePageMeta(`${ui('search')}: ${q}`);

  const grouped = ORDER.map((type) => ({ type, items: results.filter((r) => r.resultType === type) })).filter(
    (g) => g.items.length
  );

  return (
    <div className="container-page animate-fade-up pt-8">
      <div className="mx-auto max-w-2xl">
        <SearchBar size="lg" autoFocus={!q} />
      </div>

      {!q ? (
        <p className="mt-10 text-center text-gray-500">{ui('typeToSearch')}</p>
      ) : loading ? (
        <Spinner />
      ) : error ? (
        <ErrorState error={error} onRetry={refetch} className="mt-10" />
      ) : (
        <>
          <h1 className="mt-8 text-2xl font-bold text-india-navy">
            {ui('resultsFor')} “{q}” <span className="text-base font-normal text-gray-500">({results.length} {ui('results')})</span>
          </h1>

          {results.length === 0 && <p className="mt-6 text-gray-500">{ui('noResults')}</p>}

          {grouped.map((group) => (
            <section key={group.type} className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                {pickTuple(RESULT_TYPE_LABEL[group.type])}
              </h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {group.items.map((r) => (
                  <li key={`${r.resultType}-${r._id}`}>
                    <Link to={r.linkTo} className="card flex gap-4 p-3 transition hover:-translate-y-0.5 hover:shadow-lg">
                      <SafeImage
                        src={r.image}
                        alt=""
                        fallbackText={pick(r, 'name')}
                        className="h-20 w-24 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-bold text-india-text">{pick(r, 'name')}</p>
                        {r.state && <p className="text-xs font-medium text-india-green">{pick(r.state, 'name')}</p>}
                        <p className="mt-1 line-clamp-2 text-sm text-gray-600">{pick(r, 'description')}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </>
      )}
    </div>
  );
}

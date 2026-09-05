import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

/** Accessible fallback when WebGL fails: a simple grid of state links. */
export default function StaticStateList({ states = [] }) {
  const { pick, ui } = useLanguage();
  if (!states.length) return <p className="text-sm text-gray-500">{ui('nothingHere')}</p>;
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {states.map((s) => (
        <li key={s.slug}>
          <Link
            to={`/state/${s.slug}`}
            className="block rounded-xl border border-gray-100 bg-white px-4 py-3 text-center font-semibold text-india-navy shadow-sm hover:bg-india-orange/10"
          >
            {pick(s, 'name')}
          </Link>
        </li>
      ))}
    </ul>
  );
}

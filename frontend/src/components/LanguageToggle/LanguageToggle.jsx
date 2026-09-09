import { useLanguage } from '../../context/LanguageContext';

export default function LanguageToggle({ className = '' }) {
  const { lang, setLang } = useLanguage();
  const base = 'px-3 py-1 text-xs font-semibold rounded-full transition';
  return (
    <div
      className={`inline-flex items-center rounded-full border border-gray-200 bg-white p-0.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`${base} ${lang === 'en' ? 'bg-india-navy text-white' : 'text-india-navy hover:bg-gray-100'}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang('hi')}
        aria-pressed={lang === 'hi'}
        lang="hi"
        className={`${base} ${lang === 'hi' ? 'bg-india-navy text-white' : 'text-india-navy hover:bg-gray-100'}`}
      >
        हिं
      </button>
    </div>
  );
}

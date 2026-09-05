import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import usePageMeta from '../hooks/usePageMeta';
import { useLanguage } from '../context/LanguageContext';
import { TABS } from '../utils/catalog';

const TECH = [
  { name: 'React 18 + Vite', role: ['Frontend', 'फ्रंटएंड'], icon: '⚛️' },
  { name: 'Tailwind CSS', role: ['Styling', 'स्टाइलिंग'], icon: '🎨' },
  { name: 'three.js + react-three-fiber', role: ['3D map', '3D मानचित्र'], icon: '🧱' },
  { name: 'Node.js + Express', role: ['REST API', 'REST API'], icon: '🛠️' },
  { name: 'MongoDB + Mongoose', role: ['Database', 'डेटाबेस'], icon: '🍃' },
  { name: 'JWT + bcrypt', role: ['Authentication', 'प्रमाणीकरण'], icon: '🔐' },
  { name: 'Web Speech API', role: ['Audio narration', 'ऑडियो वाचन'], icon: '🔊' },
  { name: 'GitLab CI', role: ['Lint, test, build', 'लिंट, टेस्ट, बिल्ड'], icon: '🦊' },
];

const STEPS = ['step1', 'step2', 'step3'];

export default function About() {
  const { ui, pick, pickTuple, isHindi } = useLanguage();
  const { data: config } = useFetch('/api/config');
  const { data: statesRes } = useFetch('/api/states');
  const phone = config && config.supportPhone;
  const states = (statesRes && statesRes.data) || [];
  const lang = isHindi ? 'hi' : 'en';

  usePageMeta(ui('about'), ui('aboutText1'));

  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <section className="container-page pt-10 text-center sm:pt-14">
        <span className="chip bg-india-orange/15 text-india-text">
          SIH 2026 · {ui('problemStatement')} 26197 · AICTE
        </span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-india-navy sm:text-5xl" lang={lang}>
          {ui('aboutTitle')}
        </h1>
        <div className="mx-auto mt-6 max-w-3xl space-y-4 text-left text-base leading-relaxed text-gray-700 sm:text-lg" lang={lang}>
          <p>{ui('aboutText1')}</p>
          <p>{ui('aboutText2')}</p>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page mt-14">
        <h2 className="section-title text-center" lang={lang}>
          {ui('whatYouFind')}
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {TABS.map((t) => (
            <li key={t.key} className="card flex flex-col items-center gap-2 p-4 text-center">
              <span className="text-3xl" aria-hidden="true">
                {t.icon}
              </span>
              <span className="text-sm font-semibold text-india-text" lang={lang}>
                {pickTuple(t.label)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="container-page mt-16">
        <h2 className="section-title text-center" lang={lang}>
          {ui('howItWorks')}
        </h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {STEPS.map((key, i) => (
            <li key={key} className="card relative p-6 pt-8">
              <span
                className={`absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold shadow ${
                  i === 0 ? 'bg-india-orange text-india-text' : i === 1 ? 'bg-white text-india-navy ring-2 ring-india-navy/20' : 'bg-india-green text-white'
                }`}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <p className="text-base font-semibold text-india-text" lang={lang}>
                {ui(key)}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* States */}
      {states.length > 0 && (
        <section className="container-page mt-16">
          <h2 className="section-title text-center" lang={lang}>
            {ui('statesCovered')}
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {states.map((s) => (
              <Link
                key={s.slug}
                to={`/state/${s.slug}`}
                className="chip border border-india-navy/20 bg-white px-4 py-2 text-sm text-india-navy transition hover:border-india-orange hover:bg-india-orange/10"
                lang={lang}
              >
                {pick(s, 'name')}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="container-page mt-16">
        <div className="card grid gap-6 overflow-hidden md:grid-cols-2">
          <div className="bg-india-navy p-8 text-white">
            <h2 className="text-2xl font-bold" lang={lang}>
              {ui('contactTitle')}
            </h2>
            <p className="mt-2 text-sm opacity-90" lang={lang}>
              {ui('contactText')}
            </p>
            {phone ? (
              <a
                href={`tel:${phone}`}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-india-green px-5 py-3 text-base font-bold text-white shadow hover:bg-green-700"
              >
                <span aria-hidden="true">📞</span> {ui('call')} {phone}
              </a>
            ) : (
              <span className="mt-6 inline-block h-12 w-48 animate-pulse rounded-lg bg-white/20" />
            )}
            <p className="mt-4 text-xs opacity-80" lang={lang}>
              {ui('askAssistant')}
            </p>
          </div>
          <div className="flex flex-col justify-center p-8">
            <h3 className="text-xl font-bold text-india-navy" lang={lang}>
              {ui('feedbackTitle')}
            </h3>
            <p className="mt-2 text-sm text-gray-600" lang={lang}>
              {ui('feedbackSub')}
            </p>
            <Link to="/feedback" className="btn-primary mt-5 self-start">
              {ui('giveFeedback')}
            </Link>
          </div>
        </div>
      </section>

      {/* Tech */}
      <section className="container-page mt-16">
        <h2 className="section-title text-center" lang={lang}>
          {ui('techTitle')}
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TECH.map((t) => (
            <li key={t.name} className="card flex items-center gap-3 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-india-bg text-xl" aria-hidden="true">
                {t.icon}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-india-text">{t.name}</p>
                <p className="text-xs text-gray-500" lang={lang}>
                  {pickTuple(t.role)}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-gray-500" lang={lang}>
          {ui('madeFor')}
        </p>
      </section>
    </div>
  );
}

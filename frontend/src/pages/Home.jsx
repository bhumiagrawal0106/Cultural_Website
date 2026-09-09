import { lazy, Suspense, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import useFetch from '../hooks/useFetch';
import usePageMeta from '../hooks/usePageMeta';
import useRevealAnimation from '../hooks/useRevealAnimation';
import { useLanguage } from '../context/LanguageContext';
import SearchBar from '../components/SearchBar/SearchBar';
import Spinner from '../components/Spinner/Spinner';
import SafeImage from '../components/SafeImage';

const Map3D = lazy(() => import('../components/Map3D/Map3D'));

const FEATURE_CARDS = [
  {
    titleKey: 'feature1Title',
    textKey: 'feature1Text',
    icon: '🇮🇳',
    bg: 'bg-india-orange/15',
    border: 'border-india-orange/30',
    glow: 'hover:shadow-glow',
  },
  {
    titleKey: 'feature2Title',
    textKey: 'feature2Text',
    icon: '🗣️',
    bg: 'bg-india-green/15',
    border: 'border-india-green/30',
    glow: 'hover:shadow-glow-green',
  },
  {
    titleKey: 'feature3Title',
    textKey: 'feature3Text',
    icon: '💬',
    bg: 'bg-india-navy/10',
    border: 'border-india-navy/20',
    glow: 'hover:shadow-glow-navy',
  },
];

export default function Home() {
  const { ui, pick, isHindi } = useLanguage();
  const navigate = useNavigate();
  const [surprising, setSurprising] = useState(false);
  const [diceSpun, setDiceSpun] = useState(false);
  const { data: statesRes } = useFetch('/api/states');
  const states = (statesRes && statesRes.data) || [];

  const featuresRef = useRevealAnimation();
  const statesRef = useRevealAnimation();

  usePageMeta(ui('home'), ui('heroSub'));

  const surprise = async () => {
    setSurprising(true);
    setDiceSpun(true);
    try {
      const res = await api.get('/api/random');
      navigate(`/item/places/${res.data._id}`);
    } catch (err) {
      setSurprising(false);
      setDiceSpun(false);
    }
  };

  return (
    <div className="animate-fade-up">
      {/* ── Hero ── */}
      <section className="container-page pt-10 text-center sm:pt-16 relative overflow-hidden">
        {/* Floating background blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-india-orange/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-10 h-56 w-56 rounded-full bg-india-navy/10 blur-3xl"
        />

        <span className="chip bg-india-orange/15 text-india-saffron font-semibold border border-india-orange/20">
          SIH 2026 · 26197 · Heritage &amp; Culture
        </span>

        <h1
          className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
          lang={isHindi ? 'hi' : 'en'}
        >
          <span className="gradient-text">{ui('heroTitle')}</span>
        </h1>

        <p
          className="mx-auto mt-5 max-w-2xl text-base text-gray-600 sm:text-lg leading-relaxed"
          lang={isHindi ? 'hi' : 'en'}
        >
          {ui('heroSub')}
        </p>

        <div className="mx-auto mt-8 flex max-w-2xl flex-col items-stretch gap-3 sm:flex-row">
          <div className="flex-1">
            <SearchBar size="lg" />
          </div>
          <button
            type="button"
            onClick={surprise}
            disabled={surprising}
            className="btn-secondary py-3.5 gap-2"
          >
            <span
              aria-hidden="true"
              className={`text-lg ${diceSpun && surprising ? 'animate-spin-once' : ''}`}
            >
              🎲
            </span>
            {ui('surpriseMe')}
          </button>
        </div>
      </section>

      {/* ── 3D Map ── */}
      <section className="container-page mt-10">
        <Suspense fallback={<Spinner className="card h-[60vh] md:h-[560px]" />}>
          <Map3D />
        </Suspense>
      </section>

      {/* ── Featured States ── */}
      {states.length > 0 && (
        <section ref={statesRef} className="container-page mt-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="section-title reveal">{ui('featuredStates')}</h2>
          </div>
          <div className="mt-2 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {states.map((s, i) => (
              <Link
                key={s.slug}
                to={`/state/${s.slug}`}
                className={`glass-card group relative aspect-[16/10] overflow-hidden reveal reveal-delay-${Math.min(i + 1, 3)}`}
              >
                <SafeImage
                  src={s.thumbnail}
                  alt={pick(s, 'name')}
                  fallbackText={pick(s, 'name')}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  style={{ transform: 'scale(1)' }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/85" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xl font-bold drop-shadow-sm">{pick(s, 'name')}</p>
                  <p className="mt-1 line-clamp-1 text-xs opacity-80 group-hover:opacity-100 transition-opacity">{pick(s, 'description')}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-india-orange opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    Explore →
                  </span>
                </div>

                {/* Corner glow on hover */}
                <div className="absolute inset-0 rounded-2xl ring-0 ring-india-orange/0 group-hover:ring-2 group-hover:ring-india-orange/40 transition-all duration-300" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Why Bharat Darshan ── */}
      <section ref={featuresRef} className="container-page mt-20 mb-16">
        <h2 className="section-title text-center reveal">{ui('whyTitle')}</h2>
        <p className="text-center text-gray-500 mt-2 text-sm reveal reveal-delay-1">
          Discover India's heritage in simple language, in 3D.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {FEATURE_CARDS.map(({ titleKey, textKey, icon, bg, border, glow }, i) => (
            <div
              key={titleKey}
              className={`card p-6 border ${border} transition-all duration-300 ${glow} reveal reveal-delay-${i + 1}`}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${bg} mb-4 transition-transform duration-300 hover:scale-110`}
                aria-hidden="true"
              >
                {icon}
              </div>
              <h3 className="text-lg font-bold text-india-text">{ui(titleKey)}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{ui(textKey)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

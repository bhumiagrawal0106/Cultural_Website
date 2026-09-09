import { lazy, Suspense, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import useFetch from '../hooks/useFetch';
import usePageMeta from '../hooks/usePageMeta';
import { useLanguage } from '../context/LanguageContext';
import SearchBar from '../components/SearchBar/SearchBar';
import Spinner from '../components/Spinner/Spinner';
import SafeImage from '../components/SafeImage';

const Map3D = lazy(() => import('../components/Map3D/Map3D'));

export default function Home() {
  const { ui, pick, isHindi } = useLanguage();
  const navigate = useNavigate();
  const [surprising, setSurprising] = useState(false);
  const { data: statesRes } = useFetch('/api/states');
  const states = (statesRes && statesRes.data) || [];

  usePageMeta(ui('home'), ui('heroSub'));

  const surprise = async () => {
    setSurprising(true);
    try {
      const res = await api.get('/api/random');
      navigate(`/item/places/${res.data._id}`);
    } catch (err) {
      setSurprising(false);
    }
  };

  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <section className="container-page pt-10 text-center sm:pt-14">
        <span className="chip bg-india-orange/15 text-india-text">SIH 2026 · 26197 · Heritage & Culture</span>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-india-navy sm:text-5xl" lang={isHindi ? 'hi' : 'en'}>
          {ui('heroTitle')}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg" lang={isHindi ? 'hi' : 'en'}>
          {ui('heroSub')}
        </p>

        <div className="mx-auto mt-8 flex max-w-2xl flex-col items-stretch gap-3 sm:flex-row">
          <div className="flex-1">
            <SearchBar size="lg" />
          </div>
          <button type="button" onClick={surprise} disabled={surprising} className="btn-secondary py-3.5">
            <span aria-hidden="true">🎲</span> {ui('surpriseMe')}
          </button>
        </div>
      </section>

      {/* 3D Map */}
      <section className="container-page mt-10">
        <Suspense fallback={<Spinner className="card h-[60vh] md:h-[540px]" />}>
          <Map3D />
        </Suspense>
      </section>

      {/* Featured states */}
      {states.length > 0 && (
        <section className="container-page mt-14">
          <div className="flex items-end justify-between">
            <h2 className="section-title">{ui('featuredStates')}</h2>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {states.map((s) => (
              <Link key={s.slug} to={`/state/${s.slug}`} className="card group relative aspect-[16/10] overflow-hidden">
                <SafeImage
                  src={s.thumbnail}
                  alt={pick(s, 'name')}
                  fallbackText={pick(s, 'name')}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="text-xl font-bold">{pick(s, 'name')}</p>
                  <p className="line-clamp-1 text-xs opacity-90">{pick(s, 'description')}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Feature highlights */}
      <section className="container-page mt-16">
        <h2 className="section-title text-center">{ui('whyTitle')}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ['feature1Title', 'feature1Text', '🇮🇳', 'bg-india-orange/15'],
            ['feature2Title', 'feature2Text', '🗣️', 'bg-india-green/15'],
            ['feature3Title', 'feature3Text', '💬', 'bg-india-navy/10'],
          ].map(([title, text, icon, bg]) => (
            <div key={title} className="card p-6">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${bg}`} aria-hidden="true">
                {icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-india-text">{ui(title)}</h3>
              <p className="mt-1 text-sm text-gray-600">{ui(text)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

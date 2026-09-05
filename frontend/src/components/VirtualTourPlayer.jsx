import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function VirtualTourPlayer({ item = {}, name = '', stateName = '', collection = 'places' }) {
  const { isHindi } = useLanguage();
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [pipDismissed, setPipDismissed] = useState(false);
  const playerRef = useRef(null);

  // Exact targeted YouTube queries strictly based on monument name
  const cleanName = (name || '').trim();
  const cleanState = (stateName || '').trim();
  const baseQuery = `${cleanName} ${cleanState}`.trim();

  const mainYtUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${baseQuery} virtual tour documentary 4k`
  )}`;
  const historyYtUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${cleanName} history architecture documentary`
  )}`;
  const walkingYtUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${cleanName} walking tour 4k`
  )}`;
  const droneYtUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${cleanName} drone view 4k aerial`
  )}`;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setIframeError(false);

    const params = new URLSearchParams({
      name: cleanName,
      stateName: cleanState,
      collection: collection || 'places',
      id: item._id || '',
    });

    fetch(`/api/video?${params.toString()}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled) {
          setVideoData(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setVideoData({ success: false, isStrictMatch: false, redirectUrl: mainYtUrl });
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [cleanName, cleanState, collection, item._id, mainYtUrl]);

  const isStrictMatch = Boolean(videoData && videoData.success && videoData.isStrictMatch && !iframeError);

  // Cinematic Picture-in-Picture scroll observer
  useEffect(() => {
    if (!isStrictMatch || !playerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setIsFloating(true);
        } else {
          setIsFloating(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(playerRef.current);
    return () => observer.disconnect();
  }, [isStrictMatch]);

  return (
    <section ref={playerRef} className="mt-10 rounded-2xl border border-gray-200 bg-white p-5 sm:p-7 shadow-sm transition-all">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-india-navy flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">🎬</span>
              <span>{isHindi ? 'स्मारक दर्शन व वृत्तचित्र' : 'Virtual Tour & Documentary'}</span>
            </h2>
            {isStrictMatch ? (
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                {isHindi ? '✓ सत्यापित स्मारक वीडियो' : '✓ Verified Monument Video'}
              </span>
            ) : (
              <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[11px] font-bold text-amber-700">
                {isHindi ? 'यूट्यूब पर उपलब्ध' : 'Strict Search on YouTube'}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {isStrictMatch
              ? (videoData.title || cleanName)
              : (isHindi
                  ? `${cleanName} का 4K वृत्तचित्र सीधे यूट्यूब पर देखें`
                  : `4K virtual tour & documentary strictly curated for ${cleanName}`)}
          </p>
        </div>

        {/* Watch on YouTube button */}
        <a
          href={videoData?.watchUrl || mainYtUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-red-700 transition"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span>{isHindi ? 'यूट्यूब पर देखें' : 'Watch on YouTube'}</span>
          <span className="text-[10px]">↗</span>
        </a>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="mt-4 flex aspect-video w-full max-w-4xl mx-auto flex-col items-center justify-center rounded-2xl bg-gray-900 text-white p-6 shadow-inner">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-india-orange border-t-transparent mb-3" />
          <p className="text-xs text-gray-300 animate-pulse">
            {isHindi ? 'स्मारक का सटीक वीडियो लोड हो रहा है...' : `Verifying authentic video strictly for ${cleanName}...`}
          </p>
        </div>
      ) : isStrictMatch ? (
        /* CASE 1: Video is STRICTLY VERIFIED to be about this monument */
        <div>
          <div className="card mt-4 overflow-hidden border border-gray-200 bg-black aspect-video w-full max-w-4xl mx-auto rounded-2xl shadow-xl relative">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${videoData.videoId}?rel=0&modestbranding=1&enablejsapi=1`}
              title={`${cleanName} Video Tour`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onError={() => setIframeError(true)}
            />
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>{videoData.author || 'Verified Cultural Archive'} • 100% Strict Monument Match</span>
            </span>
            <div className="flex gap-2">
              <a href={historyYtUrl} target="_blank" rel="noreferrer" className="text-india-navy hover:underline">
                🏛️ {isHindi ? 'इतिहास' : 'History'} ↗
              </a>
              <span>•</span>
              <a href={walkingYtUrl} target="_blank" rel="noreferrer" className="text-india-navy hover:underline">
                🚶 {isHindi ? 'पैदल यात्रा' : 'Walking Tour'} ↗
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* CASE 2: No strictly verified video match -> REDIRECT TO YOUTUBE */
        <div className="mt-4 overflow-hidden rounded-2xl border border-red-100 bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 sm:p-10 text-white shadow-xl relative">
          {/* Subtle decorative glow */}
          <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
            {/* Big YouTube Play Icon */}
            <div className="h-16 w-16 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/40 transform transition hover:scale-105 mb-4">
              <svg className="h-8 w-8 fill-white ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gray-300 mb-3 border border-white/15">
              <span>🔴</span>
              <span>{isHindi ? 'सटीक नाम आधारित यूट्यूब रीडायरेक्ट' : 'Strict Monument Search on YouTube'}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {cleanName}
            </h3>

            <p className="mt-2 text-sm text-gray-300 max-w-lg leading-relaxed">
              {isHindi
                ? `किसी भी गलत या अन्य विषय के वीडियो से बचने के लिए, ${cleanName} के 4K वृत्तचित्र और वर्चुअल टूर सीधे यूट्यूब पर देखें।`
                : `To ensure 100% topic accuracy, watch official 4K virtual tours, walkthroughs, and documentaries strictly based on ${cleanName} on YouTube.`}
            </p>

            {/* Primary Action Button */}
            <a
              href={mainYtUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-red-600/30 hover:bg-red-700 hover:scale-[1.02] active:scale-[0.99] transition duration-200"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>{isHindi ? `${cleanName} को यूट्यूब पर देखें` : `Watch ${cleanName} on YouTube`}</span>
              <span className="text-base font-normal">↗</span>
            </a>

            {/* Quick Specialized Explorations */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full text-left">
              <a
                href={historyYtUrl}
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-white/10 bg-white/5 p-3.5 hover:bg-white/10 hover:border-white/20 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base">🏛️</span>
                  <span className="text-xs text-gray-400 group-hover:text-white transition">↗</span>
                </div>
                <h4 className="mt-2 text-xs font-bold text-white group-hover:text-amber-400 transition">
                  {isHindi ? 'इतिहास व वास्तुकला' : 'History & Architecture'}
                </h4>
                <p className="mt-0.5 text-[11px] text-gray-400 line-clamp-1">
                  {isHindi ? 'गहन वृत्तचित्र' : 'In-depth documentaries'}
                </p>
              </a>

              <a
                href={walkingYtUrl}
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-white/10 bg-white/5 p-3.5 hover:bg-white/10 hover:border-white/20 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base">🚶</span>
                  <span className="text-xs text-gray-400 group-hover:text-white transition">↗</span>
                </div>
                <h4 className="mt-2 text-xs font-bold text-white group-hover:text-amber-400 transition">
                  {isHindi ? '4K पैदल यात्रा' : '4K Walking Tour'}
                </h4>
                <p className="mt-0.5 text-[11px] text-gray-400 line-clamp-1">
                  {isHindi ? 'पैदल दर्शन व माहौल' : 'Ground-level perspective'}
                </p>
              </a>

              <a
                href={droneYtUrl}
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-white/10 bg-white/5 p-3.5 hover:bg-white/10 hover:border-white/20 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base">🚁</span>
                  <span className="text-xs text-gray-400 group-hover:text-white transition">↗</span>
                </div>
                <h4 className="mt-2 text-xs font-bold text-white group-hover:text-amber-400 transition">
                  {isHindi ? 'ड्रोन व विहंगम दृश्य' : 'Aerial Drone View'}
                </h4>
                <p className="mt-0.5 text-[11px] text-gray-400 line-clamp-1">
                  {isHindi ? 'सिनेमैटिक दृश्य' : 'Cinematic bird’s-eye views'}
                </p>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Cinematic Floating Mini-Player (Picture-in-Picture) */}
      {isStrictMatch && isFloating && !pipDismissed && (
        <aside
          aria-label="Picture in picture virtual tour"
          className="fixed bottom-6 right-6 z-40 w-72 sm:w-80 rounded-2xl overflow-hidden bg-black/90 border border-white/20 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-gray-900 to-black text-white text-xs border-b border-white/10">
            <span className="font-bold flex items-center gap-1.5 truncate max-w-[190px]">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="truncate">{cleanName}</span>
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => playerRef.current?.scrollIntoView({ behavior: 'smooth' })}
                title="Scroll back to main video"
                className="text-gray-400 hover:text-white p-1 transition"
              >
                ⤢
              </button>
              <button
                type="button"
                onClick={() => setPipDismissed(true)}
                title="Close floating player"
                className="text-gray-400 hover:text-red-400 p-1 transition"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${videoData.videoId}?rel=0&modestbranding=1&enablejsapi=1`}
              title={`${cleanName} Mini Tour`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </aside>
      )}
    </section>
  );
}

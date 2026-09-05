import { useEffect, useState } from 'react';
import { fetchCommonsImages } from '../services/wikimediaService';
import { useLanguage } from '../context/LanguageContext';

export default function WikimediaCommonsGallery({ query }) {
  const { isHindi } = useLanguage();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchCommonsImages(query, 8)
      .then((res) => {
        if (!cancelled) {
          setImages(res);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query]);

  if (loading) {
    return (
      <div className="mt-8">
        <div className="h-6 w-56 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!images || images.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Wikimedia Commons logo icon */}
          <span className="text-xl" aria-hidden="true">
            🌐
          </span>
          <h2 className="section-title">
            {isHindi ? 'विकिमीडिया कॉमन्स अभिलेखागार' : 'Wikimedia Commons Archival Gallery'}
          </h2>
        </div>
        <a
          href={`https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(query)}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold text-india-navy hover:underline flex items-center gap-1"
        >
          <span>{isHindi ? 'सभी देखें' : 'View on Commons'}</span> ↗
        </a>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {images.map((img) => (
          <div
            key={img.pageId}
            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-sm transition hover:shadow-md cursor-pointer"
            onClick={() => setActiveModal(img)}
          >
            <img
              src={img.thumbUrl}
              alt={img.description}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 transition duration-200 group-hover:opacity-100 flex flex-col justify-end p-2.5 text-white">
              <p className="text-[11px] font-semibold line-clamp-1">{img.artist}</p>
              <p className="text-[10px] text-gray-300">{img.license}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Attribution Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="card max-w-2xl w-full bg-white overflow-hidden animate-fade-up shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[60vh] bg-black flex items-center justify-center">
              <img
                src={activeModal.url}
                alt={activeModal.description}
                className="max-h-[60vh] w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white hover:bg-black/90"
              >
                ✕
              </button>
            </div>

            <div className="p-5">
              <p className="text-sm font-medium text-india-text line-clamp-2">
                {activeModal.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs border-t pt-3">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">
                    Author / Photographer
                  </span>
                  <span className="font-semibold text-gray-700">{activeModal.artist}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">
                    License
                  </span>
                  <span className="chip bg-green-50 text-green-700">{activeModal.license}</span>
                </div>
                <a
                  href={activeModal.commonsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-xs py-1.5 px-3"
                >
                  Wikimedia Commons Page ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

import { useEffect, useState } from 'react';
import SafeImage from './SafeImage';

export default function ImageCarousel({ images = [], alt = '', fallbackText = '' }) {
  const list = images.length ? images : [null];
  const [index, setIndex] = useState(0);

  useEffect(() => setIndex(0), [images]);

  const prev = () => setIndex((i) => (i - 1 + list.length) % list.length);
  const next = () => setIndex((i) => (i + 1) % list.length);

  return (
    <div className="card relative aspect-[16/10] w-full bg-gray-100 sm:aspect-[16/9]">
      <SafeImage key={index} src={list[index]} alt={alt} fallbackText={fallbackText || alt} className="h-full w-full object-cover" />
      {list.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-india-navy shadow hover:bg-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m15 6-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-india-navy shadow hover:bg-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {list.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Image ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-india-orange' : 'w-2 bg-white/80'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

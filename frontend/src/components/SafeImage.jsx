import { useEffect, useState } from 'react';
import { placeholderImage } from '../utils/catalog';

/** Map of broad subject keywords to curated Unsplash photo fallbacks */
const SUBJECT_FALLBACKS = {
  temple: 'https://images.unsplash.com/photo-1545579069-e04e72eded66?w=800&q=80',
  fort: 'https://images.unsplash.com/photo-1599493758267-c6c884c7071f?w=800&q=80',
  monument: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
  lake: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  mountain: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  dance: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80',
  food: 'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?w=800&q=80',
  craft: 'https://images.unsplash.com/photo-1584396571605-ffe893b6fcef?w=800&q=80',
  festival: 'https://images.unsplash.com/photo-1567067107408-a72e96e59cef?w=800&q=80',
  palace: 'https://images.unsplash.com/photo-1586613835341-99b8d9e6c64e?w=800&q=80',
  jungle: 'https://images.unsplash.com/photo-1598149982241-e9f4e7fc8618?w=800&q=80',
  waterfall: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
  india: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
};

function getSubjectFallback(altText = '') {
  const lower = (altText || '').toLowerCase();
  for (const [key, url] of Object.entries(SUBJECT_FALLBACKS)) {
    if (lower.includes(key)) return url;
  }
  return null;
}

/**
 * <img> that swaps through:
 *   1. src (original Wikimedia/CDN url)
 *   2. Subject-matched Unsplash fallback (from alt text keyword)
 *   3. Branded placehold.co placeholder
 */
export default function SafeImage({ src, alt, fallbackText, className = '', style, ...rest }) {
  const branded = placeholderImage(fallbackText || alt);
  const [current, setCurrent] = useState(src || branded);
  const [tried, setTried] = useState([]);

  useEffect(() => {
    setCurrent(src || branded);
    setTried([]);
  }, [src]);  // eslint-disable-line react-hooks/exhaustive-deps

  function handleError() {
    const triedSet = new Set(tried);
    triedSet.add(current);

    // Try subject fallback next
    const subjectUrl = getSubjectFallback(alt || fallbackText);
    if (subjectUrl && !triedSet.has(subjectUrl)) {
      setTried([...triedSet]);
      setCurrent(subjectUrl);
      return;
    }

    // Final: use branded placeholder
    if (!triedSet.has(branded)) {
      setCurrent(branded);
    }
  }

  return (
    <img
      src={current}
      alt={alt || ''}
      loading="lazy"
      decoding="async"
      className={className}
      style={style}
      onError={handleError}
      {...rest}
    />
  );
}

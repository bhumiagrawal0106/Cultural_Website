import { useEffect, useState } from 'react';
import { placeholderImage } from '../utils/catalog';

/** <img> that swaps to a branded placeholder when the source fails to load. */
export default function SafeImage({ src, alt, fallbackText, className = '', ...rest }) {
  const [current, setCurrent] = useState(src || placeholderImage(fallbackText || alt));

  useEffect(() => {
    setCurrent(src || placeholderImage(fallbackText || alt));
  }, [src, fallbackText, alt]);

  return (
    <img
      src={current}
      alt={alt || ''}
      loading="lazy"
      className={className}
      onError={() => {
        const fallback = placeholderImage(fallbackText || alt);
        if (current !== fallback) setCurrent(fallback);
      }}
      {...rest}
    />
  );
}

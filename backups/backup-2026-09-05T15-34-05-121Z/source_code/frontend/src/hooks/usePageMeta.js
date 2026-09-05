import { useEffect } from 'react';

export default function usePageMeta(title, description) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `Bharat Darshan | ${title}` : 'Bharat Darshan';

    let meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta ? meta.getAttribute('content') : null;
    if (description) {
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }

    return () => {
      document.title = previousTitle;
      if (meta && previousDescription !== null) meta.setAttribute('content', previousDescription);
    };
  }, [title, description]);
}

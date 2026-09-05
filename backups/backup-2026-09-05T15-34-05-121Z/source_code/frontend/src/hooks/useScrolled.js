import { useEffect, useState } from 'react';

/**
 * Returns true once the user has scrolled past `threshold` pixels.
 * Used to switch the Navbar from transparent to glass on scroll.
 */
export default function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    handleScroll(); // check on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}

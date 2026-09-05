import { useEffect, useRef } from 'react';

/**
 * Attaches IntersectionObserver to a container ref.
 * Children with class `reveal` will get `visible` class when they enter the viewport.
 *
 * Usage:
 *   const ref = useRevealAnimation();
 *   <section ref={ref}>
 *     <div className="reveal reveal-delay-1">...</div>
 *   </section>
 */
export default function useRevealAnimation(threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // only animate once
          }
        });
      },
      { threshold }
    );

    const targets = container.querySelectorAll('.reveal');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

import { useEffect, useRef, useState } from 'react';
import prefersReducedMotion from '../utils/prefersReducedMotion';

export default function useReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(
    () => prefersReducedMotion() || typeof IntersectionObserver === 'undefined'
  );

  useEffect(() => {
    const node = ref.current;
    if (shown || !node) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [shown, threshold, rootMargin]);

  return [ref, shown];
}

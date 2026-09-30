// useParallax.js — translate an element by scrollY * factor (rAF-throttled, off under reduced motion)
import { useEffect, useRef } from 'react';
import prefersReducedMotion from '../utils/prefersReducedMotion';

export default function useParallax(factor = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      node.style.transform = `translate3d(0, ${Math.round(window.scrollY * factor)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [factor]);
  return ref;
}

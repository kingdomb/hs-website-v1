import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Runs after route commit (and after any scroll lock has been released).
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return undefined;
    }
    const raf = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash, key]);
  return null;
}

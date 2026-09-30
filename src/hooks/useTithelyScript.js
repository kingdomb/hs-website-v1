// hooks/useTithelyScript.js — call ONCE per page that renders TithelyGiveButton(s).
// Re-adds the script on mount so Tithe.ly re-scans buttons after route changes.
import { useEffect } from 'react';
import { GIVING } from '../data/giving';

export default function useTithelyScript() {
  useEffect(() => {
    if (!GIVING.enabled) return undefined; // placeholder mode: load nothing from Tithe.ly
    const s = document.createElement('script');
    s.src = 'https://static.tithely.com/give/give.js';
    s.defer = true;
    document.body.appendChild(s);
    return () => s.remove();
  }, []);
}

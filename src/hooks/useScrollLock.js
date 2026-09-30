// useScrollLock.js — lock <body> scroll while `locked` (used by MobileMenu and Modal)
import { useEffect } from 'react';

export default function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

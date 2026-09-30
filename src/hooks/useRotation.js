import { useCallback, useEffect, useRef, useState } from 'react';
import prefersReducedMotion from '../utils/prefersReducedMotion';

export default function useRotation(length, intervalMs = 6000, fadeMs = 350, paused = false) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [still] = useState(prefersReducedMotion);
  const fadeTimer = useRef();

  const goTo = useCallback(
    (next) => {
      clearTimeout(fadeTimer.current);
      setVisible(false);
      fadeTimer.current = setTimeout(() => {
        setIndex(((next % length) + length) % length);
        setVisible(true);
      }, fadeMs);
    },
    [length, fadeMs]
  );

  useEffect(() => {
    if (length < 2 || still || paused || !visible) return undefined;
    const t = setTimeout(() => goTo(index + 1), intervalMs);
    return () => clearTimeout(t);
  }, [index, visible, length, still, paused, intervalMs, goTo]);

  useEffect(() => () => clearTimeout(fadeTimer.current), []);

  return { index, visible, goTo };
}

import { RefObject, useEffect, useRef, useState } from 'react';

export function useSticky<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const stickyRef = useRef<T>(null);
  const [sticky, setSticky] = useState(false);

  const observe = (): void => {
    if (!stickyRef.current) return;
    const refPageOffset = stickyRef.current.getBoundingClientRect().top;
    const stickyOffset = parseInt(getComputedStyle(stickyRef.current).top);
    const stickyActive = refPageOffset <= stickyOffset;

    setSticky(stickyActive);
  };

  useEffect(() => {
    if (!document || !window) {
      return;
    }

    observe();

    document.addEventListener('scroll', observe);
    window.addEventListener('resize', observe);
    window.addEventListener('orientationchange', observe);

    return (): void => {
      document.removeEventListener('scroll', observe);
      window.removeEventListener('resize', observe);
      window.removeEventListener('orientationchange', observe);
    };
  }, [sticky]);

  return [stickyRef, sticky];
}

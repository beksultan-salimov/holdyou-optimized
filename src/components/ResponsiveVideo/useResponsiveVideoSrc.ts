// components/ResponsiveVideo/useResponsiveVideoSrc.ts
import { useEffect, useState, useRef } from 'react';

// function debounce(fn: (...args: any[]) => void, delay: number) {
//   let timeoutId: ReturnType<typeof setTimeout>;
//   return (...args: any[]) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => fn(...args), delay);
//   };
// }

export const useResponsiveVideoSrc = (
  mobileSrc: string,
  desktopSrc: string
): string | null => {
  const [src, setSrc] = useState<string | null>(null);
  const currentSrcRef = useRef<string | null>(null);

  const getResponsiveSrc = () => {
    if (typeof window === 'undefined') return null;
    const isMobile =
      window.innerWidth < 576 &&
      window.matchMedia('(orientation: portrait)').matches;
    return isMobile ? mobileSrc || desktopSrc : desktopSrc || mobileSrc;
  };

  useEffect(() => {
    const updateSrc = () => {
      const newSrc = getResponsiveSrc();
      if (newSrc !== currentSrcRef.current) {
        currentSrcRef.current = newSrc;
        setSrc(newSrc);
      }
    };

    // const debouncedUpdate = debounce(updateSrc, 200); // 200ms delay

    updateSrc(); // initial run

    // window.addEventListener('resize', debouncedUpdate);
    // window.addEventListener('orientationchange', debouncedUpdate);

    // return () => {
      // window.removeEventListener('resize', debouncedUpdate);
      // window.removeEventListener('orientationchange', debouncedUpdate);
    // };
  }, [mobileSrc, desktopSrc, getResponsiveSrc]);

  return src;
};

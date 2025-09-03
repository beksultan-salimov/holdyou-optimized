import { useCallback, useEffect, useRef, useState } from "react";
import { throttle } from '@/utils/helpers';


export const useScrollHandler = () => {
  const SCROLL_THRESHOLD = 150;
  const SCROLL_THRESHOLD_UP = 50;
  const THROTTLE_DELAY = 100;
  const MOBILE_BREAKPOINT = 960;
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollTop = useRef(0);
  const lastUpwardScrollTop = useRef(0);

  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth > MOBILE_BREAKPOINT) return;

    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const isScrollingDown = scrollTop > lastScrollTop.current;

    if (scrollTop > SCROLL_THRESHOLD) {
      if (isScrollingDown) {
        if (!isHidden) {
          setIsHidden(true);
        }
        lastUpwardScrollTop.current = scrollTop;
      } else {
        if (
          isHidden &&
          lastUpwardScrollTop.current - scrollTop >= SCROLL_THRESHOLD_UP
        ) {
          setIsHidden(false);
        }
      }
    } else if (isHidden) {
      setIsHidden(false);
    }

    lastScrollTop.current = scrollTop;
  }, [isHidden]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledHandleScroll = useCallback(
    throttle(handleScroll, THROTTLE_DELAY),
    [handleScroll]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [throttledHandleScroll]);

  return isHidden;
};
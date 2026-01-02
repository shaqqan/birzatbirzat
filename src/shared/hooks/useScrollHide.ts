import { useState, useEffect, useRef } from "react";

interface UseScrollHideOptions {
  threshold?: number;
  minScroll?: number;
}

export function useScrollHide(options: UseScrollHideOptions = {}) {
  const { threshold = 10, minScroll = 50 } = options;
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < minScroll) {
        setIsHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY.current + threshold) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current - threshold) {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, minScroll]);

  return isHidden;
}

import { useState, useEffect, useRef } from "react";
import classes from "./Header.module.css";

export function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 10; // Minimal scroll to trigger

      // Don't hide if at the top
      if (currentScrollY < 50) {
        setIsHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Check scroll direction
      if (currentScrollY > lastScrollY.current + scrollThreshold) {
        // Scrolling down - hide header
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current - scrollThreshold) {
        // Scrolling up - show header
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${classes.header} ${isHidden ? classes.headerHidden : ""}`}
    >
      <div className={classes.headerContent}>
        <h1>Header</h1>
      </div>
    </header>
  );
}

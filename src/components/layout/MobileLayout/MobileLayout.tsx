import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import classes from "./MobileLayout.module.css";

export function MobileLayout() {
  const [, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Pastga scroll → header yashirish
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Tepaga scroll → header ko'rsatish
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={classes.layout}>
      <Outlet />
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { ActionIcon, Text } from "@mantine/core";
import { IconMapPin, IconSearch } from "@tabler/icons-react";
import classes from "./Header.module.css";

export function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 10;

      if (currentScrollY < 50) {
        setIsHidden(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY.current + scrollThreshold) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current - scrollThreshold) {
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
        <div className={classes.location}>
          <IconMapPin size={20} className={classes.locationIcon} />
          <div className={classes.locationText}>
            <Text className={classes.deliveryLabel}>Доставка</Text>
            <Text className={classes.address}>Выберите адрес</Text>
          </div>
        </div>
        <ActionIcon
          variant="transparent"
          size="lg"
          className={classes.searchButton}
        >
          <IconSearch size={24} />
        </ActionIcon>
      </div>
    </header>
  );
}

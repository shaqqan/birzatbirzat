import { useState, useEffect, useRef } from "react";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconMapPin, IconMenu2 } from "@tabler/icons-react";
import classes from "./Header.module.css";

export function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
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
    <>
      <header
        className={`${classes.header} ${isHidden ? classes.headerHidden : ""}`}
      >
        <div className={`${classes.headerContent} container`}>
          <Button
            variant="transparent"
            size="xl"
            radius="md"
            className={classes.locationButton}
            leftSection={<IconMapPin size={24} />}
            rightSection={<IconChevronDown size={20} />}
            onClick={open}
          >
            г. Ташкент, ул. Пушкина, 123
          </Button>
          <ActionIcon
            variant="transparent"
            size="xl"
            className={classes.menuButton}
          >
            <IconMenu2 size={24} />
          </ActionIcon>
        </div>
      </header>

      <Drawer
        opened={opened}
        onClose={close}
        position="bottom"
        title="Мои адреса"
        size="xs"
        classNames={{ content: classes.drawerContent, title: classes.drawerTitle }}
      >
        {/* Drawer content */}
      </Drawer>
    </>
  );
}

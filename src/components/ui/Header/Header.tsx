import { useState } from "react";
import { ActionIcon, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconMapPin, IconMenu2 } from "@tabler/icons-react";
import { useScrollHide } from "@/hooks";
import { AddressDrawer } from "./AddressDrawer";
import classes from "./Header.module.css";

const mockAddresses = [
  { id: "1", address: "улица Шахрисабз, 23" },
  { id: "2", address: "улица Шахрисабз, 23" },
];

export function Header() {
  const isHidden = useScrollHide();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedAddress, setSelectedAddress] = useState("2");

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

      <AddressDrawer
        opened={opened}
        onClose={close}
        addresses={mockAddresses}
        selectedAddress={selectedAddress}
        onSelectAddress={setSelectedAddress}
      />
    </>
  );
}

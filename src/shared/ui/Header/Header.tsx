import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconMapPin, IconUser } from "@tabler/icons-react";
import { useScrollHide } from "@/shared/hooks";
import { useAuth } from "@/app/providers";
import { useAddresses } from "@/features/addresses";
import { AddressDrawer } from "./AddressDrawer";
import classes from "./Header.module.css";

export function Header() {
  const navigate = useNavigate();
  const isHidden = useScrollHide();
  const [opened, { open, close }] = useDisclosure(false);
  const { user, isAuthenticated, openLogin } = useAuth();
  const { data: addresses = [] } = useAddresses();

  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  // Manzillarni drawer uchun formatlash
  const formattedAddresses = useMemo(() => {
    return addresses.map((addr) => ({
      id: String(addr.id),
      address: addr.street,
    }));
  }, [addresses]);

  // Tanlangan manzil yoki default manzil
  const displayAddress = useMemo(() => {
    if (selectedAddressId) {
      const selected = addresses.find((a) => String(a.id) === selectedAddressId);
      if (selected) return selected.street;
    }
    const defaultAddr = addresses.find((a) => a.isDefault);
    if (defaultAddr) return defaultAddr.street;
    if (addresses.length > 0) return addresses[0].street;
    return "Выберите адрес";
  }, [addresses, selectedAddressId]);

  // Foydalanuvchi bosh harflari
  const getInitials = () => {
    if (user?.fullName) {
      return user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.phone) {
      return user.phone.slice(-2);
    }
    return <IconUser size={18} />;
  };

  const handleAddressClick = () => {
    if (isAuthenticated) {
      open();
    } else {
      openLogin();
    }
  };

  const handleAvatarClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      openLogin();
    }
  };

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
            onClick={handleAddressClick}
          >
            {displayAddress}
          </Button>
          <Avatar
            src={user?.avatar}
            alt="User avatar"
            size={38}
            radius="xl"
            className={classes.avatar}
            color="red"
            onClick={handleAvatarClick}
          >
            {isAuthenticated ? getInitials() : <IconUser size={18} />}
          </Avatar>
        </div>
      </header>

      <AddressDrawer
        opened={opened}
        onClose={close}
        addresses={formattedAddresses}
        selectedAddress={selectedAddressId || String(addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || "")}
        onSelectAddress={setSelectedAddressId}
      />
    </>
  );
}

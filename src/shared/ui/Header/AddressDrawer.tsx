import { Button, Drawer, Radio, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import classes from "./Header.module.css";

interface Address {
  id: string;
  address: string;
}

interface AddressDrawerProps {
  opened: boolean;
  onClose: () => void;
  addresses: Address[];
  selectedAddress: string;
  onSelectAddress: (id: string) => void;
  onAddAddress?: () => void;
}

export function AddressDrawer({
  opened,
  onClose,
  addresses,
  selectedAddress,
  onSelectAddress,
  onAddAddress,
}: AddressDrawerProps) {
  const navigate = useNavigate();

  const handleAddAddress = () => {
    onClose();
    if (onAddAddress) {
      onAddAddress();
    } else {
      navigate("/addresses/add");
    }
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Мои адреса"
      position="bottom"
      size="auto"
      classNames={{
        content: classes.drawerContent,
        title: classes.drawerTitle,
        body: classes.drawerBody,
      }}
    >
      <Radio.Group value={selectedAddress} onChange={onSelectAddress}>
        <Stack gap="sm">
          {addresses.map((item) => (
            <Radio
              key={item.id}
              value={item.id}
              label={item.address}
              classNames={{
                root: classes.addressItem,
                radio: classes.addressRadio,
                label: classes.addressLabel,
              }}
            />
          ))}
        </Stack>
      </Radio.Group>

      <Button
        fullWidth
        variant="filled"
        size="lg"
        radius="xl"
        leftSection={<IconPlus size={20} />}
        className={classes.addAddressButton}
        onClick={handleAddAddress}
      >
        Добавить новый адрес
      </Button>
    </Drawer>
  );
}

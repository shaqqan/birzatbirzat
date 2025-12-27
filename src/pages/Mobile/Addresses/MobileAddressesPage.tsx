import { BottomNavbar } from "@/components/ui";
import { Container } from "@/components/shared";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Modal,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowLeft,
  IconBriefcase,
  IconCheck,
  IconEdit,
  IconHome,
  IconMapPin,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./MobileAddressesPage.module.css";

interface Address {
  id: string;
  type: "home" | "work" | "other";
  label: string;
  address: string;
  details?: string;
  isDefault: boolean;
}

const initialAddresses: Address[] = [
  {
    id: "1",
    type: "home",
    label: "Дом",
    address: "ул. Навои 25, кв. 42",
    details: "Подъезд 2, этаж 5, домофон 42",
    isDefault: true,
  },
  {
    id: "2",
    type: "work",
    label: "Работа",
    address: "ул. Амира Темура 108, офис 305",
    details: "Бизнес центр «Пойтахт»",
    isDefault: false,
  },
];

const addressTypeConfig = {
  home: {
    icon: IconHome,
    color: "var(--mantine-color-blue-6)",
    bgColor: "var(--mantine-color-blue-0)",
  },
  work: {
    icon: IconBriefcase,
    color: "var(--mantine-color-violet-6)",
    bgColor: "var(--mantine-color-violet-0)",
  },
  other: {
    icon: IconMapPin,
    color: "var(--mantine-color-green-6)",
    bgColor: "var(--mantine-color-green-0)",
  },
};

type AddressType = "home" | "work" | "other";

const addressTypes: { key: AddressType; label: string }[] = [
  { key: "home", label: "Дом" },
  { key: "work", label: "Работа" },
  { key: "other", label: "Другое" },
];

export function MobileAddressesPage() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deletingAddressId, setDeletingAddressId] = useState<string | null>(null);

  // Form state
  const [formType, setFormType] = useState<AddressType>("home");
  const [formLabel, setFormLabel] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formDetails, setFormDetails] = useState("");

  const resetForm = () => {
    setFormType("home");
    setFormLabel("");
    setFormAddress("");
    setFormDetails("");
    setEditingAddress(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    openModal();
  };

  const handleOpenEditModal = (address: Address) => {
    setEditingAddress(address);
    setFormType(address.type);
    setFormLabel(address.label);
    setFormAddress(address.address);
    setFormDetails(address.details || "");
    openModal();
  };

  const handleSave = () => {
    if (!formAddress.trim()) return;

    const label = formLabel.trim() || addressTypes.find(t => t.key === formType)?.label || "Адрес";

    if (editingAddress) {
      setAddresses(prev =>
        prev.map(addr =>
          addr.id === editingAddress.id
            ? { ...addr, type: formType, label, address: formAddress, details: formDetails }
            : addr
        )
      );
    } else {
      const newAddress: Address = {
        id: Date.now().toString(),
        type: formType,
        label,
        address: formAddress,
        details: formDetails,
        isDefault: addresses.length === 0,
      };
      setAddresses(prev => [...prev, newAddress]);
    }

    closeModal();
    resetForm();
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleDeleteClick = (id: string) => {
    setDeletingAddressId(id);
    openDeleteModal();
  };

  const handleConfirmDelete = () => {
    if (deletingAddressId) {
      setAddresses(prev => {
        const filtered = prev.filter(addr => addr.id !== deletingAddressId);
        // If deleted address was default, make first one default
        if (filtered.length > 0 && !filtered.some(addr => addr.isDefault)) {
          filtered[0].isDefault = true;
        }
        return filtered;
      });
    }
    closeDeleteModal();
    setDeletingAddressId(null);
  };

  return (
    <Flex direction="column" className={classes.page}>
      <Box className={classes.header}>
        <Flex align="center" gap={12}>
          <ActionIcon
            variant="subtle"
            color="dark"
            size="lg"
            onClick={() => navigate(-1)}
          >
            <IconArrowLeft size={22} />
          </ActionIcon>
          <Text className={classes.title}>Мои адреса</Text>
        </Flex>
      </Box>

      <Box className={classes.content}>
        {addresses.length === 0 ? (
          <Container>
            <Box className={classes.emptyState}>
              <Box className={classes.emptyIconWrapper}>
                <IconMapPin size={48} className={classes.emptyIcon} />
              </Box>
              <Text className={classes.emptyTitle}>Нет сохранённых адресов</Text>
              <Text className={classes.emptyDescription}>
                Добавьте адрес доставки, чтобы быстрее оформлять заказы
              </Text>
              <Button
                variant="filled"
                radius="md"
                size="md"
                leftSection={<IconPlus size={18} />}
                className={classes.addButton}
                onClick={handleOpenAddModal}
              >
                Добавить адрес
              </Button>
            </Box>
          </Container>
        ) : (
          <Container>
            <Box className={classes.addressList}>
              {addresses.map((address) => {
                const config = addressTypeConfig[address.type];
                const TypeIcon = config.icon;

                return (
                  <Box key={address.id} className={classes.addressCard}>
                    <Flex className={classes.cardContent}>
                      <Box
                        className={classes.addressIcon}
                        style={{ backgroundColor: config.bgColor, color: config.color }}
                      >
                        <TypeIcon size={22} />
                      </Box>
                      <Box className={classes.addressInfo}>
                        <Flex align="center" gap={8}>
                          <Text className={classes.addressLabel}>{address.label}</Text>
                          {address.isDefault && (
                            <Box className={classes.defaultBadge}>
                              <Text className={classes.defaultText}>Основной</Text>
                            </Box>
                          )}
                        </Flex>
                        <Text className={classes.addressText}>{address.address}</Text>
                        {address.details && (
                          <Text className={classes.addressDetails}>{address.details}</Text>
                        )}
                      </Box>
                    </Flex>
                    <Flex className={classes.cardActions}>
                      {!address.isDefault && (
                        <Button
                          variant="subtle"
                          color="primary"
                          size="xs"
                          leftSection={<IconCheck size={14} />}
                          className={classes.actionBtn}
                          onClick={() => handleSetDefault(address.id)}
                        >
                          Сделать основным
                        </Button>
                      )}
                      <Flex gap={4}>
                        <ActionIcon
                          variant="subtle"
                          color="gray"
                          size="md"
                          onClick={() => handleOpenEditModal(address)}
                        >
                          <IconEdit size={18} />
                        </ActionIcon>
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          size="md"
                          onClick={() => handleDeleteClick(address.id)}
                        >
                          <IconTrash size={18} />
                        </ActionIcon>
                      </Flex>
                    </Flex>
                  </Box>
                );
              })}
            </Box>

            <Button
              variant="light"
              color="primary"
              fullWidth
              size="md"
              radius="md"
              leftSection={<IconPlus size={18} />}
              className={classes.addNewButton}
              onClick={handleOpenAddModal}
            >
              Добавить новый адрес
            </Button>
          </Container>
        )}
      </Box>

      {/* Add/Edit Address Modal */}
      <Modal
        opened={modalOpened}
        onClose={() => {
          closeModal();
          resetForm();
        }}
        title={editingAddress ? "Редактировать адрес" : "Новый адрес"}
        centered
        radius="lg"
        size="md"
        classNames={{
          header: classes.modalHeader,
          title: classes.modalTitle,
          body: classes.modalBody,
        }}
      >
        <Box className={classes.form}>
          <Box className={classes.typeSelector}>
            <Text className={classes.fieldLabel}>Тип адреса</Text>
            <Flex gap={8} mt={8}>
              {addressTypes.map((type) => {
                const config = addressTypeConfig[type.key];
                const TypeIcon = config.icon;
                return (
                  <Box
                    key={type.key}
                    className={classes.typeOption}
                    data-selected={formType === type.key || undefined}
                    onClick={() => setFormType(type.key)}
                  >
                    <TypeIcon size={20} />
                    <Text className={classes.typeLabel}>{type.label}</Text>
                  </Box>
                );
              })}
            </Flex>
          </Box>

          <TextInput
            label="Название"
            placeholder="например, Дом родителей"
            value={formLabel}
            onChange={(e) => setFormLabel(e.target.value)}
            classNames={{ label: classes.fieldLabel, input: classes.input }}
          />

          <TextInput
            label="Адрес"
            placeholder="Улица, дом, квартира"
            value={formAddress}
            onChange={(e) => setFormAddress(e.target.value)}
            required
            classNames={{ label: classes.fieldLabel, input: classes.input }}
          />

          <Textarea
            label="Дополнительно"
            placeholder="Подъезд, этаж, домофон..."
            value={formDetails}
            onChange={(e) => setFormDetails(e.target.value)}
            minRows={2}
            classNames={{ label: classes.fieldLabel, input: classes.input }}
          />

          <Button
            fullWidth
            size="md"
            radius="md"
            className={classes.saveButton}
            onClick={handleSave}
            disabled={!formAddress.trim()}
          >
            {editingAddress ? "Сохранить" : "Добавить адрес"}
          </Button>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title="Удалить адрес?"
        centered
        radius="lg"
        size="sm"
        classNames={{
          header: classes.modalHeader,
          title: classes.modalTitle,
          body: classes.modalBody,
        }}
      >
        <Text className={classes.deleteMessage}>
          Вы уверены, что хотите удалить этот адрес? Это действие нельзя отменить.
        </Text>
        <Flex gap={12} mt={20}>
          <Button
            variant="light"
            color="gray"
            flex={1}
            radius="md"
            onClick={closeDeleteModal}
          >
            Отмена
          </Button>
          <Button
            variant="filled"
            color="red"
            flex={1}
            radius="md"
            onClick={handleConfirmDelete}
          >
            Удалить
          </Button>
        </Flex>
      </Modal>

      <BottomNavbar />
    </Flex>
  );
}

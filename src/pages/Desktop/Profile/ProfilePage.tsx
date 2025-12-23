import { useState, useRef } from "react";
import {
  Container,
  Title,
  Text,
  TextInput,
  Avatar,
  Button,
  Group,
  Stack,
  Paper,
  SegmentedControl,
  FileButton,
  ActionIcon,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconCamera, IconUser, IconCheck } from "@tabler/icons-react";
import classes from "./ProfilePage.module.css";

interface ProfileData {
  fullName: string;
  birthDate: string | null;
  gender: string;
  avatar: string | null;
}

const formatDateDisplay = (dateStr: string | null): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatDateShort = (dateStr: string | null): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU");
};

export function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: " Орынбаев Бегис Куралбай ули",
    birthDate: "2000-07-02",
    gender: "male",
    avatar: "/avatar/begis.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<ProfileData>(profile);
  const resetRef = useRef<() => void>(null);

  const handleAvatarChange = (file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setEditedProfile((prev) => ({ ...prev, avatar: url }));
    }
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
    resetRef.current?.();
  };

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const currentData = isEditing ? editedProfile : profile;

  return (
    <Container size="sm" py="xl">
      <Paper radius="lg" p="xl">
        <Stack gap="xl">
          {/* Header */}
          <div className={classes.header}>
            <Title order={2} className={classes.title}>
              Профиль
            </Title>
            {!isEditing && (
              <Button variant="light" radius="md" onClick={handleEdit}>
                Редактировать
              </Button>
            )}
          </div>

          {/* Avatar Section */}
          <div className={classes.avatarSection}>
            <div className={classes.avatarWrapper}>
              <Avatar
                src={currentData.avatar}
                size={120}
                radius="50%"
                className={classes.avatar}
              >
                <IconUser size={48} />
              </Avatar>
              {isEditing && (
                <FileButton
                  resetRef={resetRef}
                  onChange={handleAvatarChange}
                  accept="image/png,image/jpeg,image/webp"
                >
                  {(props) => (
                    <ActionIcon
                      {...props}
                      size="lg"
                      radius="xl"
                      className={classes.avatarEditButton}
                      variant="filled"
                      color="red"
                    >
                      <IconCamera size={18} />
                    </ActionIcon>
                  )}
                </FileButton>
              )}
            </div>
            {!isEditing && (
              <div className={classes.userInfo}>
                <Text className={classes.userName}>{profile.fullName}</Text>
                <Text className={classes.userMeta} c="dimmed" size="sm">
                  {profile.gender === "male" ? "Мужчина" : "Женщина"} •{" "}
                  {formatDateDisplay(profile.birthDate)}
                </Text>
              </div>
            )}
          </div>

          {/* Form Fields */}
          {isEditing && (
            <Stack gap="md">
              <TextInput
                label="Ф.И.О"
                placeholder="Фамилия Имя Отчество"
                value={editedProfile.fullName}
                onChange={(e) =>
                  setEditedProfile((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
                radius="md"
                size="md"
                classNames={{ label: classes.inputLabel }}
              />

              <div>
                <Text className={classes.inputLabel} mb={8}>
                  Дата рождения
                </Text>
                <DateInput
                  value={editedProfile.birthDate}
                  onChange={(date) =>
                    setEditedProfile((prev) => ({ ...prev, birthDate: date }))
                  }
                  placeholder="Выберите дату"
                  radius="md"
                  size="md"
                  maxDate={new Date()}
                  valueFormat="DD.MM.YYYY"
                />
              </div>

              <div>
                <Text className={classes.inputLabel} mb={8}>
                  Пол
                </Text>
                <SegmentedControl
                  value={editedProfile.gender}
                  onChange={(value) =>
                    setEditedProfile((prev) => ({ ...prev, gender: value }))
                  }
                  data={[
                    { label: "Мужской", value: "male" },
                    { label: "Женский", value: "female" },
                  ]}
                  radius="md"
                  size="md"
                  fullWidth
                  classNames={{
                    root: classes.segmentedRoot,
                  }}
                />
              </div>

              {/* Action Buttons */}
              <Group mt="md" grow>
                <Button
                  variant="light"
                  color="gray"
                  radius="md"
                  size="md"
                  onClick={handleCancel}
                >
                  Отмена
                </Button>
                <Button
                  radius="md"
                  size="md"
                  onClick={handleSave}
                  leftSection={<IconCheck size={18} />}
                >
                  Сохранить
                </Button>
              </Group>
            </Stack>
          )}

          {/* View Mode - Profile Details */}
          {!isEditing && (
            <Stack gap="md" className={classes.detailsList}>
              <div className={classes.detailItem}>
                <Text className={classes.detailLabel}>Ф.И.О</Text>
                <Text className={classes.detailValue}>{profile.fullName}</Text>
              </div>
              <div className={classes.detailItem}>
                <Text className={classes.detailLabel}>Дата рождения</Text>
                <Text className={classes.detailValue}>
                  {formatDateShort(profile.birthDate)}
                </Text>
              </div>
              <div className={classes.detailItem}>
                <Text className={classes.detailLabel}>Пол</Text>
                <Text className={classes.detailValue}>
                  {profile.gender === "male" ? "Мужской" : "Женский"}
                </Text>
              </div>
            </Stack>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}

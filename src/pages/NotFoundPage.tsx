import { Button, Flex, Text, Title } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="md"
      style={{ minHeight: "80vh", padding: "16px", textAlign: "center" }}
    >
      <Title order={1} size="72px" c="gray.3">
        404
      </Title>
      <Title order={2} size="h3">
        Страница не найдена
      </Title>
      <Text c="dimmed" size="sm">
        Извините, запрашиваемая страница не существует или была перемещена.
      </Text>
      <Button
        leftSection={<IconHome size={18} />}
        onClick={() => navigate("/")}
        mt="md"
      >
        Вернуться на главную
      </Button>
    </Flex>
  );
}

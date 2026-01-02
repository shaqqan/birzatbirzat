import { Box, Button, Flex, Text, ActionIcon, Image } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container } from "@/shared/ui";
import classes from "./PaymentResultPage.module.css";

export function PaymentResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "success";
  const isSuccess = status === "success";

  const handleClose = () => {
    navigate("/");
  };

  const handleButtonClick = () => {
    if (isSuccess) {
      navigate("/");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <Flex direction="column" className={classes.page}>
      {/* Header */}
      <Box className={classes.header}>
        <Flex align="center" justify="center" pos="relative">
          <Text className={classes.title}>Оплата</Text>
          <ActionIcon
            variant="subtle"
            color="dark"
            size="lg"
            className={classes.closeButton}
            onClick={handleClose}
          >
            <IconX size={22} />
          </ActionIcon>
        </Flex>
      </Box>

      {/* Content */}
      <Box className={classes.content}>
        <Container>
          <Flex direction="column" align="center" className={classes.resultBox}>
            <Box className={classes.iconWrapper}>
              {isSuccess ? (
                <Image src="/order/success.svg" alt="Success" sizes="120px" />
              ) : (
                <Image src="/order/error.svg" alt="Error" />
              )}
            </Box>

            <Text className={classes.resultTitle}>
              {isSuccess ? "Платёж прошёл успешно" : "Произошла ошибка"}
            </Text>

            <Text className={classes.resultDescription}>
              {isSuccess
                ? "Вы можете отследить статус вашего заказа"
                : "Во время платежа произошла ошибка.\nПроверьте ваши данные и повторите попытку"}
            </Text>
          </Flex>
        </Container>
      </Box>

      {/* Footer */}
      <Box className={classes.footer}>
        <Container>
          <Button
            fullWidth
            size="lg"
            className={classes.actionButton}
            onClick={handleButtonClick}
          >
            {isSuccess ? "Продолжить покупку" : "Повторить попытку"}
          </Button>
        </Container>
      </Box>
    </Flex>
  );
}

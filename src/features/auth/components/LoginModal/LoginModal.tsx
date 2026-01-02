import { useState, useEffect } from "react";
import { Drawer, Button, Text, ActionIcon, PinInput } from "@mantine/core";
import { IconArrowLeft, IconX } from "@tabler/icons-react";
import { IMaskInput } from "react-imask";
import classes from "./LoginModal.module.css";

// Hook to detect keyboard height
function useKeyboardHeight() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const handleResize = () => {
      const height = window.innerHeight - viewport.height;
      setKeyboardHeight(height > 0 ? height : 0);
    };

    viewport.addEventListener("resize", handleResize);
    viewport.addEventListener("scroll", handleResize);

    return () => {
      viewport.removeEventListener("resize", handleResize);
      viewport.removeEventListener("scroll", handleResize);
    };
  }, []);

  return keyboardHeight;
}

interface LoginModalProps {
  opened: boolean;
  onClose: () => void;
  onSendOtp?: (phone: string) => void;
  onVerifyOtp?: (phone: string, otp: string) => void;
  otpError?: boolean;
  onOtpErrorClear?: () => void;
}

type Step = "phone" | "otp";

const TIMER_SECONDS = 60;

export const LoginModal = ({
  opened,
  onClose,
  onSendOtp,
  onVerifyOtp,
  otpError,
  onOtpErrorClear,
}: LoginModalProps) => {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<Step>("phone");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const keyboardHeight = useKeyboardHeight();

  const isPhoneComplete = phone.replace(/\D/g, "").length === 9;
  const canResend = timer === 0;
  const cleanPhone = "+998" + phone.replace(/\D/g, "");

  useEffect(() => {
    if (!opened) {
      setStep("phone");
      setOtp("");
      setTimer(TIMER_SECONDS);
    }
  }, [opened]);

  useEffect(() => {
    if (step === "otp" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const handleSendOtp = () => {
    onSendOtp?.(cleanPhone);
    setStep("otp");
    setTimer(TIMER_SECONDS);
  };

  const handleResendOtp = () => {
    if (canResend) {
      onSendOtp?.(cleanPhone);
      setTimer(TIMER_SECONDS);
      setOtp("");
      onOtpErrorClear?.();
    }
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    onOtpErrorClear?.();
    if (value.length === 5) {
      onVerifyOtp?.(cleanPhone, value);
    }
  };

  const handleBack = () => {
    setStep("phone");
    setOtp("");
    onOtpErrorClear?.();
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="bottom"
      size="auto"
      withCloseButton={false}
      classNames={{
        content: classes.drawerContent,
        body: classes.drawerBody,
        overlay: classes.drawerOverlay,
      }}
      styles={{
        content: {
          transform: keyboardHeight > 0 ? `translateY(-${keyboardHeight}px)` : undefined,
          transition: "transform 0.1s ease-out",
        },
      }}
    >
      {/* Error toast */}
      {otpError && (
        <div className={classes.errorToast}>
          <div className={classes.errorIcon}>
            <IconX size={20} stroke={2.5} />
          </div>
          <Text size="sm" className={classes.errorText}>
            Неправильный код. Пожалуйста, попробуйте еще раз
          </Text>
          <ActionIcon
            variant="subtle"
            color="dark"
            size="sm"
            onClick={onOtpErrorClear}
          >
            <IconX size={16} />
          </ActionIcon>
        </div>
      )}

      {/* Header */}
      <div className={classes.header}>
        {step === "otp" && (
          <ActionIcon
            variant="subtle"
            color="dark"
            size="lg"
            onClick={handleBack}
            className={classes.backButton}
          >
            <IconArrowLeft size={20} />
          </ActionIcon>
        )}
        <Text className={classes.title}>Войти</Text>
        <ActionIcon
          variant="subtle"
          color="dark"
          size="lg"
          onClick={onClose}
          className={classes.closeButton}
        >
          <IconX size={20} />
        </ActionIcon>
      </div>

      {step === "phone" ? (
        <div className={classes.content}>
          <div className={classes.headingSection}>
            <Text className={classes.heading}>
              Введите ваш номер
              <br />
              телефона
            </Text>
            <Text className={classes.subtitle}>
              Мы отправим вам код подтверждения
            </Text>
          </div>

          <div className={classes.phoneInputWrapper}>
            <div className={classes.countrySelect}>
              <span className={classes.countryCode}>+998</span>
            </div>
            <IMaskInput
              mask="(00) 000-00-00"
              value={phone}
              onAccept={(value: string) => setPhone(value)}
              placeholder="(00) 000-00-00"
              className={classes.phoneInput}
              inputMode="numeric"
            />
          </div>

          <div className={classes.footer}>
            <Text className={classes.termsText}>
              Продолжая, вы соглашаетесь с нашими{" "}
              <Text component="span" className={classes.link}>
                условиями использования
              </Text>{" "}
              и{" "}
              <Text component="span" className={classes.link}>
                Политикой конфиденциальности
              </Text>
              .
            </Text>

            <Button
              size="lg"
              radius="12px"
              fullWidth
              onClick={handleSendOtp}
              disabled={!isPhoneComplete}
              className={classes.submitButton}
            >
              Продолжить
            </Button>
          </div>
        </div>
      ) : (
        <div className={classes.content}>
          <div className={classes.headingSection}>
            <Text className={classes.heading}>
              Введите код
              <br />
              подтверждения
            </Text>
            <Text className={classes.subtitle}>
              Код был отправлен на номер {cleanPhone}
            </Text>
          </div>

          <div className={classes.otpSection}>
            <PinInput
              length={5}
              // @ts-ignore
              size=""
              value={otp}
              onChange={handleOtpChange}
              type="number"
              autoFocus
              error={otpError}
              classNames={{
                root: classes.pinInputRoot,
                input: otpError ? classes.pinInputError : classes.pinInput,
              }}
            />
          </div>

          <div className={classes.timerSection}>
            {canResend ? (
              <>
                <Text className={classes.resendLabel}>
                  Не получили код? Вы сможете повторно отправить
                </Text>
                <Button
                  size="lg"
                  radius="xl"
                  fullWidth
                  onClick={handleResendOtp}
                  className={classes.submitButton}
                >
                  Отправить код повторно
                </Button>
              </>
            ) : (
              <Text className={classes.timerText}>
                Вы сможете отправить повторно через{" "}
                <Text component="span" className={classes.timerValue}>
                  {timer} сек
                </Text>
                .
              </Text>
            )}
          </div>
        </div>
      )}
    </Drawer>
  );
};

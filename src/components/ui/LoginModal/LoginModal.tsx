import { useState, useEffect } from "react";
import { Modal, Button, Text, ActionIcon, PinInput } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { IMaskInput } from "react-imask";
import classes from "./LoginModal.module.css";

interface LoginModalProps {
  opened: boolean;
  onClose: () => void;
  onSendOtp?: (phone: string) => void;
  onVerifyOtp?: (phone: string, otp: string) => void;
}

type Step = "phone" | "otp";

const TIMER_SECONDS = 180; // 3 minutes

export const LoginModal = ({
  opened,
  onClose,
  onSendOtp,
  onVerifyOtp,
}: LoginModalProps) => {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<Step>("phone");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(TIMER_SECONDS);

  const isPhoneComplete = phone.replace(/\D/g, "").length === 9;
  const isOtpComplete = otp.length === 4;
  const cleanPhone = "+998" + phone.replace(/\D/g, "");
  const canResend = timer === 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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
    }
  };

  const handleVerify = () => {
    onVerifyOtp?.(cleanPhone, otp);
  };

  const handleBack = () => {
    setStep("phone");
    setOtp("");
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        step === "otp" ? (
          <div className={classes.otpHeader}>
            <ActionIcon
              variant="subtle"
              color="gray"
              size="lg"
              onClick={handleBack}
            >
              <IconArrowLeft size={20} />
            </ActionIcon>
            <span className={classes.otpTitle}>Подтверждение</span>
            <div className={classes.otpHeaderSpacer} />
          </div>
        ) : (
          "Вход"
        )
      }
      size={420}
      radius="lg"
      centered
      styles={{
        title: { fontWeight: 700, fontSize: 26, width: "100%" },
        header: { paddingBottom: 8 },
        content: {
          borderRadius: 24,
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
        },
        body: {
          padding: "0 24px 24px",
        },
      }}
    >
      {step === "phone" ? (
        <div className={classes.modalContent}>
          <Text size="sm" c="dimmed">
            Введите номер телефона для входа
          </Text>

          <div className={classes.inputWrapper}>
            <div className={classes.prefix}>+998</div>
            <IMaskInput
              mask="(00) 000-00-00"
              value={phone}
              onAccept={(value) => setPhone(value)}
              placeholder="(00) 000-00-00"
              className={classes.phoneInput}
            />
          </div>

          <Button
            size="lg"
            radius="md"
            fullWidth
            onClick={handleSendOtp}
            disabled={!isPhoneComplete}
            className={classes.sendButton}
          >
            Отправить код
          </Button>
        </div>
      ) : (
        <div className={classes.modalContent}>
          <div className={classes.otpInfo}>
            <Text size="sm" c="dimmed">
              Введите код, отправленный на номер
            </Text>
            <Text size="sm" fw={600}>
              {cleanPhone.replace(
                /(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/,
                "$1 ($2) $3-$4-$5"
              )}
            </Text>
          </div>

          <div className={classes.otpContainer}>
            <PinInput
              length={4}
              size="xl"
              value={otp}
              onChange={setOtp}
              type="number"
              autoFocus
              styles={{
                input: {
                  width: 64,
                  height: 72,
                  fontSize: 28,
                  fontWeight: 600,
                  borderRadius: 16,
                  border: "2px solid var(--mantine-color-gray-3)",
                  backgroundColor: "var(--mantine-color-gray-0)",
                },
              }}
            />
          </div>

          <Button
            size="lg"
            radius="md"
            fullWidth
            onClick={handleVerify}
            disabled={!isOtpComplete}
            className={classes.sendButton}
          >
            Подтвердить
          </Button>

          <div className={classes.timerSection}>
            {canResend ? (
              <Button
                variant="subtle"
                color="red"
                size="sm"
                onClick={handleResendOtp}
                className={classes.resendButton}
              >
                Отправить код повторно
              </Button>
            ) : (
              <Text size="sm" c="dimmed" className={classes.timerText}>
                Отправить повторно через{" "}
                <Text span fw={600} c="dark">
                  {formatTime(timer)}
                </Text>
              </Text>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

import { useEffect, useState } from "react";
import { Box, Flex, Image } from "@mantine/core";
import classes from "./SplashScreen.module.css";

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

export function SplashScreen({ onFinish, duration = 1500 }: SplashScreenProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start animation after mount
    const animationTimer = setTimeout(() => {
      setIsAnimating(true);
    }, 100);

    // Start exit animation before finish
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, duration - 300);

    // Call onFinish after duration
    const finishTimer = setTimeout(() => {
      onFinish();
    }, duration);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [duration, onFinish]);

  return (
    <Box className={`${classes.splash} ${isExiting ? classes.exiting : ""}`}>
      <Flex
        direction="row"
        align="center"
        justify="center"
        gap={12}
        className={`${classes.content} ${isAnimating ? classes.animating : ""}`}
      >
        {/* Logo Icon */}
        <Box className={classes.logoIcon}>
          <Image src="/logo/app.svg" alt="Logo" sizes="120px" />
        </Box>

        {/* Text */}
        <Box className={classes.logoText}>
          <span className={classes.letter} style={{ animationDelay: "0.1s" }}>
            р
          </span>
          <span className={classes.letter} style={{ animationDelay: "0.15s" }}>
            е
          </span>
          <span className={classes.letter} style={{ animationDelay: "0.2s" }}>
            д
          </span>
          <span className={classes.letter} style={{ animationDelay: "0.25s" }}>
            и
          </span>
          <span className={classes.letter} style={{ animationDelay: "0.3s" }}>
            с
          </span>
          <span className={classes.letter} style={{ animationDelay: "0.35s" }}>
            к
          </span>
          <span className={classes.letter} style={{ animationDelay: "0.4s" }}>
            а
          </span>
        </Box>
      </Flex>
    </Box>
  );
}

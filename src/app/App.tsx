import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@/styles/index.css";
import { useState, useCallback } from "react";
import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import { theme } from "@/config/theme";
import { router } from "./router";
import { SplashScreen } from "@/components/ui";
import { useDevice } from "@/hooks/useDevice";

export default function App() {
  const { isMobile } = useDevice();
  const [showSplash, setShowSplash] = useState(isMobile);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <MantineProvider theme={theme}>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} duration={1500} />}
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

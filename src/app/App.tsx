import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@/shared/styles/index.css";
import { useState, useCallback } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryProvider, AuthProvider, ThemeProvider } from "./providers";
import { router } from "./router";
import { SplashScreen } from "@/shared/ui";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <QueryProvider>
      <ThemeProvider>
        <AuthProvider>
          {showSplash && <SplashScreen onFinish={handleSplashFinish} duration={1500} />}
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

import { MantineProvider, type MantineTheme } from "@mantine/core";
import { type ReactNode } from "react";
import { theme } from "@/app/config";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <MantineProvider theme={theme as MantineTheme}>{children}</MantineProvider>;
}

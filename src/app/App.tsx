import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@/styles/index.css";
import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import { theme } from "@/config/theme";
import { router } from "./router";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

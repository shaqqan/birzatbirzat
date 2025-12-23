import { useMediaQuery } from "@mantine/hooks";
import { MobileLayout } from "../MobileLayout";
import { DesktopLayout } from "../DesktopLayout";

const DESKTOP_BREAKPOINT = "(min-width: 1024px)";

export function MainLayout() {
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);

  // Show nothing during SSR or initial load to avoid hydration mismatch
  if (isDesktop === undefined) {
    return null;
  }

  return isDesktop ? <DesktopLayout /> : <MobileLayout />;
}

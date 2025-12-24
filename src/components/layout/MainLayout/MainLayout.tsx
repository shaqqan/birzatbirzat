import { MobileLayout } from "../MobileLayout";
import { DesktopLayout } from "../DesktopLayout";
import { useDevice } from "@/hooks/useDevice";

export function MainLayout() {
  const { isDesktop } = useDevice();

  return isDesktop ? <DesktopLayout /> : <MobileLayout />;
}

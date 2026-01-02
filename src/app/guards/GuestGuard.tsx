import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Loader } from "@mantine/core";
import { useAuth } from "@/app/providers";

interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader size="lg" color="red" />
      </Center>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

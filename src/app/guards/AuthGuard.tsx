import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Center, Loader } from "@mantine/core";
import { useAuth } from "@/app/providers";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading, openLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      openLogin();
      navigate("/", { replace: true, state: { from: location } });
    }
  }, [isAuthenticated, isLoading, openLogin, navigate, location]);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader size="lg" color="red" />
      </Center>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

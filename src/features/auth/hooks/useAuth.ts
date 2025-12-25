import { useState, useCallback } from "react";

interface User {
  id: string;
  phone: string;
  name?: string;
  email?: string;
}

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, code: string) => Promise<boolean>;
  logout: () => void;
  sendVerificationCode: (phone: string) => Promise<boolean>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = user !== null;

  const sendVerificationCode = useCallback(async (phone: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // TODO: Implement API call
      console.log("Sending verification code to:", phone);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error("Failed to send verification code:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (phone: string, code: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // TODO: Implement API call
      console.log("Logging in with:", phone, code);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUser({
        id: "1",
        phone,
        name: "User",
      });
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    sendVerificationCode,
  };
};

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { tokenManager } from "@/shared/api";
import { authApi, type User } from "@/features/auth";
import { LoginModal } from "@/features/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  logout: () => void;
  requireAuth: (callback: () => void) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginOpened, setLoginOpened] = useState(false);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  const isAuthenticated = tokenManager.isAuthenticated();

  useEffect(() => {
    const loadUser = async () => {
      if (tokenManager.isAuthenticated()) {
        try {
          const userData = await authApi.getProfile();
          setUser(userData);
        } catch {
          tokenManager.clearTokens();
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const openLogin = useCallback(() => {
    setLoginOpened(true);
  }, []);

  const closeLogin = useCallback(() => {
    setLoginOpened(false);
    setPendingCallback(null);
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
    queryClient.clear();
  }, [queryClient]);

  const requireAuth = useCallback((callback: () => void) => {
    if (tokenManager.isAuthenticated()) {
      callback();
    } else {
      setPendingCallback(() => callback);
      setLoginOpened(true);
    }
  }, []);

  const handleSendOtp = useCallback(async (phone: string): Promise<boolean> => {
    try {
      await authApi.sendOtp(phone);
      return true;
    } catch (error) {
      console.error("OTP yuborishda xatolik:", error);
      return false;
    }
  }, []);

  const handleVerifyOtp = useCallback(
    async (phone: string, code: string): Promise<boolean> => {
      try {
        const response = await authApi.verifyOtp(phone, code);
        setUser(response.user);
        setLoginOpened(false);

        if (pendingCallback) {
          pendingCallback();
          setPendingCallback(null);
        }

        queryClient.invalidateQueries({ queryKey: ["cart"] });
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
        return true;
      } catch (error) {
        console.error("OTP tasdiqlashda xatolik:", error);
        return false;
      }
    },
    [pendingCallback, queryClient]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        openLogin,
        closeLogin,
        logout,
        requireAuth,
      }}
    >
      {children}
      <LoginModal
        opened={loginOpened}
        onClose={closeLogin}
        onSendOtp={handleSendOtp}
        onVerifyOtp={handleVerifyOtp}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

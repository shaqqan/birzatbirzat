import { api, tokenManager } from "@/shared/api";

export interface User {
  id: number;
  phone: string;
  fullName: string | null;
  avatar: string | null;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const authApi = {
  async sendOtp(phone: string): Promise<void> {
    await api.post("/web/auth/send-otp", { phone });
  },

  async verifyOtp(phone: string, code: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/web/auth/verify-otp", {
      phone,
      code,
    });

    const { accessToken, refreshToken } = response.data;
    tokenManager.setTokens(accessToken, refreshToken);

    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get<User>("/web/auth/profile");
    return response.data;
  },

  logout(): void {
    tokenManager.clearTokens();
  },
};

export interface User {
  id: number;
  phone: string;
  fullName: string | null;
  avatar: string | null;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

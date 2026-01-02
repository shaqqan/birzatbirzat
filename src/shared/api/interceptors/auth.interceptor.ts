import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { tokenManager } from "../token";

export function authInterceptor(api: AxiosInstance) {
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = tokenManager.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
}

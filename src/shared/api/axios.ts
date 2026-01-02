import axios from "axios";
import { tokenManager } from "./token";
import { authInterceptor } from "./interceptors/auth.interceptor";
import { refreshInterceptor } from "./interceptors/refresh.interceptor";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Apply interceptors
authInterceptor(api);
refreshInterceptor(api, API_URL, tokenManager);

export { API_URL };
export default api;

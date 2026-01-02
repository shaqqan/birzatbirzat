import { api } from "@/shared/api";
import type { Address } from "../types";

export const addressesApi = {
  async getAddresses(): Promise<Address[]> {
    const response = await api.get<Address[]>("/web/addresses");
    return response.data;
  },

  async addAddress(data: Omit<Address, "id">): Promise<Address> {
    const response = await api.post<Address>("/web/addresses", data);
    return response.data;
  },

  async updateAddress(id: number, data: Partial<Address>): Promise<Address> {
    const response = await api.put<Address>(`/web/addresses/${id}`, data);
    return response.data;
  },

  async deleteAddress(id: number): Promise<void> {
    await api.delete(`/web/addresses/${id}`);
  },

  async setDefaultAddress(id: number): Promise<void> {
    await api.put(`/web/addresses/${id}/default`);
  },
};

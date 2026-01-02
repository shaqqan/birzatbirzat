import { api } from "@/shared/api";
import type { Product, ProductsResponse } from "../types";

interface GetProductsParams {
  categoryId?: number;
  page?: number;
  limit?: number;
}

export const productsApi = {
  async getProducts(params: GetProductsParams = {}): Promise<ProductsResponse> {
    const { categoryId, page = 1, limit = 20 } = params;
    const queryParams = new URLSearchParams();
    
    if (categoryId) queryParams.set("categoryId", String(categoryId));
    queryParams.set("page", String(page));
    queryParams.set("limit", String(limit));

    const response = await api.get<ProductsResponse>(`/web/products?${queryParams}`);
    return response.data;
  },

  async getProduct(id: number): Promise<Product> {
    const response = await api.get<Product>(`/web/products/${id}`);
    return response.data;
  },

  async getSliderBanners(): Promise<Banner[]> {
    const response = await api.get("/web/banners/slider");
    return response.data;
  },
};

interface Banner {
  id: string;
  image: string;
  title: Record<string, string> | null;
  link: string | null;
}

import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../api/products.api";
import type { Product, ProductsResponse, Banner } from "../types";
import { QUERY_KEYS } from "@/shared/constants";

interface UseProductsParams {
  categoryId?: number;
  page?: number;
  limit?: number;
}

export function useProducts(params: UseProductsParams = {}) {
  const { categoryId, page = 1, limit = 20 } = params;

  return useQuery<ProductsResponse>({
    queryKey: [...QUERY_KEYS.PRODUCTS, { categoryId, page, limit }],
    queryFn: () => productsApi.getProducts(params),
  });
}

export function useProduct(id: number) {
  return useQuery<Product>({
    queryKey: QUERY_KEYS.PRODUCT(id),
    queryFn: () => productsApi.getProduct(id),
    enabled: !!id,
  });
}

export function useSliderBanners() {
  return useQuery<Banner[]>({
    queryKey: QUERY_KEYS.BANNERS,
    queryFn: productsApi.getSliderBanners,
  });
}

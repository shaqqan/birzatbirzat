import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tokenManager } from "@/shared/api";
import { addressesApi } from "../api/addresses.api";
import type { Address } from "../types";
import { QUERY_KEYS } from "@/shared/constants";

export function useAddresses() {
  return useQuery<Address[]>({
    queryKey: QUERY_KEYS.ADDRESSES,
    queryFn: addressesApi.getAddresses,
    enabled: tokenManager.isAuthenticated(),
  });
}

export function useAddAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Address, "id">) => addressesApi.addAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADDRESSES });
    },
  });
}

export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Address> }) =>
      addressesApi.updateAddress(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADDRESSES });
    },
  });
}

export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => addressesApi.deleteAddress(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADDRESSES });
    },
  });
}

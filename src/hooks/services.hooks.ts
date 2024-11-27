"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { servicesService } from "@/services/services.service";
import type {
  Service,
  ServiceCreateData,
  ServiceUpdateData,
} from "@/types/service";
import { ApiError } from "@/lib/api-client";

export function useServices(params?: any) {
  const queryClient = useQueryClient();

  const {
    data: services,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services", params],
    queryFn: async () => {
      const response = await servicesService.getServices(params);
      console.log("response is");
      console.log(response.data);
      return response.data;
    },
    enabled: params !== undefined,
  });

  const createServiceMutation = useMutation<
    Service,
    ApiError,
    ServiceCreateData
  >({
    mutationFn: async (data) => {
      const response = await servicesService.createService(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });

  const updateServiceMutation = useMutation<
    Service,
    ApiError,
    { id: number; data: ServiceUpdateData }
  >({
    mutationFn: async ({ id, data }) => {
      const response = await servicesService.updateService(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });

  const deleteServiceMutation = useMutation<void, ApiError, number>({
    mutationFn: async (id) => {
      await servicesService.deleteService(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });

  return {
    services,
    isLoading,
    error,
    createService: createServiceMutation.mutate,
    updateService: updateServiceMutation.mutate,
    deleteService: deleteServiceMutation.mutate,
    isCreating: createServiceMutation.isPending,
    isCreateSuccess: createServiceMutation.isSuccess,
    isUpdating: updateServiceMutation.isPending,
    isDeleting: deleteServiceMutation.isPending,
    createError: createServiceMutation.error,
    updateError: updateServiceMutation.error,
    deleteError: deleteServiceMutation.error,
  };
}

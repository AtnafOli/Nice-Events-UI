"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/context/userContext";
import { serviceRequestService } from "@/services/service-request.service";
import type {
  ServiceRequest,
  ServiceRequestStatus,
} from "@/types/service-request";
import { ApiError } from "@/lib/api-client";

export function useServiceRequests() {
  const { user, loading: isUserLoading } = useUser();
  const queryClient = useQueryClient();

  const enabled = !isUserLoading && !!user;

  const {
    data: serviceRequests,
    isLoading: isQueryLoading,
    error,
  } = useQuery<ServiceRequest[], ApiError>({
    queryKey: ["serviceRequests", user?.role],
    queryFn: async () => {
      if (user?.role === "admin") {
        const response = await serviceRequestService.findAll();
        return response.data;
      }
      return await serviceRequestService.fetchVendorServiceRequests();
    },
    enabled: enabled,
  });

  const updateServiceRequestStatus = useMutation<
    ServiceRequest,
    ApiError,
    { id: number; status: ServiceRequestStatus }
  >({
    mutationFn: ({ id, status }) =>
      serviceRequestService.updateStatus(id, status),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["serviceRequests", user?.role],
      });
    },
  });

  return {
    serviceRequests,

    isLoading: isUserLoading || isQueryLoading,
    error,
    updateServiceRequestStatus,
  };
}

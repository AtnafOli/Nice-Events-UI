"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { featuresService } from "@/services/features.service";
import type {
  Feature,
  FeatureCreateData,
  FeatureUpdateData,
} from "@/types/features/features";
import { ApiError } from "@/lib/api-client";

export function useFeatures() {
  const queryClient = useQueryClient();

  const {
    data: features,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["features"],
    queryFn: async () => {
      const response = await featuresService.getFeatures("");
      console.log("response is");
      console.log(response.data);
      return response.data;
    },
  });

  const createFeatureMutation = useMutation<
    Feature,
    ApiError,
    FeatureCreateData
  >({
    mutationFn: async (data) => {
      const response = await featuresService.createFeature(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
    },
  });

  const updateFeatureMutation = useMutation<
    Feature,
    ApiError,
    { id: number; data: FeatureUpdateData }
  >({
    mutationFn: async ({ id, data }) => {
      const response = await featuresService.updateFeature(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
    },
  });

  const deleteFeatureMutation = useMutation<void, ApiError, number>({
    mutationFn: async (id) => {
      await featuresService.deleteFeature(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
    },
  });

  return {
    features,
    isLoading,
    error,
    createFeature: createFeatureMutation.mutate,
    updateFeature: updateFeatureMutation.mutate,
    deleteFeature: deleteFeatureMutation.mutate,
    isCreating: createFeatureMutation.isPending,
    isUpdating: updateFeatureMutation.isPending,
    isDeleting: deleteFeatureMutation.isPending,
    createError: createFeatureMutation.error,
    updateError: updateFeatureMutation.error,
    deleteError: deleteFeatureMutation.error,
  };
}

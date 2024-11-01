"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { plansService } from "@/services/plan.service";
import type { Plan, PlanCreateData, PlanUpdateData } from "@/types/plan/plan";
import { ApiError } from "@/lib/api-client";

export function usePlans() {
  const queryClient = useQueryClient();

  const {
    data: plans,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const response = await plansService.getPlans();
      return response.data;
    },
  });

  const createPlanMutation = useMutation<Plan, ApiError, PlanCreateData>({
    mutationFn: async (data) => {
      const response = await plansService.createPlan(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });

  const updatePlanMutation = useMutation<
    Plan,
    ApiError,
    { id: number; data: PlanUpdateData }
  >({
    mutationFn: async ({ id, data }) => {
      const response = await plansService.updatePlan(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });

  const deletePlanMutation = useMutation<void, ApiError, number>({
    mutationFn: async (id) => {
      await plansService.deletePlan(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });

  const togglePlanActiveMutation = useMutation<Plan, ApiError, number>({
    mutationFn: async (id) => {
      const response = await plansService.togglePlanActive(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });

  return {
    plans,
    isLoading,
    error,
    createPlan: createPlanMutation.mutate,
    updatePlan: updatePlanMutation.mutate,
    deletePlan: deletePlanMutation.mutate,
    togglePlanActive: togglePlanActiveMutation.mutate,
    isCreating: createPlanMutation.isPending,
    isUpdating: updatePlanMutation.isPending,
    isDeleting: deletePlanMutation.isPending,
    isTogglingActive: togglePlanActiveMutation.isPending,
    createError: createPlanMutation.error,
    updateError: updatePlanMutation.error,
    deleteError: deletePlanMutation.error,
    toggleError: togglePlanActiveMutation.error,
  };
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { plansService } from "@/services/plan.service";
import type {
  AddNewFeatureToPlanData,
  AddPriceToPlanData,
  Plan,
  PlanCreateData,
  PlanUpdateData,
} from "@/types/plan/plan";
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
      const response = await plansService.getPlans("?");
      return response.data;
    },
  });

  const fetchPlanByIdMutation = useMutation<any, ApiError, number>({
    mutationFn: async (id) => {
      const response = await plansService.getPlanById(id);

      console.log(response);
      return response.data;
    },
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      queryClient.setQueryData(["plan", id], data);
    },
  });

  const fetchPriceByIdMutation = useMutation<any, ApiError, number>({
    mutationFn: async (id) => {
      const response = await plansService.getPrice(`?id=${id}`);
      return response.data;
    },
    onSuccess: (data, id) => {
      queryClient.setQueryData(["price", id], data);
    },
  });

  const addFeatureToPlanMutation = useMutation<
    any,
    ApiError,
    { id: number; data: AddNewFeatureToPlanData }
  >({
    mutationFn: async ({ id, data }) => {
      const response = await plansService.addFeatureToPlan(id, data);
      return response.data;
    },
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      queryClient.invalidateQueries({ queryKey: ["plan", id] });
    },
  });

  const addPriceToPlanMutation = useMutation<
    any,
    ApiError,
    { id: number; data: AddPriceToPlanData }
  >({
    mutationFn: async ({ id, data }) => {
      const response = await plansService.addPriceToPlan(data);
      return response.data;
    },
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      queryClient.invalidateQueries({ queryKey: ["price", id] });
    },
  });

  const createPlanMutation = useMutation<Plan, ApiError, PlanCreateData>({
    mutationFn: async (data) => {
      const response = await plansService.createPlan(data);
      return response[0];
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
      return response[0];
    },
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      queryClient.invalidateQueries({ queryKey: ["plan", id] });
    },
  });

  const deletePlanMutation = useMutation<void, ApiError, number>({
    mutationFn: async (id) => {
      await plansService.deletePlan(id);
    },
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      queryClient.invalidateQueries({ queryKey: ["plan", id] });
      queryClient.invalidateQueries({ queryKey: ["price", id] });
    },
  });

  return {
    plans,
    isLoading,
    error,
    fetchPlanById: fetchPlanByIdMutation.mutate,
    fetchPriceById: fetchPriceByIdMutation.mutate,
    createPlan: createPlanMutation.mutate,
    addFeatureToPlan: addFeatureToPlanMutation.mutate,
    updatePlan: updatePlanMutation.mutate,
    deletePlan: deletePlanMutation.mutate,
    addPriceToPlan: addPriceToPlanMutation.mutate,
    isCreating: createPlanMutation.isPending,
    isUpdating: updatePlanMutation.isPending,
    isDeleting: deletePlanMutation.isPending,
    createError: createPlanMutation.error,
    updateError: updatePlanMutation.error,
    deleteError: deletePlanMutation.error,
    isFetchingPlan: fetchPlanByIdMutation.isPending,
    isFetchingPrice: fetchPriceByIdMutation.isPending,
  };
}

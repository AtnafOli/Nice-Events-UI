import api from "@/lib/api-client";
import type {
  Plan,
  PlanCreateData,
  PlanUpdateData,
  PlansResponse,
  PlanResponse,
  AddNewFeatureToPlanData,
  AddPriceToPlanData,
  PriceResponse,
} from "@/types/plan/plan";

export const plansService = {
  getPlans: async (params: any): Promise<PlansResponse> => {
    const { data } = await api.get<PlansResponse>(`/plan${params}`);
    return data;
  },

  getPrice: async (params?: any): Promise<PriceResponse> => {
    const { data } = await api.get<PriceResponse>("/prices", params);
    return data;
  },

  getPlanById: async (id: number): Promise<PlanResponse> => {
    const { data } = await api.get<PlanResponse>(`/plan?id=${id}`);
    return data;
  },

  createPlan: async (
    planData: PlanCreateData
  ): Promise<PlanResponse["data"]> => {
    const { data } = await api.post<PlanResponse["data"]>("/plan", planData);
    return data;
  },

  addFeatureToPlan: async (
    planId: number,
    featureToPlan: AddNewFeatureToPlanData
  ) => {
    const { data } = await api.post(
      `/plan/add-feature/${planId}`,
      featureToPlan
    );
    return data;
  },

  addPriceToPlan: async (featureToPlan: AddPriceToPlanData) => {
    const { data } = await api.post(`/prices`, featureToPlan);
    return data;
  },

  updatePlan: async (
    id: number,
    planData: PlanUpdateData
  ): Promise<PlanResponse["data"]> => {
    const { data } = await api.put<PlanResponse["data"]>(
      `/plan/${id}`,
      planData
    );
    return data;
  },

  deletePlan: async (id: number): Promise<void> => {
    await api.delete(`/plan/${id}`);
  },
};

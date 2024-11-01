import api from "@/lib/api-client";
import type {
  Plan,
  PlanCreateData,
  PlanUpdateData,
  PlansResponse,
  PlanResponse,
} from "@/types/plan/plan";

export const plansService = {
  getPlans: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }): Promise<PlansResponse> => {
    const { data } = await api.get<PlansResponse>("/plan", { params });
    return data;
  },

  getPlanById: async (id: number): Promise<PlanResponse> => {
    const { data } = await api.get<PlanResponse>(`/plan/${id}`);
    return data;
  },

  createPlan: async (planData: PlanCreateData): Promise<PlanResponse> => {
    const { data } = await api.post<PlanResponse>("/plan", planData);
    return data;
  },

  updatePlan: async (
    id: number,
    planData: PlanUpdateData
  ): Promise<PlanResponse> => {
    const { data } = await api.put<PlanResponse>(`/plan/${id}`, planData);
    return data;
  },

  deletePlan: async (id: number): Promise<void> => {
    await api.delete(`/plan/${id}`);
  },

  togglePlanActive: async (id: number): Promise<PlanResponse> => {
    const { data } = await api.patch<PlanResponse>(`/plan/${id}/toggle-active`);
    return data;
  },

  getPlanFeatures: async (id: number) => {
    const { data } = await api.get(`/plan/${id}/features`);
    return data;
  },

  getPlanPrices: async (id: number) => {
    const { data } = await api.get(`/plan/${id}/prices`);
    return data;
  },

  getPlanSubscriptions: async (id: number) => {
    const { data } = await api.get(`/plan/${id}/subscriptions`);
    return data;
  },
};

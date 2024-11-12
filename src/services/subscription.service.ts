import api from "@/lib/api-client";
import type {
  SubscriptionResponse,
  SubscriptionCreateData,
  SubscriptionUpdateData,
} from "@/types/subscription";

export const subscriptionService = {
  getSubscriptions: async (params?: any): Promise<SubscriptionResponse[]> => {
    const { data } = await api.get<SubscriptionResponse[]>(
      "/subscription",
      params
    );
    return data;
  },

  getSubscriptionById: async (id: number): Promise<SubscriptionResponse> => {
    const { data } = await api.get<SubscriptionResponse>(
      `/subscription?id=${id}`
    );
    return data;
  },

  initChapaPayment: async (paymentData: any): Promise<any> => {
    try {
      const response = await api.post<SubscriptionResponse>(
        `/subscription/initialize-chapa-payment`,
        paymentData
      );
      return response.data;
    } catch (error) {
      console.error("Error initializing Chapa payment:", error);
      throw error;
    }
  },

  createSubscription: async (
    subscriptionData: SubscriptionCreateData
  ): Promise<any> => {
    const { data } = await api.post<SubscriptionResponse>(
      "/subscription",
      subscriptionData
    );
    console.log(data);
    return data;
  },

  updateSubscription: async (
    id: number,
    subscriptionData: SubscriptionUpdateData
  ): Promise<SubscriptionResponse> => {
    const { data } = await api.put<SubscriptionResponse>(
      `/subscription/${id}`,
      subscriptionData
    );
    return data;
  },

  deleteSubscription: async (id: number): Promise<void> => {
    await api.delete(`/subscription/${id}`);
  },
};

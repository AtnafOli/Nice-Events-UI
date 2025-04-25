import api from "@/lib/api-client";
import {
  Review,
  CreateReview,
  ReviewResponse,
  UpdateReview,
} from "@/types/review";

export const reviewService = {
  getReviews: async (params: any): Promise<ReviewResponse["data"]> => {
    const { data } = await api.get<ReviewResponse>(`/review/service${params}`);
    return data.data;
  },
  createReview: async (reviewData: CreateReview): Promise<ReviewResponse> => {
    const { data } = await api.post<ReviewResponse>(
      "/review/service",
      reviewData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  },
  updateReview: async (
    id: number,
    reviewData: UpdateReview
  ): Promise<ReviewResponse> => {
    const { data } = await api.put<ReviewResponse>(
      `/review/service/${id}`,
      reviewData
    );
    return data;
  },
  deleteReview: async (id: number): Promise<void> => {
    await api.delete(`/review/service/${id}`);
  },
};

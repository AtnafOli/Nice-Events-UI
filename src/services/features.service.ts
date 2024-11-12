import api from "@/lib/api-client";
import {
  Feature,
  FeatureCreateData,
  FeatureUpdateData,
} from "@/types/features/features";

export type FeaturesResponse = {
  data: Feature[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export type FeatureResponse = {
  data: Feature;
};

export const featuresService = {
  getFeatures: async (params: any): Promise<FeaturesResponse> => {
    const { data } = await api.get<FeaturesResponse>("/features", params);
    return data;
  },

  getFeatureById: async (id: number): Promise<FeatureResponse> => {
    const { data } = await api.get<FeatureResponse>(`/features/${id}`);
    return data;
  },

  createFeature: async (
    featureData: FeatureCreateData
  ): Promise<FeatureResponse> => {
    const { data } = await api.post<FeatureResponse>("/features", featureData);
    return data;
  },

  updateFeature: async (
    id: number,
    featureData: FeatureUpdateData
  ): Promise<FeatureResponse> => {
    const { data } = await api.put<FeatureResponse>(
      `/features/${id}`,
      featureData
    );
    return data;
  },

  deleteFeature: async (id: number): Promise<void> => {
    await api.delete(`/features/${id}`);
  },
};

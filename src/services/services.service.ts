import api from "@/lib/api-client";
import { Service, ServiceCreateData, ServiceUpdateData } from "@/types/service";

export type ServicesResponse = {
  data: Service[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export type ServiceResponse = {
  data: Service;
};

export const servicesService = {
  getServices: async (params: any): Promise<ServicesResponse> => {
    const { data } = await api.get<ServicesResponse>("/services", params);
    return data;
  },

  getServiceById: async (id: number): Promise<ServiceResponse> => {
    const { data } = await api.get<ServiceResponse>(`/services/${id}`);
    return data;
  },

  createService: async (
    serviceData: ServiceCreateData
  ): Promise<ServiceResponse> => {
    const { data } = await api.post<ServiceResponse>("/services", serviceData);
    return data;
  },

  updateService: async (
    id: number,
    serviceData: ServiceUpdateData
  ): Promise<ServiceResponse> => {
    const { data } = await api.put<ServiceResponse>(
      `/services/${id}`,
      serviceData
    );
    return data;
  },

  deleteService: async (id: number): Promise<void> => {
    await api.delete(`/services/${id}`);
  },
};

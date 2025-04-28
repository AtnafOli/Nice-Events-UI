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
    const { data } = await api.get<ServicesResponse>(`/services${params}`);
    return data;
  },

  getServiceById: async (id: number): Promise<ServiceResponse> => {
    const { data } = await api.get<ServiceResponse>(`/services/${id}`);
    return data;
  },

  getAllVenues: async (): Promise<ServicesResponse["data"]> => {
    const { data } = await api.get("/services/venues");
    return data;
  },

  getAllEventPlanners: async () => {
    const { data } = await api.get("/services/event-planners");
    return data;
  },

  getServicesByCityAndCategory: async (
    cityName: string,
    category: string
  ): Promise<ServicesResponse> => {
    const { data } = await api.get<ServicesResponse>(
      `/services/city/${cityName}/category/${category}`
    );
    console.log(data);
    return data;
  },

  searchServices: async (name: string): Promise<ServicesResponse["data"]> => {
    const { data } = await api.get<ServicesResponse>(
      `/services/live/search?q=${name}`
    );
    console.log(data);
    return data.data;
  },

  createService: async (
    serviceData: ServiceCreateData
  ): Promise<ServiceResponse> => {
    const { data } = await api.post<ServiceResponse>("/services", serviceData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

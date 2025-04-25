import api from "@/lib/api-client";
import {
  CreateServiceRequest,
  ServiceRequest,
  ServiceRequestData,
  ServiceRequestStatus,
  UpdateServiceRequest,
} from "@/types/service-request";

export const serviceRequestService = {
  create: async (data: CreateServiceRequest) => {
    console.log(data);
    const { data: serviceRequest } = await api.post<ServiceRequest>(
      "/request/service",
      data
    );
    return serviceRequest;
  },

  fetchVendorServiceRequests: async () => {
    const { data: serviceRequests } = await api.get<ServiceRequest[]>(
      "/request/service/vendor"
    );
    return serviceRequests;
  },

  findAll: async () => {
    const { data: serviceRequests } = await api.get<ServiceRequestData>(
      "/request/service"
    );
    return serviceRequests;
  },

  findOne: async (id: number) => {
    const { data: serviceRequest } = await api.get<ServiceRequest>(
      `/request/service/${id}`
    );
    return serviceRequest;
  },

  updateStatus: async (id: number, status: ServiceRequestStatus) => {
    const { data: serviceRequest } = await api.put<ServiceRequest>(
      `/request/service/${id}`,
      { status }
    );
    return serviceRequest;
  },
};

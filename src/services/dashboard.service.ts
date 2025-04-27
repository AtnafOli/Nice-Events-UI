import api from "@/lib/api-client";
import { Service } from "@/types/service";
import { ServiceRequest } from "@/types/service-request";
import { Subscription } from "react-hook-form/dist/utils/createSubject";

export const dashboardService = {
  getVendorDashBoard: async (): Promise<VendorDashboardResponse> => {
    const { data } = await api.get<VendorDashboardResponse>(
      "/dashboard/vendor",
      {
        withCredentials: true,
      }
    );

    console.log(data);

    return data;
  },
};

export interface VendorDashboardResponse {
  success: boolean;
  data: VendorDashboardData;
  error: any;
  message: string;
  timestamp: string;
  statusCode: number;
}

export interface VendorDashboardData {
  newRequests: ServiceRequest[];
  subscriptions: Subscription[];
  activeServices: Service[];
}

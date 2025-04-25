import { Service } from "../service";
import { VendorData } from "../vendor";

export interface CreateServiceRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  vendorId: number;
  serviceId: number;
  eventDate: Date;
  eventDetails: string;
}

export interface UpdateServiceRequest {
  vendorId?: number;
  requestorId?: number;
  eventDate?: Date;
  eventDetails?: string;
  status?: ServiceRequestStatus;
}

export interface ServiceRequest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  vendor: VendorData;
  service: Service;
  eventDate: Date;
  eventDetails: string;
  status: ServiceRequestStatus;
}

export interface ServiceRequestData {
  data: ServiceRequest[];
}

export enum ServiceRequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  FAILED = "FAILED",
}

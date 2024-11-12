import { ProfileData } from "../profile";
import { VendorData } from "../vendor";

export enum SubscriptionStatus {
  Pending = "pending",
  Active = "active",
  Expired = "expired",
  Canceled = "canceled",
}

export enum PaymentStatusEnum {
  Pending = "pending",
  Paid = "paid",
  Failed = "failed",
}

export interface SubscriptionResponse {
  data: SubscriptionModel[];
}

export interface SubscriptionModel {
  userId: number;
  planId: number;
  startDate: string;
  endDate: string;
  status: SubscriptionStatus;
  paymentStatus: PaymentStatusEnum;
  createdAt: string;
  updatedAt: string | null;
}

export interface SubscriptionCreateData {
  planId: number;
  priceId: number;
  startDate: string;
  profileData: ProfileData;
  vendorData: VendorData;
}

export interface SubscriptionUpdateData {
  userId?: number;
  planId?: number;
  startDate?: string;
  endDate?: string;
  status?: SubscriptionStatus;
  paymentStatus?: PaymentStatusEnum;
}

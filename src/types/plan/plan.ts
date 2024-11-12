// types/plan/plan.ts

export enum BillingCycle {
  MONTH_3 = "MONTH_3",
  MONTH_6 = "MONTH_6",
  MONTH_12 = "MONTH_12",
}

export enum FeatureValue {
  ONE = "ONE",
  TWO = "TWO",
  THREE = "THREE",
  FIVE = "FIVE",
  UNLIMITED = "UNLIMITED",
  BASIC = "BASIC",
  NONE = "NONE",
  TRUSTED_VENDOR = "TRUSTED_VENDOR",
  ELITE_VENDOR = "ELITE_VENDOR",
  NO = "NO",
  YES = "YES",
  PRIORITY = "PRIORITY",
  TOP = "TOP",
  VIP = "VIP",
  REALTIME = "REALTIME",
}

export interface Feature {
  id: number;
  name: string;
  description: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt?: string | null;
}

export interface PlanFeatureAssignment {
  id: number;
  planId: number;
  featureId: number;
  value: FeatureValue;
  feature: Feature;
}

export interface Price {
  id: number;
  planId: number;
  amount: number;
  currency: string;
  billingCycle: BillingCycle;
  discountPercentage: number;
  discountedPrice: number;
}

export interface Plan {
  id: number;
  name: string;
  description?: string | null;
  basePrice: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
  PlanFeatureAssignments: PlanFeatureAssignment[];
  Prices: Price[];
}

export interface PlanCreateData {
  name: string;
  description?: string;
  basePrice: number;
  isActive: boolean;
}

export type PlanUpdateData = Partial<PlanCreateData>;

export interface PlansResponse {
  data: Plan[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface PriceResponse {
  data: Price[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface PlanResponse {
  data: Plan[];
}

export interface AddNewFeatureToPlanData {
  planId: number;
  featureId: number;
  value: FeatureValue;
}

export interface AddPriceToPlanData {
  planId?: number;
  billingCycle: BillingCycle;
  currency: string;
  discountPercentage: number;
}

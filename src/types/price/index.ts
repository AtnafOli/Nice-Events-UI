import { Plan } from "../plan/plan";

export interface Price {
  id: number;
  amount: number;
  currency: string;
  billingCycle: string;
  discountPercentage: number;
  discountedPrice: number;
}

export interface Feature {
  id: number;
  name: string;
  value: string | boolean;
}

export interface PlanFeatureAssignment {
  id: number;
  feature: Feature;
  value: string | boolean;
}

export interface PlanProps {
  plan: Plan;
  isHighlighted?: boolean;
  selectedPrice?: Price;
  onPlanSelect?: (planId: number, priceId: number) => void;
}

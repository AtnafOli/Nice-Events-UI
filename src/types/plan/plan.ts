export type Plan = {
  id: number;
  name: string;
  description?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string | null;
};

export type PlanCreateData = {
  name: string;
  description?: string;
  isActive?: boolean;
};

export type PlanUpdateData = Partial<PlanCreateData>;

export type PlansResponse = {
  data: Plan[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export type PlanResponse = {
  data: Plan;
};

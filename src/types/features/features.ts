export interface FeaturesData {
  name: string;
  description: string;
  status?: string;
}

export interface Feature {
  id: number;
  name: string;
  description: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface FeatureCreateData {
  name: string;
  description: string;
  status: "active" | "inactive";
}

export interface FeatureUpdateData {
  name?: string;
  description?: string;
  status?: "active" | "inactive";
}

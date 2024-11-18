export interface Service {
  id: number;
  name: string;
  description: string;
  basicPrice: number;
  vendorId?: number;
  subcategory: SubCategory[];
  createdAt: string;
  updatedAt: string;
}

export interface SubCategory {
  name: string;
  description: string;
  categoryId: number;
  id: number;
}

export interface ServiceCreateData {
  name: string;
  description: string;
  basicPrice: number;
  subCategoryId: number;
}

export interface ServiceUpdateData {
  name?: string;
  description?: string;
  basicPrice?: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  subcategories: SubCategory[];
  createdAt: string;
  updatedAt: string;
}

export interface SubCategory {
  name: string;
  description: string;
  categoryId: number;
  id: number;
}

export interface CategoryCreateData {
  name: string;
  description: string;
}

export interface SubCategoryCreateData {
  name: string;
  description: string;
  categoryId: number;
}

export interface CategoryUpdateData {
  name?: string;
  description?: string;
}

export interface SubCategoryUpdateData {
  name?: string;
  description?: string;
}

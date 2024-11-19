import { ImageInterace } from "../image";

export interface Service {
  id: number;
  name: string;
  description: string;
  basicPrice: number;
  vendorId?: number;
  primaryImageIndex?: number;
  images: ImageInterace[];
  subCategory: SubCategory;
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
  category?: number;
  subCategoryId: number;
  images: File[];
  primaryImageIndex: number;
}

export interface ServiceUpdateData {
  name?: string;
  description?: string;
  basicPrice?: number;
}

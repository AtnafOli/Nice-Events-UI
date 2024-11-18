import api from "@/lib/api-client";
import {
  Category,
  CategoryCreateData,
  CategoryUpdateData,
  SubCategory,
  SubCategoryCreateData,
} from "@/types/category";

export type CategorysResponse = {
  data: Category[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export type CategoryResponse = {
  data: Category;
};

export type SubCategoryResponse = {
  data: SubCategory;
};
export const categoryService = {
  getCategorys: async (params: any): Promise<CategorysResponse> => {
    const { data } = await api.get<CategorysResponse>("/category", params);
    return data;
  },

  getCategoryById: async (id: number): Promise<CategoryResponse> => {
    const { data } = await api.get<CategoryResponse>(`/category/${id}`);
    return data;
  },

  createCategory: async (
    categoryData: CategoryCreateData
  ): Promise<CategoryResponse> => {
    const { data } = await api.post<CategoryResponse>(
      "/category",
      categoryData
    );
    return data;
  },

  addSubCategory: async (
    subCategoryData: SubCategoryCreateData
  ): Promise<SubCategoryResponse> => {
    const { data } = await api.post<SubCategoryResponse>(
      "/category/sub",
      subCategoryData
    );
    return data;
  },

  updateCategory: async (
    id: number,
    categoryData: CategoryUpdateData
  ): Promise<CategoryResponse> => {
    const { data } = await api.put<CategoryResponse>(
      `/category/${id}`,
      categoryData
    );
    return data;
  },

  deleteCategory: async (id: number): Promise<void> => {
    await api.delete(`/category/${id}`);
  },
};

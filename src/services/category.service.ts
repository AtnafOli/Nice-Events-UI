import api from "@/lib/api-client";
import {
  Category,
  CategoryCreateData,
  CategoryUpdateData,
  SubCategory,
  SubCategoryCreateData,
  SubCategoryUpdateData,
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
    const { data } = await api.get<CategorysResponse>(`/category${params}`);
    return data;
  },

  getCategoryById: async (id: number): Promise<CategoryResponse> => {
    const { data } = await api.get<CategoryResponse>(`/category?id=${id}`);
    return data;
  },

  createCategory: async (
    categoryData: CategoryCreateData
  ): Promise<CategoryResponse> => {
    const { data } = await api.post<CategoryResponse>(
      "/category",
      categoryData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  },

  getSubCategories: async () => {
    const { data } = await api.get("/category/sub");
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

  deleteSubCategory: async (id: number): Promise<void> => {
    await api.delete(`/category/sub/${id}`);
  },

  updateSubCategory: async (
    id: number,
    subCategoryData: SubCategoryUpdateData
  ): Promise<SubCategoryResponse> => {
    const { data } = await api.put<SubCategoryResponse>(
      `/category/sub/${id}`,
      subCategoryData
    );
    return data;
  },
};

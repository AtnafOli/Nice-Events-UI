"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";
import type {
  Category,
  CategoryCreateData,
  CategoryUpdateData,
  SubCategory,
  SubCategoryCreateData,
  SubCategoryUpdateData,
} from "@/types/category";
import { ApiError } from "@/lib/api-client";

export function useCategorys() {
  const queryClient = useQueryClient();

  const {
    data: categorys,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categorys"],
    queryFn: async () => {
      const response = await categoryService.getCategorys("");
      console.log("response is");
      console.log(response.data);
      return response.data;
    },
  });

  const createCategoryMutation = useMutation<
    Category,
    ApiError,
    CategoryCreateData
  >({
    mutationFn: async (data) => {
      const response = await categoryService.createCategory(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
    },
  });

  const addSubcategoryMutation = useMutation<
    SubCategory,
    ApiError,
    SubCategoryCreateData
  >({
    mutationFn: async (data) => {
      const response = await categoryService.addSubCategory(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
    },
  });

  const updateSubCategoryMutation = useMutation<
    SubCategory,
    ApiError,
    SubCategoryUpdateData
  >({
    mutationFn: async (data) => {
      const response = await categoryService.updateSubCategory(data.id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
    },
  });

  const deleteSubCategoryMutation = useMutation<void, ApiError, number>({
    mutationFn: async (id) => {
      await categoryService.deleteSubCategory(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
    },
  });

  const updateCategoryMutation = useMutation<
    Category,
    ApiError,
    { id: number; data: CategoryUpdateData }
  >({
    mutationFn: async ({ id, data }) => {
      const response = await categoryService.updateCategory(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
    },
  });

  const deleteCategoryMutation = useMutation<void, ApiError, number>({
    mutationFn: async (id) => {
      await categoryService.deleteCategory(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorys"] });
    },
  });

  return {
    categorys,
    isLoading,
    error,
    createCategory: createCategoryMutation.mutate,
    updateCategory: updateCategoryMutation.mutate,
    deleteCategory: deleteCategoryMutation.mutate,
    addSubcategory: addSubcategoryMutation.mutate,
    isCreating: createCategoryMutation.isPending,
    isUpdating: updateCategoryMutation.isPending,
    isDeleting: deleteCategoryMutation.isPending,
    createError: createCategoryMutation.error,
    updateError: updateCategoryMutation.error,
    deleteError: deleteCategoryMutation.error,
    addSubcategoryError: addSubcategoryMutation.error,
    updateSubCategory: updateSubCategoryMutation.mutate,
    deleteSubCategory: deleteSubCategoryMutation.mutate,
    updateSubCategoryError: updateSubCategoryMutation.error,
    deleteSubCategoryError: deleteSubCategoryMutation.error,
    isUpdatingSubCategory: updateSubCategoryMutation.isPending,
    isDeletingSubCategory: deleteSubCategoryMutation.isPending,
  };
}

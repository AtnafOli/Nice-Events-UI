"use server";

import { categoryService } from "@/services/category.service";
import {
  CategoryCreateData,
  CategoryUpdateData,
  SubCategoryCreateData,
} from "@/types/category";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(data: CategoryCreateData) {
  const result = await categoryService.createCategory(data);
  revalidatePath("/categories");
  return result;
}

export async function addSubCategoryAction(data: SubCategoryCreateData) {
  const result = await categoryService.addSubCategory(data);
  revalidatePath("/categories");
  return result;
}

export async function updateCategoryAction(
  id: number,
  data: CategoryUpdateData
) {
  const result = await categoryService.updateCategory(id, data);
  revalidatePath("/categories");
  return result;
}

export async function deleteCategoryAction(id: number) {
  await categoryService.deleteCategory(id);
  revalidatePath("/categories");
}

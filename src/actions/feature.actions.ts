"use server";

import { featuresService } from "@/services/features.service";
import {
  FeatureCreateData,
  FeatureUpdateData,
} from "@/types/features/features";
import { revalidatePath } from "next/cache";

export async function createFeatureAction(data: FeatureCreateData) {
  const result = await featuresService.createFeature(data);
  revalidatePath("/admin/features/manage");
  return result;
}

export async function updateFeatureAction(id: number, data: FeatureUpdateData) {
  const result = await featuresService.updateFeature(id, data);
  revalidatePath("/admin/features/manage");
  return result;
}

export async function deleteFeatureAction(id: number) {
  await featuresService.deleteFeature(id);
  revalidatePath("/admin/features/manage");
}

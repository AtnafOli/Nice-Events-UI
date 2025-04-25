import { categoryService } from "@/services/category.service";

export const getVendorServices = async (): Promise<string[]> => {
  try {
    const response = await categoryService.getSubCategories();
    console.log("raw subcategory response:", response);

    if (!response.success || !Array.isArray(response.data)) {
      console.warn("Unexpected shape for subcategories response:", response);
      return [];
    }

    const everySub: Array<{ name: string }> = response.data.flatMap(
      (item: any) => {
        if (
          typeof item.name === "string" &&
          !Array.isArray(item.subcategories)
        ) {
          return [item];
        }

        return Array.isArray(item.subcategories) ? item.subcategories : [];
      }
    );

    const names = everySub.map((sub) => sub.name);
    const unique = Array.from(new Set(names));

    console.log("vendor‐service names:", unique);
    return unique;
  } catch (err) {
    console.error("Error fetching vendor services:", err);
    return [];
  }
};

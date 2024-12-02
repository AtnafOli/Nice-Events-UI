import { categoryService } from "@/services/category.service";
import { servicesService } from "@/services/services.service";
import CategorySection from "./category_section";

export default async function Page() {
  const { data: categories } = await categoryService.getCategorys("");

  const servicesPromises = categories.map((category) =>
    servicesService.getServices(`?categoryId=${category.id}&limit=4`)
  );
  const servicesResults = await Promise.all(servicesPromises);

  const categoriesWithServices = categories.map((category, index) => ({
    ...category,
    services: servicesResults[index].data || [],
  }));

  return (
    <main className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-16">
      <div className="mx-auto">
        <div className="grid gap-12">
          {categoriesWithServices.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      </div>
    </main>
  );
}

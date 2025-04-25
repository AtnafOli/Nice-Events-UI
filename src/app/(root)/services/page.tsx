import { categoryService } from "@/services/category.service";
import { servicesService } from "@/services/services.service";
import CategorySection from "./category_section";
import FestiveHero from "./festive_hero";

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
    <div className="relative overflow-hidden">
      <FestiveHero />
      <main className="relative z-10 min-h-screen px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="space-y-32">
          {categoriesWithServices.map((category, index) => (
            <CategorySection
              key={category.id}
              category={category}
              isEven={index % 2 === 0}
            />
          ))}
        </div>

        <div className="py-32 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Create Unforgettable Moments
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our marketplace brings together the finest event services to help
              you craft memories that last a lifetime.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

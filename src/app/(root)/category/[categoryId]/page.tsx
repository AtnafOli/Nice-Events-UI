import { categoryService } from "@/services/category.service";
import { servicesService } from "@/services/services.service";
import ServicesClient from "./serviceClient";

export async function generateMetadata({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = await params;
  const {
    data: [category],
  } = await categoryService.getCategorys(`?id=${categoryId}`);

  return {
    title: { default: `${category?.name || "Services"}` },
    description: `Browse our ${category?.name} services`,
  };
}

async function ServicesPage({ params }: { params: { categoryId: string } }) {
  const { categoryId } = await params;

  const { data: services } = await servicesService.getServices(
    `?categoryId=${categoryId}`
  );

  return (
    <ServicesClient
      initialServices={services}
      categoryName={services[0]?.subCategory?.category?.name}
    />
  );
}

export default ServicesPage;

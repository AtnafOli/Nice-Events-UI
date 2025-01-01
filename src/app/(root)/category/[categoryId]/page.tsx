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

  const [categoryResponse, servicesResponse] = await Promise.all([
    categoryService.getCategorys(`?id=${categoryId}`),
    servicesService.getServices(`?categoryId=${categoryId}`),
  ]);

  const category = categoryResponse.data[0];
  const services = servicesResponse.data;

  return <ServicesClient initialServices={services} category={category} />;
}

export default ServicesPage;

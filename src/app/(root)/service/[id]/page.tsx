import { Suspense } from "react";
import { categoryService } from "@/services/category.service";
import { servicesService } from "@/services/services.service";
import ServicesClient from "./serviceClient";
import LoadingServices from "./loading";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const {
    data: [category],
  } = await categoryService.getCategorys(`?id=${id}`);

  return {
    title: `${category?.name || "Services"} | Your App Name`,
    description: `Browse our ${category?.name} services`,
  };
}

async function ServicesPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const [categoryResponse, servicesResponse] = await Promise.all([
    categoryService.getCategorys(`?id=${id}`),
    servicesService.getServices(`?categoryId=${id}`),
  ]);

  const category = categoryResponse.data[0];
  const services = servicesResponse.data;

  if (!category) {
    throw new Error("Category not found");
  }

  return (
    <Suspense fallback={<LoadingServices />}>
      <ServicesClient initialServices={services} category={category} />
    </Suspense>
  );
}

export default ServicesPage;

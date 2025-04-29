"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { categoryService } from "@/services/category.service";
import { servicesService } from "@/services/services.service";
import ServicesClient from "./serviceClient";

export default function ServicesPage() {
  const { categoryId } = useParams() as { categoryId: string };

  const [services, setServices] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: serviceData } = await servicesService.getServices(
          `?categoryId=${categoryId}`
        );
        setServices(serviceData);

        const {
          data: [category],
        } = await categoryService.getCategorys(`?id=${categoryId}`);

        setCategoryName(category?.name || "");
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  return (
    <ServicesClient initialServices={services} categoryName={categoryName} />
  );
}

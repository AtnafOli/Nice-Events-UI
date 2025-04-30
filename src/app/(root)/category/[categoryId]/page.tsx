"use client";

import React, { useEffect, useState } from "react";
import { categoryService } from "@/services/category.service";
import { servicesService } from "@/services/services.service";
import ServicesClient from "./serviceClient";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const [services, setServices] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState<string>("Services");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const resolvedParams = await params;
        const { categoryId } = resolvedParams;

        const categoryIdNum = parseInt(categoryId);
        if (isNaN(categoryIdNum)) {
          throw new Error("Invalid category ID");
        }

        const [servicesRes, categoryRes] = await Promise.all([
          servicesService.getServices(`?categoryId=${categoryId}`),
          categoryService.getCategoryById(categoryIdNum),
        ]);

        if (!isMounted) return;

        setServices(servicesRes.data || []);
        setCategoryName(categoryRes.data?.name || "Services");
      } catch (err: any) {
        if (!isMounted) return;
        console.error("Data fetch error:", err);
        setError(err.message.message || "Something went wrong");
        setServices([]);
        setCategoryName("Services");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [params]);

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-600">Loading services...</div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">{error}</div>;
  }

  return (
    <ServicesClient initialServices={services} categoryName={categoryName} />
  );
}

"use client";

import ServiceCard from "@/components/services/service_card";
import { servicesService } from "@/services/services.service";
import { categoryService } from "@/services/category.service";
import { Service } from "@/types/service";
import { Category } from "@/types/category";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight } from "lucide-react";

function ServicesPage() {
  const { id } = useParams();
  const [services, setServices] = useState<Service[] | undefined>(undefined);
  const [category, setCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<
    number | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (id) {
        try {
          const categoryData = await categoryService.getCategorys(`?id=${id}`);
          setCategory(categoryData.data[0]);

          const servicesData = await servicesService.getServices(
            `?categoryId=${id}`
          );
          setServices(servicesData.data);
        } catch (error) {
          setError("Failed to load data. Please try again later.");
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  const filteredServices = services?.filter(
    (service) =>
      selectedSubcategory === undefined ||
      service.subCategory.id == selectedSubcategory
  );

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-16">
      <div className=" mx-auto ">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="mb-8">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>Categories</span>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-gray-900">{category?.name}</span>
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900">
                {category?.name}
              </h1>
            </div>
          </div>
          <Select
            value={String(selectedSubcategory)}
            onValueChange={setSelectedSubcategory}
          >
            <SelectTrigger className="w-[240px] bg-white bg-opacity-50 shadow-md rounded-lg border border-gray-200">
              <SelectValue placeholder="Select subcategory" />
            </SelectTrigger>
            <SelectContent className="rounded-lg shadow-lg border border-gray-100">
              <SelectItem value="all">All Subcategories</SelectItem>
              {category?.subcategories?.map((subcategory) => (
                <SelectItem key={subcategory.id} value={String(subcategory.id)}>
                  {subcategory.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="loader"></div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-red-600 p-8 bg-red-50 rounded-lg shadow-md border border-red-200"
            >
              {error}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {filteredServices?.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ServiceCard
                    service={service}
                    onDelete={() => {}}
                    onEdit={() => {}}
                  />
                </motion.div>
              ))}

              {filteredServices?.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-12 text-gray-500 bg-white bg-opacity-50 rounded-lg shadow-md"
                >
                  No services found in this subcategory
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-radius: 50%;
          border-top: 4px solid #f7c795;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default ServicesPage;

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import ServiceCard from "@/components/services/service_card";
import { Service } from "@/types/service";

interface ServicesClientProps {
  initialServices: Service[];
  categoryName: string;
}

const ServicesClient: React.FC<ServicesClientProps> = ({
  initialServices,
  categoryName,
}) => {
  const [services] = useState<Service[]>(initialServices);

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-16">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="mb-8">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span>Categories</span>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-gray-900">{categoryName}</span>
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900">
                {categoryName}
              </h1>
            </div>
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {services.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}

            {services.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12 text-gray-500 bg-white bg-opacity-50 rounded-lg shadow-md"
              >
                No services found in this subcategory
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesClient;

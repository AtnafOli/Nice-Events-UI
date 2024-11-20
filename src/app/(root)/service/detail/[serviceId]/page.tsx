"use client";

import { servicesService } from "@/services/services.service";
import { Service } from "@/types/service";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImagesPart from "@/components/imagepart";

interface ServiceWithImages extends Service {
  images: { imageUrl: string }[];
}

function ServicesPage() {
  const { serviceId } = useParams();
  const [service, setService] = useState<ServiceWithImages | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (serviceId) {
        try {
          const servicesData = await servicesService.getServices(
            `?id=${serviceId}`
          );
          setService(servicesData.data[0]);
        } catch (error) {
          setError("Failed to load data. Please try again later.");
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [serviceId]);

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-20">
      <div className="mx-auto">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center h-64"
            >
              <div className="loader"></div>
              <p className="text-gray-600 text-lg mt-4">Loading...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-red-600 p-8 bg-red-50 rounded-lg shadow-md border border-red-200"
            >
              <h2 className="text-red-600 font-bold mb-2">Error</h2>
              <p>{error}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </motion.div>
          ) : (
            <div key="content">
              {service && service.images && service.images.length > 0 ? (
                <ImagesPart images={service.images} />
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500 bg-white bg-opacity-50 rounded-lg shadow-md">
                  <h2>No Services Found</h2>
                  <p>No services are available in this category.</p>
                </div>
              )}
            </div>
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

        .grid {
          gap: 1rem;
        }

        .grid > div {
          background-color: #fff;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .grid > div img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          border-radius: 0.5rem 0.5rem 0 0;
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: repeat(1, 1fr);
          }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

export default ServicesPage;

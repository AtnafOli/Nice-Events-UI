"use client";

import React, { useEffect, useState } from "react";
import { servicesService } from "@/services/services.service";
import ImagesPart from "@/components/imagepart";
import ContactForm from "./contact_form";
import VendorHeader from "./vendor_header";
import VendorDescription from "./vendor_description";
import ReviewHeaderSection from "./review_header";

export default function ServicesPage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const resolvedParams = await params;
        const { serviceId } = resolvedParams;

        if (!serviceId) {
          throw new Error("Invalid service ID");
        }

        const response = await servicesService.getServices(`?id=${serviceId}`);

        if (!isMounted) return;

        const serviceData = response?.data?.[0];
        if (!serviceData) {
          throw new Error(`No service found with ID: ${serviceId}`);
        }

        setService(serviceData);
      } catch (err: any) {
        if (!isMounted) return;
        console.error("Service fetch error:", err);
        setError(err.message || "Something went wrong");
        setService(null);
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
      <div className="p-4 text-center text-gray-600">
        Loading service details...
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">
          {error || "Service not found"}
        </h2>
        <p className="text-gray-600 mt-4">
          Please check the service ID and try again, or explore other services.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {service.images?.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            <div className="md:col-span-1">
              <ImagesPart images={service.images} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <VendorHeader
                  service={service}
                  serviceName={service.name}
                  vendorAddress={{
                    city: service.vendor?.address?.city,
                    country: service.vendor?.address?.country,
                  }}
                />
                <VendorDescription
                  description={service.description}
                  subtitle="Very Special Care for Your Wedding Gown!"
                  title="About this vendor"
                />
                <ReviewHeaderSection
                  serviceId={service.id}
                  reviewService={service.reviewService}
                />
              </div>
              <div>
                <ContactForm
                  vendorFirstName={
                    service.vendor?.user?.Profile?.firstName || ""
                  }
                  vendorLastName={service.vendor?.user?.Profile?.lastName || ""}
                  vendorProfile={service.vendor?.user?.Profile?.avatarUrl || ""}
                  vendorId={service.vendor?.user?.id!}
                  serviceId={service.id!}
                />
              </div>
            </div>
          </div>
        ) : (
          <NoServiceFound serviceId={service.id} />
        )}
      </div>
    </div>
  );
}

function NoServiceFound({ serviceId }: { serviceId: string }) {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800">
        No images found for service with ID: {serviceId}
      </h2>
      <p className="text-gray-600 mt-4">
        This service doesn't have any images available.
      </p>
    </div>
  );
}

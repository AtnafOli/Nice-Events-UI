"use client";

import { useEffect, useState, Suspense } from "react";
import { servicesService } from "@/services/services.service";
import ImagesPart from "@/components/imagepart";
import LoadingServices from "./loading";
import ContactForm from "./contact_form";
import VendorHeader from "./vendor_header";
import VendorDescription from "./vendor_description";
import ReviewHeaderSection from "./review_header";

function ServicesPage({ params }: { params: { serviceId: string } }) {
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { serviceId } = params;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await servicesService.getServices(`?id=${serviceId}`);
        setService(response?.data?.[0]);

        // Update document title and meta description
        if (response?.data?.[0]) {
          document.title = `${response.data[0].name || "Services"}`;
          const metaDescription = document.querySelector(
            'meta[name="description"]'
          );
          if (metaDescription) {
            metaDescription.setAttribute(
              "content",
              `Browse our ${response.data[0].name || "various"} services.`
            );
          }
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [serviceId]);

  if (loading) {
    return <LoadingServices />;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {service && service.images?.length > 0 ? (
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
                    country: service.vendor?.address.country,
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
                  vendorFirstName={service.vendor?.user?.Profile.firstName}
                  vendorLastName={service.vendor?.user?.Profile.lastName}
                  vendorProfile={service.vendor?.user?.Profile.avatarUrl}
                  vendorId={service.vendor?.user?.id!}
                  serviceId={service.id!}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800">
              No service found with ID: {serviceId}
            </h2>
            <p className="text-gray-600 mt-4">
              Please check the service ID and try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServicesPage;

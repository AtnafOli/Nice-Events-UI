import { servicesService } from "@/services/services.service";
import ImagesPart from "@/components/imagepart";
import { Suspense } from "react";
import LoadingServices from "./loading";
import ContactForm from "./contact_form";
import VendorHeader from "./vendor_header";
import VendorDescription from "./vendor_description";
import ReviewHeaderSection from "./review_header";

export async function generateMetadata({
  params,
}: {
  params: { serviceId: string };
}) {
  const { serviceId } = await params;
  const response = await servicesService.getServices(`?id=${serviceId}`);
  const service = response?.data?.[0];

  return {
    title: `${service?.name || "Services"}`,
    description: `Browse our ${service?.name || "various"} services.`,
  };
}

async function ServicesPage({ params }: { params: { serviceId: string } }) {
  const { serviceId } = await params;
  const response = await servicesService.getServices(`?id=${serviceId}`);
  const service = response?.data?.[0];

  const reviewStats = {
    rating: 4.9,
    totalReviews: 132,
    ratingDistribution: {
      5: 93,
      4: 7,
      3: 0,
      2: 0,
      1: 0,
    },
    summary:
      "Pratt Abbott is highly praised for their exceptional cleaning and preservation services for wedding gowns. Reviewers highlighted the friendly and knowledgeable staff, particularly Angela, who provided outstanding customer service and prompt communication. Customers appreciated the meticulous cleaning process and attention to detail, with many noting the beautiful presentation of the preserved gowns. The timely turnaround and ability to revive vintage items were also commended, making Pratt Abbott a top choice for wedding gown care.",
  };

  return (
    <Suspense fallback={<LoadingServices />}>
      <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {service && service.images?.length > 0 ? (
            <div className="grid grid-cols-1  gap-6">
              <div className="md:col-span-1">
                <ImagesPart images={service.images} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <VendorHeader
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
                  <ReviewHeaderSection stats={reviewStats} />
                </div>
                <div>
                  <ContactForm
                    vendorFirstName={service.vendor?.user?.Profile.firstName}
                    vendorLastName={service.vendor?.user?.Profile.lastName}
                    vendorProfile={service.vendor?.user?.Profile.avatarUrl}
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
    </Suspense>
  );
}

export default ServicesPage;

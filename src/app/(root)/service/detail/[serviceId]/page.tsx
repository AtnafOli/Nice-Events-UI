import { servicesService } from "@/services/services.service";
import ImagesPart from "@/components/imagepart";
import { Suspense } from "react";
import LoadingServices from "./loading";

export async function generateMetadata({
  params,
}: {
  params: { serviceId: string };
}) {
  const { serviceId } = params;
  const response = await servicesService.getServices(`?id=${serviceId}`);
  const service = response?.data?.[0];

  return {
    title: `${service?.name || "Services"}`,
    description: `Browse our ${service?.name || "various"} services.`,
  };
}

async function ServicesPage({ params }: { params: { serviceId: string } }) {
  const { serviceId } = params;
  const response = await servicesService.getServices(`?id=${serviceId}`);
  const service = response?.data?.[0];

  return (
    <Suspense fallback={<LoadingServices />}>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {service && service.images?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-1">
                <ImagesPart images={service.images} />
              </div>
              <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800">
                  {service.name}
                </h1>
                <p className="text-gray-600 mt-4">{service.description}</p>
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

import { servicesService } from "@/services/services.service";
import ImagesPart from "@/components/imagepart";
import { Suspense } from "react";
import LoadingServices from "./loading";

async function ServicesPage({ params }: { params: { serviceId: string } }) {
  const { serviceId } = await params;

  const { data } = await servicesService.getServices(`?id=${serviceId}`);
  let service = data[0];

  return (
    <Suspense fallback={<LoadingServices />}>
      <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-20">
        <div className="mx-auto">
          <div key="content">
            {service && service.images && service.images.length > 0 ? (
              <ImagesPart images={service.images} />
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500 bg-white bg-opacity-50 rounded-lg shadow-md">
                <h2>No Services Found with this {serviceId}</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default ServicesPage;

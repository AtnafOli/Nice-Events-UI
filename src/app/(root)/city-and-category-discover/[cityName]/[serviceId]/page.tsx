import ServiceCard from "@/components/services/service_card";
import { servicesService } from "@/services/services.service";
import React from "react";

export default async function Page({
  params,
}: {
  params: {
    cityName: string;
    serviceId: string;
  };
}) {
  const { cityName, serviceId } = await params;

  // Fetch services
  const services = await servicesService.getServicesByCityAndCategory(
    cityName,
    serviceId
  );

  return (
    <div className="container mx-auto py-12 px-24">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 capitalize">
        Discover Top Services in {cityName}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {services.data.services?.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

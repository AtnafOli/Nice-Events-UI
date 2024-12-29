import { servicesService } from "@/services/services.service";
import React from "react";

export default async function page({
  params,
}: {
  params: {
    cityName: string;
    serviceId: string;
  };
}) {
  const { cityName, serviceId } = await params;

  console.log(cityName, serviceId);
  const services = await servicesService.getServicesByCity(cityName);
  return <div>page</div>;
}

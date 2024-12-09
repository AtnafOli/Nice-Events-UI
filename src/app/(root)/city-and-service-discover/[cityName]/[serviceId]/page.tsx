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
  return <div>page</div>;
}

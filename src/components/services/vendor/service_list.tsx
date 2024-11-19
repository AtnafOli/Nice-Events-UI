"use client";

import React from "react";
import { useServices } from "@/hooks/services.hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ServiceCard from "../service_card";

function VendorServicesList() {
  const { services, isLoading, error } = useServices();

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-[400px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          There was an error loading the services. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!services || services.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Services</AlertTitle>
        <AlertDescription>
          There are currently no services available.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {services.map((service) => (
        <ServiceCard
          onDelete={() => {}}
          onEdit={() => {}}
          key={service.id}
          service={service}
        />
      ))}
    </div>
  );
}

export default VendorServicesList;

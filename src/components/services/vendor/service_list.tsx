"use client";

import React from "react";
import { useServices } from "@/hooks/services.hooks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ServiceCard from "../service_card";
import { useUser } from "@/context/userContext";
import { Service } from "@/types/service";

function VendorServicesList() {
  const { user } = useUser();

  const { services } = useServices(`?vendorId=${user?.Vendor.id}`);

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
      {services.map((service: Service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}

export default VendorServicesList;

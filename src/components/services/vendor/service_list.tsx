"use client";
import React, { useEffect, useState } from "react";
import { useServices } from "@/hooks/services.hooks";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ServiceCard from "../service_card";
import { useUser } from "@/context/userContext";
import { Service } from "@/types/service";

function VendorServicesList() {
  const { user } = useUser();
  const [vendorId, setVendorId] = useState<string | null>(null);

  // Effect to set vendorId once user data is available
  useEffect(() => {
    console.log("user is **************kjk");
    console.log(user);
    if (user?.Vendor?.id) {
      setVendorId(user.Vendor.id);
    }
  }, [user]); // Depend on the user object

  // Conditionally call useServices only when vendorId is available
  const {
    services,
    isLoading: isLoadingServices,
    error,
  } = useServices(`?vendorId=${vendorId}`); // Pass null or undefined if vendorId is not ready

  // Show loading while user context is initializing or vendorId is not set
  if (!user || vendorId === null) {
    return <div>Loading user information...</div>;
  }

  // Show loading state for services
  if (isLoadingServices) {
    return <div>Loading services...</div>;
  }

  // Error state
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error loading services</AlertTitle>
        {/* <AlertDescription>{error.message.message}</AlertDescription> */}
      </Alert>
    );
  }

  // Empty state
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

  // Success state
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service: Service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}

export default VendorServicesList;

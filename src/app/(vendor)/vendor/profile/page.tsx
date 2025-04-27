"use client";

import { VendorProfile } from "@/components/vendor/profile";
import { useUser } from "@/context/userContext";
import React from "react";

function page() {
  const { user } = useUser();

  return (
    <div>
      <VendorProfile vendorData={user} />
    </div>
  );
}

export default page;

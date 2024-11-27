import LoadingSpinner from "@/components/common/LoadingSpinner";
import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}

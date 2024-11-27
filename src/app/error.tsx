"use client";

import React, { useState, useEffect } from "react";

export default function ClientErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleError = (error: Error) => {
      setHasError(true);
      setErrorMessage(error.message);
    };

    window.addEventListener("error", (event) => handleError(event.error));

    return () => {
      window.removeEventListener("error", (event) => handleError(event.error));
    };
  }, []);

  if (hasError) {
    return <div>Something went wrong: {errorMessage}</div>;
  }

  return <>{children}</>;
}

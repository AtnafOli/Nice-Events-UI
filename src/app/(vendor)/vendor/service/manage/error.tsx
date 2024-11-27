"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ExclamationTriangleIcon,
  ArrowPathIcon,
  BugAntIcon,
} from "@heroicons/react/24/outline";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error caught by ErrorBoundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <ExclamationTriangleIcon className="h-6 w-6" />
            An error occurred
          </CardTitle>
          <CardDescription>
            Oops! Something went wrong. Please try the following actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error Details</AlertTitle>
            <AlertDescription className="mt-2 font-mono text-sm break-words">
              {error.message || "An unexpected error occurred."}
            </AlertDescription>
          </Alert>
          <p className="text-sm text-gray-600">
            If the problem persists, please report the issue to help us improve.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={reset}
            className="flex items-center gap-2"
          >
            <ArrowPathIcon className="h-4 w-4" />
            Try Again
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              alert("Error reported. Thank you for your feedback!")
            }
            className="flex items-center gap-2"
          >
            <BugAntIcon className="h-4 w-4" />
            Report Issue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

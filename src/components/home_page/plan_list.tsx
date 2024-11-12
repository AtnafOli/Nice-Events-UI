"use client";

import { usePlans } from "@/hooks/plan.hook";
import React, { useEffect, useState } from "react";
import PlanComponent from "./plan";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { Plan } from "@/types/plan/plan";

// Error Display Component
const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="w-full min-h-[50vh] flex items-center justify-center p-4">
    <div className="max-w-2xl w-full bg-red-50 dark:bg-red-900/10 rounded-lg p-8">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <p className="text-lg font-semibold text-red-600 dark:text-red-400">
          Failed to load plans
        </p>
        <p className="text-sm text-red-500/80 dark:text-red-400/80">
          {message}
        </p>
      </div>
    </div>
  </div>
);

// Empty State Component
const EmptyState = () => (
  <div className="w-full min-h-[50vh] flex items-center justify-center p-4">
    <div className="max-w-2xl w-full bg-muted/30 rounded-lg p-8">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <p className="text-xl font-semibold text-muted-foreground">
          No Plans Available
        </p>
        <p className="text-sm text-muted-foreground/80">
          Please check back later for available subscription plans.
        </p>
      </div>
    </div>
  </div>
);

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className={cn(
            "w-full h-[550px] rounded-xl border border-muted",
            "transform transition-all duration-300 hover:shadow-lg",
            "animate-pulse bg-muted/20"
          )}
        >
          <div className="p-6 space-y-6">
            <Skeleton className="h-8 w-2/3 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <Skeleton className="h-20 w-full" />
            <div className="space-y-4 mt-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

function PlanList() {
  const { plans, isLoading, error } = usePlans();
  const [reversePlans, setReversePlans] = useState<Plan[] | undefined>([]);

  useEffect(() => {
    if (plans) {
      setReversePlans([...plans].reverse()); // Safely reverse plans without mutating the original array
    }
  }, [plans]);

  if (error) return <ErrorDisplay message={error.message} />;
  if (isLoading) return <LoadingSkeleton />;
  if (!plans || plans.length === 0) return <EmptyState />;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reversePlans?.map((plan, index) => (
          <div
            key={plan.id}
            className={cn(
              "w-full transform transition-all duration-300",
              "hover:translate-y-[-4px]"
            )}
          >
            <PlanComponent
              plan={plan}
              isHighlighted={plan.name.toLowerCase() === "premium"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlanList;

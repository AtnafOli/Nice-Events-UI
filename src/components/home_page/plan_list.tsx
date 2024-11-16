"use client";

import { usePlans } from "@/hooks/plan.hook";
import React, { useEffect, useState } from "react";
import PlanComponent from "./plan";
import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Check, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { BillingCycle, Plan, Price } from "@/types/plan/plan";

interface CycleOption {
  value: BillingCycle;
  label: string;
}

const CYCLE_OPTIONS: CycleOption[] = [
  { value: BillingCycle.MONTH_3, label: "Quarterly" },
  { value: BillingCycle.MONTH_6, label: "Semi-Annual" },
  { value: BillingCycle.MONTH_12, label: "Annual" },
];

const EmptyState = () => (
  <div className="w-full min-h-[70vh] flex items-center justify-center p-4">
    <div className="max-w-2xl w-full bg-gradient-to-br from-primary/5 via-primary/10 to-transparent rounded-3xl p-10 md:p-16 shadow-lg border border-primary/20">
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        <div className="w-24 h-24 md:w-28 md:h-28 bg-primary/10 rounded-full flex items-center justify-center mb-6 transition-transform hover:scale-105">
          <Sparkles className="w-12 h-12 md:w-14 md:h-14 text-primary/70" />
        </div>
        <h3 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Coming Soon
        </h3>
        <p className="text-lg md:text-xl text-muted-foreground/80 max-w-lg leading-relaxed font-light">
          We’re crafting premium subscription plans designed to elevate your
          experience. Stay tuned for exclusive features and benefits.
        </p>
      </div>
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="container mx-auto px-4 md:px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className={cn(
            "w-full h-[600px] md:h-[650px] rounded-3xl border border-primary/20",
            "bg-gradient-to-br from-primary/5 via-primary/10 to-transparent",
            "transition-all duration-500 hover:shadow-lg",
            "animate-pulse"
          )}
        >
          <div className="p-6 md:p-10 space-y-8 md:space-y-10">
            <Skeleton className="h-10 md:h-12 w-2/3 mx-auto rounded-full bg-primary/10" />
            <Skeleton className="h-8 md:h-10 w-1/2 mx-auto rounded-full bg-primary/10" />
            <Skeleton className="h-24 md:h-28 w-full rounded-2xl bg-primary/10" />
            <div className="space-y-4 md:space-y-6 mt-8 md:mt-10">
              {[...Array(4)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-14 md:h-16 w-full rounded-2xl bg-primary/10"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

function PlanList() {
  const { plans, isLoading } = usePlans();
  const [reversePlans, setReversePlans] = useState<Plan[] | undefined>([]);
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>(
    BillingCycle.MONTH_3
  );
  const [selectedPrices, setSelectedPrices] = useState<Record<number, Price>>(
    {}
  );

  useEffect(() => {
    if (plans) {
      setReversePlans([...plans].reverse());
      const initialPrices: Record<number, Price> = {};
      plans.forEach((plan) => {
        const monthlyPrice = plan.Prices?.find(
          (p) => p.billingCycle === BillingCycle.MONTH_3
        );
        if (monthlyPrice) {
          initialPrices[plan.id] = monthlyPrice;
        }
      });
      setSelectedPrices(initialPrices);
    }
  }, [plans]);

  const handleCycleChange = (cycle: BillingCycle) => {
    setSelectedCycle(cycle);
    if (plans) {
      const newPrices: Record<number, Price> = {};
      plans.forEach((plan) => {
        const price = plan.Prices?.find((p) => p.billingCycle === cycle);
        if (price) {
          newPrices[plan.id] = price;
        }
      });
      setSelectedPrices(newPrices);
    }
  };

  if (isLoading) return <LoadingSkeleton />;
  if (!plans || plans.length === 0) return <EmptyState />;

  return (
    <div className="w-full mx-auto z-30 lg:px-12">
      <div className="flex flex-col items-center space-y-4 md:space-y-8 mb-6 md:mb-12">
        <div className="flex flex-col items-center space-y-4 text-center px-4">
          <h2 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent tracking-tight px-2 md:px-4">
            Elevate Your Event Business
          </h2>
          <p className="text-sm md:text-xl text-muted-foreground max-w-xl sm:max-w-2xl md:max-w-3xl leading-relaxed px-2 sm:px-4 font-light">
            Select the ideal plan to transform and scale your event services.
          </p>
        </div>

        <Tabs
          defaultValue="MONTH_3"
          value={selectedCycle}
          onValueChange={(value) => handleCycleChange(value as BillingCycle)}
          className="w-full max-w-2xl"
        >
          <TabsList className="flex w-full bg-muted/40 rounded-full border border-secondary/30 lg:p-1.5 p-0.5">
            {CYCLE_OPTIONS.map((option) => (
              <TabsTrigger
                key={option.value}
                value={option.value}
                className={cn(
                  "flex-1 text-center lg:px-4 px-2 py-2 text-sm md:text-base lg:font-medium font-light rounded-full",
                  "transition-all duration-300 ease-in-out",
                  "data-[state=active]:text-white data-[state=active]:bg-primary data-[state=active]:shadow-lg",
                  "hover:bg-primary/5 hover:shadow-md"
                )}
              >
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {reversePlans?.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "w-full transition-transform duration-300 hover:translate-y-[-6px]"
            )}
          >
            <PlanComponent
              plan={plan}
              isHighlighted={plan.name.toLowerCase() === "premium"}
              selectedPrice={selectedPrices[plan.id]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlanList;

"use client";

import { usePlans } from "@/hooks/plan.hook";
import React, { useEffect, useState } from "react";
import PlanComponent from "./plan";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { BillingCycle, Plan, PlanResponse, Price } from "@/types/plan/plan";

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
    <div className="max-w-2xl w-full bg-gradient-to-br from-primary/5 via-primary/10 to-transparent rounded-3xl p-10 md:p-16 shadow-lg border border-primary/20 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        <div className="w-24 h-24 md:w-28 md:h-28 bg-primary/10 rounded-full flex items-center justify-center mb-6 transition-transform hover:scale-105 hover:shadow-md">
          <Sparkles className="w-12 h-12 md:w-14 md:h-14 text-primary/70" />
        </div>
        <h3 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Coming Soon
        </h3>
        <p className="text-lg md:text-xl text-muted-foreground/80 max-w-lg leading-relaxed font-light">
          We're crafting premium subscription plans designed to elevate your
          experience. Stay tuned for exclusive features and benefits.
        </p>
      </div>
    </div>
  </div>
);

function PlanList({ plans }: { plans: PlanResponse["data"] }) {
  const { isLoading } = usePlans();

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

  if (!plans || plans.length === 0) return <EmptyState />;

  return (
    <div className="w-full mx-auto z-30 px-4 lg:px-12 my-12 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="flex flex-col items-center space-y-6 md:space-y-8 mb-8 md:mb-16">
        <div className="flex flex-col items-center space-y-4 text-center px-4">
          <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight px-2 md:px-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Elevate Your Event Business
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-xl sm:max-w-2xl md:max-w-3xl leading-relaxed px-2 sm:px-4 font-light">
            Select the ideal plan to transform and scale your event services
          </p>
        </div>

        <Tabs
          defaultValue="MONTH_3"
          value={selectedCycle}
          onValueChange={(value) => handleCycleChange(value as BillingCycle)}
          className="w-full max-w-md"
        >
          <TabsList className="flex w-full bg-background/80 backdrop-blur-sm rounded-full border border-border/30 p-1.5 shadow-sm">
            {CYCLE_OPTIONS.map((option) => (
              <TabsTrigger
                key={option.value}
                value={option.value}
                className={cn(
                  "flex-1 text-center px-4 py-2 text-sm md:text-base font-medium rounded-full",
                  "transition-all duration-300 ease-in-out",
                  "data-[state=active]:text-white data-[state=active]:bg-primary data-[state=active]:shadow-md",
                  "hover:bg-primary/5"
                )}
              >
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {reversePlans?.map((plan) => {
          const isPremium = plan.name.toLowerCase() === "premium";
          return (
            <div
              key={plan.id}
              className={cn(
                "w-full transition-all duration-400 hover:translate-y-[-8px]",
                isPremium && "md:mt-[-16px]"
              )}
            >
              {isPremium && (
                <div className="flex justify-center mb-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    Mostly Subscribed
                  </span>
                </div>
              )}
              <PlanComponent
                plan={plan}
                isHighlighted={isPremium}
                selectedPrice={selectedPrices[plan.id]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlanList;

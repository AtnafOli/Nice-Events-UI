"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ChevronUp, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/userContext";

interface Price {
  id: number;
  amount: number;
  currency: string;
  billingCycle: string;
  discountPercentage: number;
  discountedPrice: number;
}

interface Feature {
  id: number;
  name: string;
  value: string | boolean;
}

interface PlanFeatureAssignment {
  id: number;
  feature: Feature;
  value: string | boolean;
}

interface Plan {
  id: number;
  name: string;
  description: string;
  PlanFeatureAssignments: PlanFeatureAssignment[];
}

interface PlanProps {
  plan: Plan;
  isHighlighted?: boolean;
  selectedPrice?: Price;
  onPlanSelect?: (planId: number, priceId: number) => void;
}

export default function PlanComponent({
  plan,
  isHighlighted = false,
  selectedPrice,
  onPlanSelect,
}: PlanProps) {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const formatBillingCycle = (cycle: string): string => {
    const [_, months] = cycle.split("_");
    const monthCount = parseInt(months, 10);
    return monthCount === 12
      ? "year"
      : monthCount === 1
      ? "month"
      : `${monthCount} months`;
  };

  const calculateMonthlyPrice = (price: Price): string => {
    const months = parseInt(price.billingCycle.split("_")[1], 10);
    return (price.amount / months).toFixed(2);
  };

  const handlePlanSelection = () => {
    if (onPlanSelect && selectedPrice) {
      onPlanSelect(plan.id, selectedPrice.id);
    }

    const route = user
      ? `/plandetail?planId=${plan.id}&priceId=${selectedPrice?.id}`
      : "/sign-in";
    router.push(route);
  };

  const displayedFeatures = showAllFeatures
    ? plan.PlanFeatureAssignments
    : plan.PlanFeatureAssignments?.slice(0, 4);

  return (
    <Card
      className={cn(
        "w-full max-w-md transition-all duration-500 ease-in-out border-2 overflow-hidden",
        isHighlighted
          ? "bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-primary/70 shadow-lg"
          : "bg-white/60 hover:shadow-md border-border"
      )}
    >
      <CardHeader className="text-center space-y-2 pb-6 relative">
        <h3 className="text-3xl font-bold tracking-tight ">{plan.name}</h3>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {selectedPrice && (
          <div className="text-center space-y-2">
            <div className="flex items-baseline justify-center">
              <span className="text-4xl font-extrabold mr-2 text-primary">
                {selectedPrice.currency}
              </span>
              <span className="text-6xl font-extrabold tracking-tight text-primary">
                {selectedPrice.amount}
              </span>
              <span className="text-2xl font-medium text-muted-foreground ml-2">
                /{formatBillingCycle(selectedPrice.billingCycle)}
              </span>
            </div>
            {selectedPrice.discountPercentage > 0 && (
              <Badge
                variant="outline"
                className="bg-secondary/20 text-secondary-foreground border-secondary rounded-full px-3 py-1"
              >
                Save {selectedPrice.discountPercentage}% off regular price
              </Badge>
            )}
            <p className="text-sm text-muted-foreground">
              {selectedPrice.currency}
              {calculateMonthlyPrice(selectedPrice)} / month
            </p>
          </div>
        )}

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-center text-secondary">
            Features included
          </h4>
          <ul className="space-y-3">
            <AnimatePresence initial={false}>
              {displayedFeatures?.map((feature, index) => (
                <motion.li
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-accent-foreground" />
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-sm truncate text-card-foreground">
                          {feature.feature.name}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="bg-popover text-popover-foreground"
                      >
                        <p>{feature.feature.name}</p>
                        {feature.value && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {typeof feature.value === "boolean"
                              ? feature.value
                                ? "Included"
                                : "Not included"
                              : `${feature.value}`}
                          </p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          {plan.PlanFeatureAssignments &&
            plan.PlanFeatureAssignments.length > 4 && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-2 text-secondary hover:text-secondary-foreground hover:bg-secondary/20 transition-colors duration-300"
                onClick={() => setShowAllFeatures(!showAllFeatures)}
              >
                {showAllFeatures ? (
                  <>
                    Show less
                    <ChevronUp className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Show all features
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handlePlanSelection}
          className={cn(
            "w-full transition-all duration-300 ease-in-out text-lg font-semibold py-6 rounded-full",
            isHighlighted
              ? "bg-primary hover:from-primary/90 hover:via-accent/90 hover:to-secondary/90 text-primary-foreground"
              : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          )}
        >
          Get started
        </Button>
      </CardFooter>
    </Card>
  );
}

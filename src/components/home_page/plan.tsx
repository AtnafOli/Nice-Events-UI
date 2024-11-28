"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, ChevronUp, Zap } from "lucide-react";
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
import { PlanProps, Price } from "@/types/price";

export default function PricingPlan({
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
      : "/become-vendor";
    router.push(route);
  };

  const displayedFeatures = showAllFeatures
    ? plan.PlanFeatureAssignments
    : plan.PlanFeatureAssignments?.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card
        className={cn(
          "relative overflow-hidden transition-all duration-500 ease-in-out border-2",
          isHighlighted
            ? "bg-gradient-to-br from-primary/5 via-background to-primary/5 border-primary shadow-md md:shadow-lg"
            : "bg-white/50 hover:shadow-md border-border"
        )}
      >
        <CardHeader className="text-center space-y-2 pb-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center space-x-2"
          >
            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              {plan.name}
            </h3>
          </motion.div>
          <motion.p
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {plan.description}
          </motion.p>
        </CardHeader>
        <CardContent className="space-y-6 p-4 md:p-6">
          {selectedPrice && (
            <motion.div
              className="text-center space-y-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-baseline justify-center">
                <span className="text-lg md:text-2xl font-extrabold mr-2 text-primary">
                  {selectedPrice.currency}
                </span>
                <span className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  {selectedPrice.amount}
                </span>
                <span className="text-sm md:text-lg font-medium text-muted-foreground ml-2">
                  /{formatBillingCycle(selectedPrice.billingCycle)}
                </span>
              </div>
              {selectedPrice.discountPercentage > 0 && (
                <Badge
                  variant="outline"
                  className="bg-secondary/20 text-secondary-foreground border-secondary rounded-full px-3 py-1"
                >
                  <Zap className="w-4 h-4 mr-1 inline-block" />
                  Save {selectedPrice.discountPercentage}% off regular price
                </Badge>
              )}
              <p className="text-sm text-muted-foreground">
                {selectedPrice.currency}
                {calculateMonthlyPrice(selectedPrice)} / month
              </p>
            </motion.div>
          )}

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-center text-foreground">
              Features included
            </h4>
            <ul className="space-y-3 overflow-auto max-h-[200px] md:max-h-full">
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
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-sm truncate text-card-foreground hover:text-primary">
                            {feature.feature.name}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          className="bg-popover text-popover-foreground p-2"
                        >
                          <p className="font-medium">{feature.feature.name}</p>
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
                  className="w-full mt-2 text-primary hover:text-primary-foreground hover:bg-primary/20 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
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
        <CardFooter className="p-4 md:p-6">
          <Button
            onClick={handlePlanSelection}
            className={cn(
              "w-full transition-all duration-300 ease-in-out text-lg font-semibold py-3 md:py-4 rounded-full shadow-lg",
              "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90"
            )}
          >
            Get started
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

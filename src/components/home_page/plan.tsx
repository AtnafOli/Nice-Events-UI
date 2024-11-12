import { Plan, Price } from "@/types/plan/plan";
import React, { useState, useMemo } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Select from "react-select";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";

interface PlanProps {
  plan: Plan;
  isHighlighted?: boolean;
  onPlanSelect?: (planId: number, priceId: number) => void;
}

const PlanComponent: React.FC<PlanProps> = ({
  plan,
  isHighlighted = false,
  onPlanSelect,
}) => {
  const [selectedPriceIndex, setSelectedPriceIndex] = useState<number>(0);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const currentPrice = useMemo(
    () => plan.Prices?.[selectedPriceIndex],
    [plan.Prices, selectedPriceIndex]
  );

  const formatBillingCycle = (cycle: string): string => {
    const [_, months] = cycle.split("_");
    const monthCount = parseInt(months, 10);
    return `${monthCount} ${monthCount === 1 ? "Month" : "Months"}`;
  };

  const calculateMonthlyPrice = (price: Price): string => {
    const months = parseInt(price.billingCycle.split("_")[1], 10);
    const effectivePrice = price.amount;
    return (effectivePrice / months).toFixed(2);
  };

  const handlePlanSelection = () => {
    if (onPlanSelect && currentPrice) {
      onPlanSelect(plan.id, currentPrice.id);
    }

    const route = user
      ? `/plandetail?planId=${plan.id}&priceId=${currentPrice?.id}`
      : "/auth/signin";
    router.push(route);
  };

  const displayedFeatures = showAllFeatures
    ? plan.PlanFeatureAssignments
    : plan.PlanFeatureAssignments?.slice(0, 3);

  return (
    <Card
      className={cn(
        "w-full max-w-[450px] p-6",
        "border border-gray-200 dark:border-gray-800",
        isHighlighted && "border-primary shadow-lg"
      )}
    >
      <div className="text-center lg:mb-6 mb-2">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white lg:mb-2 mb-1">
          {plan.name}
        </h3>
        <p className="lg:text-sm text-xs text-gray-500 dark:text-gray-400">
          {plan.description}
        </p>
      </div>

      <div className="lg:space-y-4 space-y-2">
        <Select
          options={plan.Prices?.map((_, index) => ({
            value: index,
            label: formatBillingCycle(plan.Prices[index].billingCycle),
          }))}
          value={{
            value: selectedPriceIndex,
            label: formatBillingCycle(currentPrice?.billingCycle || ""),
          }}
          onChange={(option: any) => setSelectedPriceIndex(option.value)}
          className="lg:text-sm text-xs"
        />

        {currentPrice && (
          <div className="text-center">
            <div className="flex items-center justify-center lg:gap-2 gap-1.5">
              <span className="lg:text-3xl text-2xl font-bold text-gray-900 dark:text-white">
                {currentPrice.currency} {currentPrice.amount}
              </span>
              {currentPrice.discountPercentage > 0 && (
                <div className="flex flex-col items-start">
                  <span className="lg:text-sm text-xs text-gray-400 line-through">
                    {currentPrice.currency}
                    {currentPrice.amount + currentPrice.discountedPrice}
                  </span>
                  <span className="lg:text-sm text-xs font-medium text-green-500 bg-green-50 px-2 py-0.5 rounded">
                    -{currentPrice.discountPercentage}%
                  </span>
                </div>
              )}
            </div>
            <p className="lg:text-sm text-xs text-gray-500 mt-1">
              per {formatBillingCycle(currentPrice.billingCycle)}
              <span className="block text-xs">
                ({currentPrice.currency}
                {calculateMonthlyPrice(currentPrice)}/mo)
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="lg:mt-6 mt-3">
        <p className="lg:text-sm text-xs font-medium text-gray-900 dark:text-white lg:mb-4 mb-2.5">
          Features included
        </p>
        <ul className="lg:space-y-3 space-y-1.5">
          {displayedFeatures?.map((feature) => (
            <li key={feature.id} className="flex items-start lg:gap-3 gap-2">
              <Check className="lg:w-4 w-3 lg:h-4 h-3 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="lg:text-sm text-xs text-gray-600 dark:text-gray-300">
                  {feature.feature.name}
                </span>
                {feature.value && (
                  <span className="text-xs text-gray-500">
                    {typeof feature.value === "boolean"
                      ? feature.value
                        ? "Included"
                        : "Not included"
                      : `${feature.value}`}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>

        {plan.PlanFeatureAssignments &&
          plan.PlanFeatureAssignments.length > 3 && (
            <button
              onClick={() => setShowAllFeatures(!showAllFeatures)}
              className="lg:mt-4 mt-3 text-sm text-primary hover:text-primary/80 flex items-center gap-1 w-full justify-center"
            >
              {showAllFeatures ? (
                <>
                  Show less features
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show all features
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          )}
      </div>

      <Button
        onClick={handlePlanSelection}
        className={cn(
          "w-full lg:mt-6 mt-3 lg:py-2 py-1.5",
          isHighlighted
            ? "bg-primary hover:bg-primary/90"
            : "bg-gray-900 hover:bg-gray-800 dark:bg-gray-800"
        )}
      >
        Get started
      </Button>
    </Card>
  );
};

export default PlanComponent;

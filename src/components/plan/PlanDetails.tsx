import { Plan, Price } from "@/types/plan/plan";
import { Check, Clock, Gift } from "lucide-react";
import {
  formatPrice,
  getBillingCycleLabel,
  calculateMonthlyPrice,
} from "@/utils/priceUtils";
import { Card, CardContent } from "../ui/card";
import LoadingSkeleton from "../loading/loadingPriceDetail";

const PlanDetails = ({
  plan,
  selectedPrice,
  setSelectedPrice,
  isFetchingPlan,
}: {
  plan: Plan;
  selectedPrice: Price | undefined;
  setSelectedPrice: React.Dispatch<React.SetStateAction<Price | undefined>>;
  isFetchingPlan: boolean;
}) => {
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden transition-transform duration-200 hover:scale-102">
      <CardContent className="p-8 sm:p-12">
        {isFetchingPlan ? (
          <LoadingSkeleton />
        ) : (
          <>
            <div className="text-center mb-14">
              <div className="inline-block py-2 px-6 rounded-full font-semibold text-primary bg-primary/10 mb-6">
                {plan?.name} Plan
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {plan?.description}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {plan?.Prices?.map((price) => (
                <div
                  key={price.id}
                  className={`relative rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 transform ${
                    selectedPrice?.id === price.id
                      ? "border-primary bg-primary/10 shadow-lg"
                      : "border-gray-200 hover:border-gray-300 hover:scale-105 hover:shadow-md"
                  }`}
                  onClick={() => setSelectedPrice(price)}
                >
                  {price.discountPercentage > 0 && (
                    <div className="absolute -top-5 -right-5">
                      <div className="bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
                        <Gift className="w-4 h-4 inline" />{" "}
                        {price.discountPercentage}% Off
                      </div>
                    </div>
                  )}
                  <div className="text-center space-y-4">
                    <div className="font-semibold text-gray-800 dark:text-gray-200 flex justify-center items-center gap-2 text-lg">
                      <Clock className="w-5 h-5" />{" "}
                      {getBillingCycleLabel(price.billingCycle)}
                    </div>
                    <div className="space-y-2">
                      {price.discountedPrice ? (
                        <>
                          <div className="text-lg line-through text-gray-400">
                            {formatPrice(price.amount + price.discountedPrice)}
                          </div>
                          <div className="text-3xl sm:text-4xl font-semibold text-primary">
                            {formatPrice(price.amount)}
                          </div>
                        </>
                      ) : (
                        <div className="text-3xl sm:text-4xl font-semibold text-primary">
                          {formatPrice(price.amount)}
                        </div>
                      )}
                      <div className="text-sm text-gray-500 dark:text-gray-300">
                        {formatPrice(calculateMonthlyPrice(price))} /month
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PlanDetails;

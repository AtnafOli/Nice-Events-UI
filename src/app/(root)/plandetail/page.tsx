"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Lock,
  Building,
} from "lucide-react";
import { plansService } from "@/services/plan.service";
import { useRouter, useSearchParams } from "next/navigation";
import { Plan, Price } from "@/types/plan/plan";
import {
  calculateMonthlyPrice,
  formatPrice,
  getBillingCycleLabel,
} from "@/utils/priceUtils";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const PlanDetailPage = () => {
  const searchParams = useSearchParams();
  const initialPlanId = searchParams.get("planId");
  const initialPriceId = searchParams.get("priceId");

  const [plan, setPlan] = useState<Plan | undefined>(undefined);
  const [selectedPrice, setSelectedPrice] = useState<Price | undefined>(
    undefined
  );
  const [isFetchingPlan, setIsFetchingPlan] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchPlan = async () => {
      if (initialPlanId) {
        setIsFetchingPlan(true);
        try {
          const fetchedPlan = await plansService.getPlanById(
            Number(initialPlanId)
          );
          setPlan(fetchedPlan?.data[0]);
        } catch (error) {
          console.error("Error fetching plan:", error);
        } finally {
          setIsFetchingPlan(false);
        }
      }
    };
    fetchPlan();
  }, [initialPlanId]);

  useEffect(() => {
    if (initialPriceId && plan?.Prices) {
      const initialPrice = plan.Prices.find(
        (p) => p.id === Number(initialPriceId)
      );
      setSelectedPrice(initialPrice);
    }
  }, [initialPriceId, plan]);

  const handlePriceChange = (priceId: string) => {
    const newSelectedPrice = plan?.Prices?.find(
      (p) => p.id === Number(priceId)
    );
    setSelectedPrice(newSelectedPrice);
  };

  const handleContinue = () => {
    router.push(
      `/vendor-detail?priceId=${selectedPrice?.id}&planId=${plan?.id}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Building className="w-4 h-4" />
            Plan Details
          </span>
          <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Review Your Subscription
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Please review your selected plan details and preferred billing
            cycle.
          </p>
        </motion.div>

        <Card className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border-0 rounded-2xl shadow-xl">
          <CardContent className="p-8">
            {plan && (
              <div className="space-y-8">
                {/* Plan Name and Description */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {plan.description}
                  </p>
                </div>

                {/* Pricing Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Billing Cycle</h3>
                  <RadioGroup
                    defaultValue={selectedPrice?.id.toString()}
                    onValueChange={handlePriceChange}
                    className="grid gap-4"
                  >
                    {plan.Prices?.map((price) => (
                      <Label
                        key={price.id}
                        className={`relative flex cursor-pointer rounded-xl p-4 shadow-sm ${
                          selectedPrice?.id === price.id
                            ? "border-2 border-primary bg-primary/5"
                            : "border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                        }`}
                      >
                        <RadioGroupItem
                          value={price.id.toString()}
                          className="sr-only"
                        />
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <p className="font-medium text-gray-900 dark:text-white">
                                {getBillingCycleLabel(price.billingCycle)}
                              </p>
                              <p className="text-gray-500">
                                {formatPrice(
                                  calculateMonthlyPrice(price),
                                  price.currency
                                )}
                                /month
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-primary">
                              {formatPrice(price.amount, price.currency)}
                            </p>
                            {price.discountedPrice > 0 && (
                              <p className="text-sm text-green-600">
                                Save{" "}
                                {formatPrice(
                                  price.discountedPrice,
                                  price.currency
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Features List */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Included Features
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {plan?.PlanFeatureAssignments?.map((feature) => (
                      <div
                        key={feature.id}
                        className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {feature.feature.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {feature.feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedPrice && (
                  <>
                    {/* Order Summary */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                      <h3 className="text-lg font-semibold mb-4">
                        Order Summary
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300">
                            Plan Price
                          </span>
                          <span className="font-medium">
                            {formatPrice(
                              selectedPrice.amount +
                                selectedPrice.discountedPrice,
                              selectedPrice.currency
                            )}
                          </span>
                        </div>
                        {selectedPrice.discountedPrice > 0 && (
                          <div className="flex justify-between text-sm text-green-600">
                            <span>Discount</span>
                            <span>
                              -
                              {formatPrice(
                                selectedPrice.discountedPrice,
                                selectedPrice.currency
                              )}
                            </span>
                          </div>
                        )}
                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span className="text-primary">
                              {formatPrice(
                                selectedPrice.amount,
                                selectedPrice.currency
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={handleContinue}
                      className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
                    >
                      Continue to Subscription
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </>
                )}

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                    <span className="text-sm text-center text-gray-600 dark:text-gray-400">
                      Secure Payment
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <Lock className="w-6 h-6 text-primary" />
                    <span className="text-sm text-center text-gray-600 dark:text-gray-400">
                      SSL Encrypted
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <CreditCard className="w-6 h-6 text-primary" />
                    <span className="text-sm text-center text-gray-600 dark:text-gray-400">
                      Secure Checkout
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlanDetailPage;

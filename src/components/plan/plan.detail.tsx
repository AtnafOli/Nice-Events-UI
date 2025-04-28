import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import {
  DollarSign,
  Plus,
  List,
  Users,
  Edit,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import Link from "next/link";
import { Plan } from "@/types/plan/plan";
import { AddFeatureToPlanDialog } from "../../features/plan/add-feature.dialog";
import { AddPriceToPlanDialog } from "../../features/plan/add-price.dialog";

export const renderPlanDetails = (
  plan: Plan,
  featureNames: Record<string, string>
) => {
  const [isAddFeatureDialogOpen, setIsAddFeatureDialogOpen] = useState(false);
  const [isAddPriceDialogOpen, setIsAddPriceDialogOpen] = useState(false);

  return (
    <div className="w-full px-4 sm:px-2 lg:px-4">
      <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg border border-gray-100/50 dark:border-gray-700/50 backdrop-blur-sm">
        <div className="p-4 space-y-6">
          <section>
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <List className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-semibold">Plan Features</h3>
              </div>
              <Button
                onClick={() => setIsAddFeatureDialogOpen(true)}
                className="group flex items-center gap-1.5 bg-primary/90 text-white hover:bg-primary"
                size="sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Feature
              </Button>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {plan.PlanFeatureAssignments.map(
                (feature: {
                  id: Key | null | undefined;
                  featureId: string | number;
                  value:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | Promise<AwaitedReactNode>
                    | null
                    | undefined;
                }) => (
                  <div
                    key={feature.id}
                    className="group p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary/30 transition-all"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-sm font-medium truncate">
                        {featureNames[feature.featureId] || "Loading..."}
                      </h4>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      Value: {feature.value}
                    </Badge>
                  </div>
                )
              )}
            </div>
          </section>
          {/* Pricing Section */}
          <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <DollarSign className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-base font-semibold">Pricing Options</h3>
              </div>
              <Button
                onClick={() => setIsAddPriceDialogOpen(true)}
                className="group flex items-center gap-1.5 bg-primary/90 text-white hover:bg-primary"
                size="sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Price
              </Button>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {plan.Prices.map((price) => (
                <Card
                  key={price.id}
                  className="group overflow-hidden bg-white dark:bg-gray-800 hover:border-primary/30 transition-all"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="text-sm font-medium capitalize">
                        {price.billingCycle}
                      </h5>
                      {price.discountPercentage > 0 && (
                        <Badge className="text-xs bg-green-500/10 text-green-600">
                          {price.discountPercentage}% OFF
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold">
                          ${price.amount}
                        </span>
                        <span className="text-xs text-gray-500">
                          /{price.currency}
                        </span>
                      </div>
                      {price.discountPercentage > 0 && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-gray-500 line-through">
                            ${price.amount}
                          </span>
                          <span className="font-medium text-green-600">
                            ${price.discountedPrice}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
          {/* Subscriptions Link
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              href={`/plans/${plan.id}/subscriptions`}
              className="group inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80"
            >
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Users className="w-3.5 h-3.5" />
              </div>
              <span>View Subscriptions</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div> */}
        </div>
      </div>

      <AddFeatureToPlanDialog
        open={isAddFeatureDialogOpen}
        onOpenChange={setIsAddFeatureDialogOpen}
        planId={plan.id}
      />

      <AddPriceToPlanDialog
        open={isAddPriceDialogOpen}
        onOpenChange={setIsAddPriceDialogOpen}
        planId={plan.id}
      />
    </div>
  );
};

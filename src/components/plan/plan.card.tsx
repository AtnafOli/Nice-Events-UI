import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { renderPlanDetails } from "./plan.detail";
import { Plan } from "@/types/plan/plan";

export const PlanCard = ({
  plans,
  expandedPlan,
  handleExpandPlan,
  featureNames,
}: {
  plans: Plan[];
  expandedPlan: any;
  handleExpandPlan: any;
  featureNames: any;
}) => (
  <div className="sm:hidden space-y-4">
    {plans?.map((plan) => (
      <Card key={plan.id} className="p-4 space-y-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">{plan.name}</h3>
          <Badge
            className={`${
              plan.isActive
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-gray-500/10 text-gray-500"
            }`}
          >
            {plan.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">{plan.description}</p>
        <Button
          variant="outline"
          onClick={() => handleExpandPlan(plan.id)}
          className="w-full"
        >
          {expandedPlan === plan.id ? "Hide Details" : "Show Details"}
        </Button>
        {expandedPlan === plan.id && renderPlanDetails(plan, featureNames)}
      </Card>
    ))}
  </div>
);

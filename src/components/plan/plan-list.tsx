import { usePlans } from "@/hooks/plan.hook";
import { useState, useEffect } from "react";
import { LoadingState } from "../loadingState";
import { ErrorState } from "../errorState";
import { PlanTable } from "./plan-table";
import { PlanCard } from "./plan.card";
import { DeletePlanDialog } from "../../features/plan/delete-plan-dialog";
import { EditPlanDialog } from "../../features/plan/edit-plan-dialog";
import { Plan } from "@/types/plan/plan";
import { useFeatures } from "@/hooks/features.hook";

export function PlansList() {
  const { features } = useFeatures();
  const { plans, isLoading, error } = usePlans();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null);
  const [featureNames, setFeatureNames] = useState<{ [key: number]: string }>(
    {}
  );

  useEffect(() => {
    const loadFeatureNames = () => {
      const uniqueFeatureIds = new Set(
        plans?.flatMap((plan: any) =>
          plan.PlanFeatureAssignments.map((feature: any) => feature.featureId)
        )
      );

      const featureNamesMap: { [key: number]: string } = {};
      features?.forEach((feature) => {
        if (uniqueFeatureIds.has(feature.id)) {
          featureNamesMap[feature.id] = feature.name || "Unknown Feature";
        }
      });

      setFeatureNames(featureNamesMap);
    };

    if (plans) {
      loadFeatureNames();
    }
  }, [plans, features]);

  const handleExpandPlan = (planId: number) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message.m} />;
  }

  return (
    <div className="space-y-4">
      <PlanTable
        plans={plans as Plan[]}
        expandedPlan={expandedPlan}
        handleExpandPlan={handleExpandPlan}
        featureNames={featureNames}
        setSelectedPlan={setSelectedPlan}
        setIsEditDialogOpen={setIsEditDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
      />
      <PlanCard
        plans={plans as Plan[]}
        expandedPlan={expandedPlan}
        handleExpandPlan={handleExpandPlan}
        featureNames={featureNames}
      />

      {selectedPlan && (
        <EditPlanDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          planId={selectedPlan}
        />
      )}
      {selectedPlan && (
        <DeletePlanDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          planId={selectedPlan}
        />
      )}
    </div>
  );
}

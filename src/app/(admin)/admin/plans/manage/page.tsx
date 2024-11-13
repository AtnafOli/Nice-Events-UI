"use client";

import { PlansList } from "@/components/plan/plan-list";
import { CreatePlanDialog } from "@/features/plan/create-plan-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between pb-4 border-b">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      {action}
    </div>
  );
}

export default function PlansPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader
        title="Plans"
        description="Manage your subscription plans"
        action={
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Plan
          </Button>
        }
      />

      <PlansList />

      <CreatePlanDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}

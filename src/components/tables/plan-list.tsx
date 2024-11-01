"use client";

import { usePlans } from "@/hooks/plan.hook";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Pencil,
  Trash2,
  Loader2,
  ChevronDown,
  DollarSign,
  List,
  Users,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { DeletePlanDialog } from "../dialoags/delete-plan-dialog";
import { EditPlanDialog } from "../dialoags/edit-plan-dialog";
import { plansService } from "@/services/plan.service";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PlanDetails {
  features: any[];
  prices: any[];
}

export function PlansList() {
  const { plans, isLoading, error, togglePlanActive } = usePlans();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null);
  const [planDetails, setPlanDetails] = useState<Record<number, PlanDetails>>(
    {}
  );
  const [isLoadingDetails, setIsLoadingDetails] = useState<
    Record<number, boolean>
  >({});

  const fetchPlanDetails = async (planId: number) => {
    setIsLoadingDetails((prev) => ({ ...prev, [planId]: true }));
    try {
      const [features, prices] = await Promise.all([
        plansService.getPlanFeatures(planId),
        plansService.getPlanPrices(planId),
      ]);
      setPlanDetails((prev) => ({
        ...prev,
        [planId]: { features, prices },
      }));
    } catch (error) {
      console.error("Error fetching plan details:", error);
    } finally {
      setIsLoadingDetails((prev) => ({ ...prev, [planId]: false }));
    }
  };

  const handleExpandPlan = (planId: number) => {
    if (expandedPlan === planId) {
      setExpandedPlan(null);
    } else {
      setExpandedPlan(planId);
      if (!planDetails[planId]) {
        fetchPlanDetails(planId);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400">
        <p>Error loading plans: {error.message}</p>
      </div>
    );
  }

  const renderPriceCard = (price: any) => (
    <Card className="p-4 space-y-3 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <h5 className="font-medium text-sm">{price.name}</h5>
        <Badge variant={price.isPopular ? "default" : "secondary"}>
          {price.isPopular ? "Popular" : price.interval}
        </Badge>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold">${price.amount}</span>
        <span className="text-sm text-gray-500">/{price.interval}</span>
      </div>
      {price.description && (
        <p className="text-sm text-gray-500">{price.description}</p>
      )}
    </Card>
  );

  const renderPlanDetails = (planId: number) => {
    if (isLoadingDetails[planId]) {
      return (
        <div className="p-4 flex justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      );
    }

    const details = planDetails[planId];
    if (!details) return null;

    return (
      <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Features Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <List className="w-4 h-4 text-primary" />
              <h4 className="font-medium text-sm">Plan Features</h4>
            </div>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-3">
                {details.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
                  >
                    <div className="flex-1">
                      <h6 className="font-medium text-sm mb-1">
                        {feature.name}
                      </h6>
                      {feature.description && (
                        <p className="text-sm text-gray-500">
                          {feature.description}
                        </p>
                      )}
                    </div>
                    {feature.limit && (
                      <Badge variant="outline">Limit: {feature.limit}</Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Pricing Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <h4 className="font-medium text-sm">Pricing Options</h4>
            </div>
            <div className="space-y-4">
              {details.prices.map((price, index) => (
                <div key={index}>{renderPriceCard(price)}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Subscriptions Link */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            href={`/plans/${planId}/subscriptions`}
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Users className="w-4 h-4" />
            View Subscriptions
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Mobile View */}
      <div className="block sm:hidden space-y-4">
        {plans?.map((plan) => (
          <div
            key={plan.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-base">{plan.name}</h3>
                <Badge
                  onClick={() => togglePlanActive(plan.id)}
                  className={`cursor-pointer ${
                    plan.isActive
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-gray-500/10 text-gray-500"
                  }`}
                >
                  {plan.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {plan.description}
              </p>
              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleExpandPlan(plan.id)}
                >
                  {expandedPlan === plan.id ? "Hide Details" : "Show Details"}
                  <ChevronDown
                    className={`ml-2 h-4 w-4 transform transition-transform ${
                      expandedPlan === plan.id ? "rotate-180" : ""
                    }`}
                  />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedPlan(plan.id);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedPlan(plan.id);
                        setIsDeleteDialogOpen(true);
                      }}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {expandedPlan === plan.id && renderPlanDetails(plan.id)}
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block">
        <div className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="w-[70px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans?.map((plan) => (
                <>
                  <TableRow key={plan.id}>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleExpandPlan(plan.id)}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transform transition-transform ${
                            expandedPlan === plan.id ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>{plan.description}</TableCell>
                    <TableCell>
                      <Badge
                        onClick={() => togglePlanActive(plan.id)}
                        className={`cursor-pointer ${
                          plan.isActive
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-gray-500/10 text-gray-500"
                        }`}
                      >
                        {plan.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(plan.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedPlan(plan.id);
                              setIsEditDialogOpen(true);
                            }}
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedPlan(plan.id);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  {expandedPlan === plan.id && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        {renderPlanDetails(plan.id)}
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedPlan && (
        <>
          <EditPlanDialog
            planId={selectedPlan}
            open={isEditDialogOpen}
            onOpenChange={(open) => {
              setIsEditDialogOpen(open);
              if (!open) setSelectedPlan(null);
            }}
          />
          <DeletePlanDialog
            planId={selectedPlan}
            open={isDeleteDialogOpen}
            onOpenChange={(open) => {
              setIsDeleteDialogOpen(open);
              if (!open) setSelectedPlan(null);
            }}
          />
        </>
      )}
    </div>
  );
}

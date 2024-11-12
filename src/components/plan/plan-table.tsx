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
import { MoreVertical, ChevronDown } from "lucide-react";
import { renderPlanDetails } from "./plan.detail";
import React from "react";
import { Plan } from "@/types/plan/plan";

export const PlanTable = ({
  plans,
  expandedPlan,
  handleExpandPlan,
  featureNames,
  setSelectedPlan,
  setIsEditDialogOpen,
  setIsDeleteDialogOpen,
}: {
  plans: Plan[];
  expandedPlan: any;
  handleExpandPlan: any;
  featureNames: any;
  setSelectedPlan: any;
  setIsEditDialogOpen: any;
  setIsDeleteDialogOpen: any;
}) => (
  <div className="hidden sm:block">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Base Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {plans?.map((plan: Plan) => (
          <React.Fragment key={plan.id}>
            <TableRow>
              <TableCell>{plan.name}</TableCell>
              <TableCell>{plan.description}</TableCell>
              <TableCell>{plan.basePrice}</TableCell>
              <TableCell>
                <Badge
                  className={`${
                    plan.isActive
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-gray-500/10 text-gray-500"
                  }`}
                >
                  {plan.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
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
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedPlan(plan.id);
                          setIsDeleteDialogOpen(true);
                        }}
                        className="text-destructive"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
            {expandedPlan === plan.id && (
              <TableRow>
                <TableCell colSpan={5}>
                  {renderPlanDetails(plan, featureNames)}
                </TableCell>
              </TableRow>
            )}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  </div>
);

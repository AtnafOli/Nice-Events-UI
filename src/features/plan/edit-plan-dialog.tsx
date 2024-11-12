"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { usePlans } from "@/hooks/plan.hook";
import type { PlanUpdateData } from "@/types/plan/plan";

interface PlanFormData {
  name: string;
  description?: string;
  basePrice: number;
  isActive: boolean;
}

interface EditPlanDialogProps {
  planId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditPlanDialog({
  planId,
  open,
  onOpenChange,
}: EditPlanDialogProps) {
  const { plans, updatePlan, isUpdating } = usePlans();
  const [error, setError] = useState<string | null>(null);

  const plan = plans?.find((p) => p.id === planId);

  const form = useForm<PlanFormData>({
    defaultValues: {
      name: plan?.name ?? "",
      description: plan?.description ?? "",
      basePrice: plan?.basePrice,
      isActive: plan?.isActive ?? true,
    },
  });

  useEffect(() => {
    if (plan) {
      form.reset({
        name: plan.name,
        description: plan.description ?? "",
        basePrice: plan.basePrice,
        isActive: plan.isActive,
      });
    }
  }, [plan, form]);

  const onSubmit = async (data: PlanFormData) => {
    try {
      if (!data.name.trim()) {
        setError("Name is required");
        return;
      }

      updatePlan({ id: planId, data: data as PlanUpdateData });
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update plan");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Plan</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="basePrice"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Base Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      value={value}
                      onChange={(e) => onChange(Number(e.target.value))}
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Active</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {error && <p className="text-destructive text-sm">{error}</p>}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

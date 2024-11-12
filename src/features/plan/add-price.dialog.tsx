"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { usePlans } from "@/hooks/plan.hook";
import { AddPriceToPlanData, BillingCycle } from "@/types/plan/plan";

interface AddPriceToPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planId: number;
}

const BILLING_CYCLE_OPTIONS = [
  { value: "MONTH_3", label: "3 Months" },
  { value: "MONTH_6", label: "6 Months" },
  { value: "MONTH_12", label: "12 Months" },
] as const;

// type BillingCycle = (typeof BILLING_CYCLE_OPTIONS)[number]["value"];

export function AddPriceToPlanDialog({
  open,
  onOpenChange,
  planId,
}: AddPriceToPlanDialogProps) {
  const { addPriceToPlan, isCreating } = usePlans();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AddPriceToPlanData>({
    defaultValues: {
      planId: planId,
      billingCycle: BillingCycle.MONTH_3,
      currency: "",
      discountPercentage: 0,
    },
  });

  const onSubmit = async (data: AddPriceToPlanData) => {
    try {
      if (!data.currency || data.discountPercentage < 0) {
        setError(
          "Currency and discount percentage are required and must be valid."
        );
        return;
      }

      const formattedData = {
        ...data,
        discountPercentage: Math.round(Number(data.discountPercentage)),
      };

      await addPriceToPlan({
        id: planId,
        data: formattedData,
      });

      form.reset();
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add price");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Price to Plan</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="billingCycle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billing Cycle</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select billing cycle">
                          {
                            BILLING_CYCLE_OPTIONS.find(
                              (option) => option.value === field.value
                            )?.label
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {BILLING_CYCLE_OPTIONS.map(({ value, label }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter currency (e.g., ETB)"
                      {...field}
                      maxLength={3}
                      className="uppercase"
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Percentage</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter discount percentage"
                      {...field}
                      min={0}
                      max={100}
                      step={1}
                      onChange={(e) => {
                        const value = Math.min(
                          100,
                          Math.max(0, Number(e.target.value))
                        );
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-destructive text-sm">{error}</p>}

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Adding..." : "Add Price"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

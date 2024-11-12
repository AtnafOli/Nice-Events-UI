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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { usePlans } from "@/hooks/plan.hook";
import { useFeatures } from "@/hooks/features.hook";
import { AddNewFeatureToPlanData, FeatureValue } from "@/types/plan/plan";

interface AddFeatureToPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planId: number;
}

export function AddFeatureToPlanDialog({
  open,
  onOpenChange,
  planId,
}: AddFeatureToPlanDialogProps) {
  const { addFeatureToPlan, isCreating } = usePlans();
  const { features, isLoading: isLoadingFeatures } = useFeatures();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AddNewFeatureToPlanData>({
    defaultValues: {
      planId: planId,
      featureId: 0,
      value: FeatureValue.BASIC,
    },
  });

  const onSubmit = async (data: AddNewFeatureToPlanData) => {
    try {
      if (!data.featureId || !data.value) {
        setError("All fields are required");
        return;
      }

      const featureId = parseInt(String(data.featureId), 10);

      await addFeatureToPlan({ id: planId, data: { ...data, featureId } });
      form.reset();
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add feature");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Feature to Plan</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="featureId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feature</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select feature" />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoadingFeatures ? (
                          <SelectItem value="loading">
                            Loading features...
                          </SelectItem>
                        ) : (
                          features?.map((feature) => (
                            <SelectItem
                              key={feature.id}
                              value={String(feature.id)}
                            >
                              {feature.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feature Value</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select feature value" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(FeatureValue).map(([key, value]) => (
                          <SelectItem key={key} value={String(value)}>
                            {key.replace(/_/g, " ")}{" "}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
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
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Adding..." : "Add Feature"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

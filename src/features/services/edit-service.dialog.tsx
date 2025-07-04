"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { useServices } from "@/hooks/services.hooks";
import type { Service } from "@/types/service";

interface ServiceFormValues {
  name: string;
  description: string;
  basicPrice: number;
}

export function EditServiceDialog({
  service,
  isOpen,
  onClose,
}: {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { updateService, isUpdating, updateError } = useServices();
  const form = useForm<ServiceFormValues>({
    defaultValues: {
      name: service.name,
      description: service.description,
      basicPrice: service.basicPrice,
    },
  });

  // Reset form when opening/closing dialog
  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: service.name,
        description: service.description,
        basicPrice: service.basicPrice,
      });
    }
  }, [isOpen, service, form]);

  async function onSubmit(values: ServiceFormValues) {
    try {
      await updateService({
        id: service.id,
        data: {
          ...values,
          basicPrice: Number(values.basicPrice),
        },
      });
      onClose();
    } catch (error) {
      console.error("Error updating service:", error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
                pattern: {
                  value: /^[A-Za-z0-9]+(?: [A-Za-z0-9]+)*$/,
                  message:
                    "Name can only contain letters, numbers, and single spaces between words",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              rules={{
                required: "Description is required",
                minLength: {
                  value: 2,
                  message: "Description must be at least 2 characters",
                },
              }}
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
              name="basicPrice"
              rules={{
                required: "Price is required",
                min: {
                  value: 0,
                  message: "Price cannot be negative",
                },
                validate: (value) =>
                  !isNaN(value) || "Please enter a valid number",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Basic Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      min="0"
                      step="0.01"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {updateError && (
              <div className="text-red-500 text-sm">
                {updateError.message?.message ||
                  "An error occurred while updating"}
              </div>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={isUpdating || !form.formState.isDirty}
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServices } from "@/hooks/services.hooks";
import { useCategorys } from "@/hooks/category.hooks";
import { Category } from "@/types/category";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface ServiceFormValues {
  name: string;
  description: string;
  basicPrice: number;
  subCategoryId: number;
}

export function CreateServiceDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const { createService, isCreating, createError, isCreateSuccess } =
    useServices();
  const { categorys } = useCategorys();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<ServiceFormValues>({
    defaultValues: {
      name: "",
      description: "",
      basicPrice: 0,
      subCategoryId: 0,
    },
  });

  async function onSubmit(values: ServiceFormValues) {
    try {
      if (!isCreating) {
        await createService(values);
        if (!createError) {
          setTimeout(() => {
            if (isCreateSuccess) {
              setOpen(false);
              form.reset();
            }
          }, 3000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4 text-primary">
            Create Your Service
          </DialogTitle>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {isCreateSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center h-[400px]"
            >
              <CheckCircle className="w-16 h-16 text-secondary mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-primary">
                Service Created Successfully!
              </h2>
              <p className="text-muted-foreground text-center">
                Your new service is now listed on the Nice events platform.
              </p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3 }}
                className="h-1 bg-secondary mt-4"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Amen Photography"
                            {...field}
                            className="bg-input text-foreground border-border focus:border-primary"
                            disabled={isCreating}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          setSelectedCategory(Number(value))
                        }
                        disabled={isCreating}
                      >
                        <SelectTrigger className="bg-input text-foreground border-border">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {categorys?.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>

                    <FormField
                      control={form.control}
                      name="subCategoryId"
                      rules={{ required: "Subcategory is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subcategory</FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            value={field.value.toString()}
                            disabled={isCreating || !selectedCategory}
                          >
                            <SelectTrigger className="bg-input text-foreground border-border">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedCategory &&
                                categorys
                                  ?.find(
                                    (cat: Category) =>
                                      cat.id === selectedCategory
                                  )
                                  ?.subcategories.map((sub) => (
                                    <SelectItem
                                      key={sub.id}
                                      value={sub.id.toString()}
                                    >
                                      {sub.name}
                                    </SelectItem>
                                  ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
                          <Textarea
                            placeholder="Describe your service..."
                            {...field}
                            className="bg-input text-foreground border-border focus:border-primary resize-none"
                            rows={4}
                            disabled={isCreating}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="basicPrice"
                    rules={{
                      required: "Basic price is required",
                      min: {
                        value: 0,
                        message: "Price must be greater than or equal to 0",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Basic Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            className="bg-input text-foreground border-border focus:border-primary"
                            disabled={isCreating}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {createError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 text-destructive text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>{createError.message.message}</span>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Service"
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

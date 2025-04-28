"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
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
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  Star,
  Upload,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { FaMoneyBill } from "react-icons/fa";
import { ServiceCreateData } from "@/types/service";
import { useRouter } from "next/navigation";

interface ImagePreview {
  file: File;
  preview: string;
}

export default function CreateServiceDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const {
    createService,
    isCreating,
    createError,
    isCreateSuccess,
    resetCreateService,
  } = useServices();
  const { categorys } = useCategorys();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState<number>(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();

  const form = useForm<ServiceCreateData>({
    defaultValues: {
      name: "",
      description: "",
      basicPrice: 0,
      subCategoryId: 0,
      images: [],
      primaryImageIndex: 0,
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const remainingSlots = 5 - imagePreviews.length;
      const filesToAdd = acceptedFiles.slice(0, remainingSlots);

      const newPreviews = filesToAdd.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
      const currentImages = form.getValues("images") || [];
      form.setValue("images", [...currentImages, ...filesToAdd]);
    },
    [form, imagePreviews.length]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    onDrop,
    maxFiles: 5 - imagePreviews.length,
    disabled: imagePreviews.length >= 5,
  });

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    const currentImages = form.getValues("images");
    form.setValue(
      "images",
      currentImages.filter((_, i) => i !== index)
    );

    if (primaryImageIndex === index) {
      setPrimaryImageIndex(0);
      form.setValue("primaryImageIndex", 0);
    } else if (primaryImageIndex > index) {
      setPrimaryImageIndex(primaryImageIndex - 1);
      form.setValue("primaryImageIndex", primaryImageIndex - 1);
    }
  };

  const setPrimaryImage = (index: number) => {
    setPrimaryImageIndex(index);
    form.setValue("primaryImageIndex", index);
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.preview));
    };
  }, [imagePreviews]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    form.reset();
    setImagePreviews([]);
    setPrimaryImageIndex(0);
    setUploadProgress(0);
    resetCreateService();
  }, [setIsOpen, form, resetCreateService]);

  async function onSubmit(values: ServiceCreateData) {
    try {
      if (!isCreating) {
        const basicPrice = Number(values.basicPrice);
        const subCategoryId = Number(values.subCategoryId);

        if (isNaN(basicPrice) || isNaN(subCategoryId)) {
          throw new Error(
            "basicPrice and subCategoryId must be valid numbers."
          );
        }

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);

        formData.append("basicPrice", basicPrice.toString());
        formData.append("subCategoryId", subCategoryId.toString());
        formData.append(
          "primaryImageIndex",
          values.primaryImageIndex.toString()
        );

        values.images.forEach((file) => {
          formData.append("images", file);
        });

        createService(formData as unknown as ServiceCreateData);

        if (!createError) {
          if (isCreateSuccess) {
            handleClose();
            router.refresh();
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} modal={true}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-foreground border-none shadow-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-4xl font-extrabold text-center mb-8 text-primary">
            Create A New Service
          </DialogTitle>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {isCreateSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center h-[500px]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <CheckCircle className="w-24 h-24 text-secondary mb-8" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4 text-primary">
                Service Created Successfully!
              </h2>
              <p className="text-xl text-muted-foreground text-center max-w-md mb-8">
                Your masterpiece is now live on the Nice events platform. Get
                ready to shine!
              </p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3 }}
                className="h-2 bg-gradient-to-r from-primary to-secondary rounded-full"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-2 gap-8">
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
                        <FormItem className="relative">
                          <FormLabel className="absolute -top-2 left-2 px-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-xs font-medium text-muted-foreground z-10">
                            Service Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Amen Photography"
                              {...field}
                              className="bg-white border-none focus:border-primary rounded-md pt-4"
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
                        <FormItem className="relative">
                          <FormLabel className="absolute -top-2 left-2 px-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-xs font-medium text-muted-foreground z-10">
                            Basic Price
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <FaMoneyBill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                              <Input
                                type="number"
                                placeholder="0.00"
                                min={50}
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                                className="bg-white border-none focus:border-primary rounded-md pt-4 pl-10"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    <FormItem className="relative">
                      <FormLabel className="absolute -top-2 left-2 px-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-xs font-medium text-muted-foreground z-10">
                        Category
                      </FormLabel>
                      <Controller
                        name="category"
                        control={form.control}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                          <Select
                            onValueChange={(value) => {
                              setSelectedCategory(Number(value));
                              field.onChange(value);
                            }}
                            value={String(field.value)}
                          >
                            <SelectTrigger className="bg-white border-none focus:border-primary rounded-md">
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
                        )}
                      />
                      <FormMessage />
                    </FormItem>

                    <FormField
                      control={form.control}
                      name="subCategoryId"
                      rules={{ required: "Subcategory is required" }}
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel className="absolute -top-2 left-2 px-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-xs font-medium text-muted-foreground z-10">
                            Subcategory
                          </FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            value={field.value.toString()}
                            disabled={!selectedCategory}
                          >
                            <SelectTrigger className="bg-white border-none focus:border-primary rounded-md">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedCategory &&
                                categorys
                                  ?.find((cat) => cat.id === selectedCategory)
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
                      <FormItem className="relative">
                        <FormLabel className="absolute -top-2 left-2 px-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-xs font-medium text-muted-foreground z-10">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your service..."
                            {...field}
                            className="bg-white border-none focus:border-primary rounded-md resize-none min-h-[120px] pt-4"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel className="text-sm font-medium text-muted-foreground mb-2 block">
                      Service Images (Max 5)
                    </FormLabel>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-all duration-300 ${
                        isDragActive
                          ? "border-primary bg-primary/10"
                          : "border-muted hover:border-primary/50 hover:bg-primary/5"
                      } ${
                        imagePreviews.length >= 5
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <input {...getInputProps()} />
                      <div className="flex flex-col items-center justify-center py-4">
                        <Upload className="w-16 h-16 mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          {imagePreviews.length >= 5
                            ? "Maximum number of images reached"
                            : "Drag & drop images here, or click to select"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {`(${imagePreviews.length}/5 images uploaded)`}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 mt-6">
                      {imagePreviews.map((preview, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                          className="relative group"
                        >
                          <div className="relative w-full pt-[100%] rounded-md">
                            <Image
                              src={preview.preview}
                              alt={`Preview ${index + 1}`}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-md transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    onClick={() => setPrimaryImage(index)}
                                    className={`p-1.5 rounded-full ${
                                      primaryImageIndex === index
                                        ? "bg-yellow-500"
                                        : "bg-gray-500/50"
                                    } hover:bg-yellow-500 transition-colors duration-300`}
                                  >
                                    <Star className="w-4 h-4 text-white" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {primaryImageIndex === index
                                      ? "Primary Image"
                                      : "Set as Primary"}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="p-1.5 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors duration-300"
                                  >
                                    <X className="w-4 h-4 text-white" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Remove Image</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          {primaryImageIndex === index && (
                            <div className="absolute bottom-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                              Primary
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </FormItem>

                  {createError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 text-destructive text-sm bg-destructive/10 p-4 rounded-md"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{createError.message.message}</span>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 text-lg py-6 rounded-md transition-all duration-300 transform hover:scale-[1.02]"
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Service"
                    )}
                  </Button>

                  {isCreating && (
                    <div className="mt-4">
                      <Progress value={uploadProgress} className="w-full" />
                      <p className="text-center text-sm text-muted-foreground mt-2">
                        Uploading... {uploadProgress}%
                      </p>
                    </div>
                  )}
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

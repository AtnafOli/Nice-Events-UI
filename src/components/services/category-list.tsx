"use client";

import React from "react";
import CategoryCard from "./category.card";
import { useCategorys } from "@/hooks/category.hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

function CategoryList() {
  const { categorys, isLoading, error } = useCategorys();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-[200px] rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mx-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error loading categories. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-12 px-4">
      <h3 className="my-4 text-4xl font-bold">Categories</h3>

      {categorys && categorys.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorys.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <AlertCircle className="h-12 w-12 text-muted-foreground" />
          <h3 className="text-xl font-semibold">No Categories Found</h3>
          <p className="text-muted-foreground text-center max-w-[500px]">
            There are no categories available at the moment. Check back later or
            contact support if this persists.
          </p>
        </div>
      )}
    </div>
  );
}

export default CategoryList;

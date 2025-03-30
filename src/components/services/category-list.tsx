import React from "react";
import CategoryCard from "./category.card";

import { AlertCircle } from "lucide-react";
import { Category } from "@/types/category";
import motion from "framer-motion";

async function CategoryList({ categorys }: { categorys: Category[] }) {
  return (
    <div className="lg:space-y-12 space-y-4 px-2">
      <div className="space-y-5 text-center">
        <div className="text-4xl font-bold tracking-tight md:text-5xl">
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Categories{" "}
          </span>
          <span className="block mt-3 text-xl font-light text-muted-foreground">
            Explore a variety of services tailored to make every event truly
            special{" "}
          </span>
        </div>
      </div>

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

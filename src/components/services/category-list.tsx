import React from "react";
import CategoryCard from "./category.card";

import { AlertCircle } from "lucide-react";
import { Category } from "@/types/category";
import motion from "framer-motion";

async function CategoryList({ categorys }: { categorys: Category[] }) {
  return (
    <div className="space-y-2 sm:space-y-4 lg:space-y-12 p-2 sm:p-4 lg:p-24">
      <div className="space-y-5 text-center">
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Categories
          </span>
        </div>
        <p className="text-base sm:text-lg md:text-xl font-light text-muted-foreground">
          Explore a variety of services tailored to make every event truly
          special
        </p>
        <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
      </div>

      {categorys && categorys.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categorys.map((category, index) => (
            <div key={category.id}>
              <CategoryCard category={category} />
            </div>
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
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoryList;

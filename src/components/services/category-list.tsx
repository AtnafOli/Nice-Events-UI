import React from "react";
import CategoryCard from "./category.card";

import { AlertCircle } from "lucide-react";
import { Category } from "@/types/category";

async function CategoryList({ categorys }: { categorys: Category[] }) {
  return (
    <div className="lg:space-y-12 space-y-4 px-2">
      <h3 className="lg:my-4 my-2 lg:text-4xl text-xl text-center font-bold">
        Categories
      </h3>

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

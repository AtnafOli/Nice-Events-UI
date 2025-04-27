"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useCategorys } from "@/hooks/category.hooks";
import { SubCategory } from "@/types/category";

export function DeleteSubcategoryDialog({
  children,
  subcategory,
}: {
  children: React.ReactNode;
  subcategory: SubCategory;
}) {
  const { isDeleting, deleteError, deleteSubCategory } = useCategorys();

  async function handleDelete() {
    try {
      deleteSubCategory(subcategory.id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the subcategory "{subcategory.name}"
            and all its subcategories. This action cannot be undone and will
            affect all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {deleteError && (
          <div className="text-red-500 text-sm">{deleteError.message}</div>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Category"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

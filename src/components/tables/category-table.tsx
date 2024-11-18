"use client";

import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EditCategoryDialog } from "../../features/category/edit-category-dialog";
import { DeleteCategoryDialog } from "../../features/category/delete-category-dialog";
import { EditSubcategoryDialog } from "../../features/category/edit-subcategory-dialog";
import { DeleteSubcategoryDialog } from "../../features/category/delete-subcategory-dialog";
import { AddSubcategoryDialog } from "../../features/category/add-subcategory-dialog";
import { useCategorys } from "@/hooks/category.hooks";

export default function CategoryTable() {
  const { categorys, isLoading } = useCategorys();
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40 sm:h-48">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <div className="w-full h-full border-4 border-gray-200 dark:border-gray-700 rounded-full animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile View */}
      <div className="block sm:hidden">
        {!categorys?.length ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No categories found
          </div>
        ) : (
          <div className="space-y-4">
            {categorys.map((category) => (
              <Card key={category.name}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-base">{category.name}</h3>
                    <div className="flex gap-1">
                      <EditCategoryDialog category={category}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0"
                        >
                          <PencilIcon className="h-4 w-4" />
                          <span className="sr-only">Edit category</span>
                        </Button>
                      </EditCategoryDialog>
                      <DeleteCategoryDialog category={category}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-destructive"
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">Delete category</span>
                        </Button>
                      </DeleteCategoryDialog>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-between"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <span>
                        Subcategories ({category.subcategories.length})
                      </span>
                      {expandedCategories.includes(category.id) ? (
                        <ChevronUpIcon className="h-4 w-4" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                    </Button>
                    {expandedCategories.includes(category.id) && (
                      <div className="mt-2 space-y-2">
                        {category.subcategories.map((sub) => (
                          <div key={sub.id} className="bg-muted p-2 rounded-md">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{sub.name}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {sub.description}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <EditSubcategoryDialog subcategory={sub}>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 p-0"
                                  >
                                    <PencilIcon className="h-3 w-3" />
                                    <span className="sr-only">
                                      Edit subcategory
                                    </span>
                                  </Button>
                                </EditSubcategoryDialog>
                                <DeleteSubcategoryDialog subcategory={sub}>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 p-0 text-destructive"
                                  >
                                    <TrashIcon className="h-3 w-3" />
                                    <span className="sr-only">
                                      Delete subcategory
                                    </span>
                                  </Button>
                                </DeleteSubcategoryDialog>
                              </div>
                            </div>
                          </div>
                        ))}
                        <AddSubcategoryDialog categoryId={category.id}>
                          <Button size="sm" className="w-full">
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add Subcategory
                          </Button>
                        </AddSubcategoryDialog>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created: {new Date(category.createdAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Desktop View */}
      <Card className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Subcategories</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categorys?.length === 0 ? (
              <TableRow key="categories">
                <TableCell
                  colSpan={5}
                  className="text-center h-24 text-muted-foreground"
                >
                  No categories found
                </TableCell>
              </TableRow>
            ) : (
              categorys?.map((category) => (
                <>
                  <TableRow key={category.name}>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleCategory(category.id)}
                        aria-expanded={expandedCategories.includes(category.id)}
                        aria-controls={`subcategories-${category.id}`}
                      >
                        {expandedCategories.includes(category.id) ? (
                          <ChevronUpIcon className="h-4 w-4 mr-2" />
                        ) : (
                          <ChevronDownIcon className="h-4 w-4 mr-2" />
                        )}
                        Subcategories ({category.subcategories.length})
                      </Button>
                    </TableCell>
                    <TableCell>
                      {new Date(category.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <EditCategoryDialog category={category}>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <PencilIcon className="h-4 w-4" />
                            <span className="sr-only">Edit category</span>
                          </Button>
                        </EditCategoryDialog>
                        <DeleteCategoryDialog category={category}>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-destructive"
                          >
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Delete category</span>
                          </Button>
                        </DeleteCategoryDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedCategories.includes(category.id) && (
                    <TableRow id={`subcategories-${category.id}`}>
                      <TableCell colSpan={5} className="bg-muted/50">
                        <div className="py-2 px-4 space-y-2">
                          {category.subcategories.map((sub) => (
                            <div
                              key={sub.id}
                              className="flex justify-between items-center bg-background p-2 rounded-md"
                            >
                              <div>
                                <h4 className="font-medium">{sub.name}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {sub.description}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <EditSubcategoryDialog subcategory={sub}>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <PencilIcon className="h-4 w-4" />
                                    <span className="sr-only">
                                      Edit subcategory
                                    </span>
                                  </Button>
                                </EditSubcategoryDialog>
                                <DeleteSubcategoryDialog subcategory={sub}>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 text-destructive"
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                    <span className="sr-only">
                                      Delete subcategory
                                    </span>
                                  </Button>
                                </DeleteSubcategoryDialog>
                              </div>
                            </div>
                          ))}
                          <AddSubcategoryDialog categoryId={category.id}>
                            <Button size="sm" className="w-full">
                              <PlusIcon className="h-4 w-4 mr-2" />
                              Add Subcategory
                            </Button>
                          </AddSubcategoryDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

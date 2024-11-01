"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EditFeatureDialog } from "../dialoags/edit-feature-dialog";
import { DeleteFeatureDialog } from "../dialoags/delete-feature-dialog";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useFeatures } from "@/hooks/features.hook";

export function FeatureTable() {
  const { features, isLoading } = useFeatures();

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
        {!features?.length ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No features found
          </div>
        ) : (
          <div className="space-y-4">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 space-y-3 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-base">{feature.name}</h3>
                  <Badge
                    className={`${
                      feature.status === "active"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-gray-500/10 text-gray-500"
                    } px-2 py-0.5 text-xs font-medium`}
                  >
                    {feature.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-gray-500">
                    {new Date(feature.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-1">
                    <EditFeatureDialog feature={feature}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                    </EditFeatureDialog>
                    <DeleteFeatureDialog feature={feature}>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </DeleteFeatureDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                <TableHead className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Name
                </TableHead>
                <TableHead className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Description
                </TableHead>
                <TableHead className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Status
                </TableHead>
                <TableHead className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Created At
                </TableHead>
                <TableHead className="text-xs font-medium text-gray-500 dark:text-gray-400 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!features?.length ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-sm text-gray-500 dark:text-gray-400"
                  >
                    No features found
                  </TableCell>
                </TableRow>
              ) : (
                features.map((feature) => (
                  <TableRow
                    key={feature.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <TableCell className="font-medium text-sm">
                      {feature.name}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          feature.status === "active"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-gray-500/10 text-gray-500"
                        } px-2 py-0.5 text-xs font-medium`}
                      >
                        {feature.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {new Date(feature.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <EditFeatureDialog feature={feature}>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                        </EditFeatureDialog>
                        <DeleteFeatureDialog feature={feature}>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </DeleteFeatureDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

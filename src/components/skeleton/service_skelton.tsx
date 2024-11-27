"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function ServiceCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      layout
    >
      <Card className="group relative overflow-hidden rounded-2xl bg-white/50 shadow-sm">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Skeleton className="absolute inset-0" />
          <div className="absolute left-4 top-4 z-10">
            <Skeleton className="h-7 w-24" />
          </div>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <Skeleton className="h-7 w-3/4" />
            <div className="mt-2 flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="relative mt-2.5">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-1 h-4 w-full" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-1 h-7 w-28" />
            </div>
            <Skeleton className="h-9 w-28" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50" />
      </Card>
    </motion.div>
  );
}

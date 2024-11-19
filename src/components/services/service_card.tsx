"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, Edit, Trash2 } from "lucide-react";
import { Service } from "@/types/service";
import { useUser } from "@/context/userContext";
import { motion } from "framer-motion";

export default function ServiceCard({
  service,
  onEdit,
  onDelete,
}: {
  service: Service;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const { user } = useUser();
  const primaryImage = service.images[service.primaryImageIndex || 0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="group relative overflow-hidden rounded-xl bg-white/60 shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={primaryImage.imageUrl}
            alt={service.name}
            layout="fill"
            objectFit="cover"
            className="transform transition-transform duration-500 will-change-transform group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          <div className="absolute left-4 top-4">
            <Badge className="bg-white/95 px-3 py-1 text-xs font-medium text-gray-900 backdrop-blur-sm">
              {service.subCategory.name}
            </Badge>
          </div>

          {user?.role === "vendor" && (
            <div className="absolute right-4 top-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full bg-white/90 shadow-sm hover:bg-white"
                  >
                    <span className="sr-only">Open menu</span>
                    <div className="space-y-1.5">
                      <div className="h-0.5 w-3.5 bg-gray-600" />
                      <div className="h-0.5 w-3.5 bg-gray-600" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem onClick={() => onEdit(service.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(service.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        <div className="space-y-4 p-5">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-gray-900">
              {service.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-2">
              {service.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xs text-gray-500">From</p>
              <p className="text-lg font-semibold text-gray-900">
                ETB {service.basicPrice.toLocaleString()}
              </p>
            </div>

            <Button
              className="group relative rounded-full px-6 py-2 text-sm font-medium"
              variant="default"
            >
              <span className="relative flex items-center gap-2 transition-transform duration-200 group-hover:translate-x-[-4px]">
                Reserve
                <ArrowRight className="h-4 w-4 transform transition-all duration-200 group-hover:translate-x-1" />
              </span>
            </Button>
          </div>
        </div>
        <div
          className="
            absolute bottom-0 left-0 right-0 h-px
            bg-gradient-to-r from-transparent via-gray-200 to-transparent
          "
        />
        <div
          className="
            absolute bottom-0 left-8 h-1 w-12
            bg-gradient-to-r from-primary/50 to-primary opacity-0
            transition-opacity duration-300 group-hover:opacity-100
          "
        />
      </Card>
    </motion.div>
  );
}

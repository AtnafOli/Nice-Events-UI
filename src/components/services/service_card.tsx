"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, Edit, Trash2, MoreVertical, Star } from "lucide-react";
import type { Service } from "@/types/service";
import { EditServiceDialog } from "@/features/services/edit-service.dialog";
import { useServices } from "@/hooks/services.hooks";
import { DeleteServiceDialog } from "@/features/services/delete-service.dialog";
import { useUser } from "@/context/userContext";

export default function ServiceCard({ service }: { service: Service }) {
  const primaryImage = service.images[service.primaryImageIndex || 0];
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const { deleteService } = useServices();
  const { user } = useUser();

  const handleDelete = (serviceId: number) => {
    deleteService(serviceId);
  };

  const isVendor = user?.role === "vendor";
  const reviews = service.reviewService || [];
  const reviewCount = reviews.length;
  const averageRating = reviewCount
    ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
      reviewCount
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      layout
    >
      <Card
        className="group relative overflow-hidden bg-white shadow-sm border-0 rounded-2xl transition-all duration-300 hover:shadow-[0_15px_45px_-10px_rgba(200,130,120,0.15)] hover:translate-y-[-4px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="block">
          {/* Clickable Image Section */}
          <Link
            href={`/service/detail/${service.id}`}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl block"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isImageLoaded ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="h-full w-full"
            >
              {primaryImage && (
                <Image
                  src={primaryImage.imageUrl || "/placeholder.svg"}
                  alt={service.name}
                  fill
                  objectFit="cover"
                  className="transition-transform duration-500 will-change-transform group-hover:scale-105"
                  onLoad={() => setIsImageLoaded(true)}
                />
              )}
            </motion.div>

            {!isImageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gray-100" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-300" />

            <div className="absolute bottom-3 left-3 z-10">
              <Badge
                className="rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-primary shadow-sm border-0"
                variant="outline"
              >
                {service.subCategory?.name}
              </Badge>
            </div>
          </Link>

          {isVendor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-3 top-3 z-10 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm transition-colors hover:bg-white focus:ring-0 focus:ring-offset-0"
                  onClick={(e) => e.preventDefault()}
                >
                  <MoreVertical className="h-4 w-4 text-gray-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={16}
                className="w-56 animate-in fade-in-0 zoom-in-95 rounded-xl border border-gray-100 shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    setEditDialogOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" /> Edit Service
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    setDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete Service
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <EditServiceDialog
          service={service}
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
        />

        <DeleteServiceDialog
          service={service}
          onDelete={handleDelete}
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        />

        <div className="p-5">
          {/* Clickable Title Section */}
          <Link
            href={`/service/detail/${service.id}`}
            className="block cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < Math.round(averageRating)
                        ? "fill-accent text-accent"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
                <span className="text-xs font-medium text-gray-600 ml-1">
                  {averageRating.toFixed(1)} ({reviewCount})
                </span>
              </div>

              <div className="text-xs font-medium text-gray-600 bg-secondary/10 px-2 py-0.5 rounded-full">
                {service?.vendor?.address?.city || ""}
              </div>
            </div>

            <h3 className="text-lg font-semibold tracking-tight text-gray-900 mb-2 line-clamp-1 group-hover:text-primary transition-colors duration-200">
              {service.name}
            </h3>

            <p className="text-sm text-gray-600 line-clamp-2 mb-2 h-8 opacity-80">
              {service.description}
            </p>
          </Link>

          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <div>
              <p className="text-xs font-medium text-gray-500">Starting from</p>
              <p className="text-lg font-bold text-primary">
                ETB {Number(service.basicPrice).toLocaleString()}
              </p>
            </div>

            <Link href={`/service/detail/${service.id}`}>
              <Button
                variant="outline"
                size="sm"
                className="group/button flex items-center gap-1 font-medium border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/30 rounded-full px-4"
              >
                View details
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/button:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

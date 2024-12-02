"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
import { Service } from "@/types/service";
import { useUser } from "@/context/userContext";
import { EditServiceDialog } from "@/features/services/edit-service.dialog";
import { useServices } from "@/hooks/services.hooks";
import DeleteServiceDialog from "@/features/services/delete-service.dialog";

export default function ServiceCard({ service }: { service: Service }) {
  const { user } = useUser();
  const primaryImage = service.images[service.primaryImageIndex || 0];
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { deleteService, deleteError } = useServices();

  const handleDelete = (serviceId: number) => {
    deleteService(serviceId);
  };

  const rating = 4.5;
  const reviewCount = 128;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      layout
    >
      <Card
        className="group relative overflow-hidden bg-white/30 shadow-sm transition-all duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/service/detail/${service.id}`} className="block">
          <div className="relative aspect-[4/3] sm:aspect-[3/2] w-full overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: isImageLoaded ? 1 : 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={primaryImage.imageUrl}
                alt={service.name}
                fill
                objectFit="cover"
                className="transition-transform duration-700 will-change-transform group-hover:scale-105"
                onLoad={() => setIsImageLoaded(true)}
              />
            </motion.div>
            {!isImageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gray-200" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 z-10"
            >
              <Badge
                className="rounded-full bg-white/90 px-3 py-1.5 text-xs sm:text-sm font-medium text-primary shadow-md backdrop-blur-md"
                variant="outline"
              >
                {service.subCategory.name}
              </Badge>
            </motion.div>

            {user?.role === "vendor" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-2 sm:right-4 sm:top-4 z-10 h-9 w-9 rounded-full bg-white/80 backdrop-blur-md transition-colors hover:bg-white"
                  >
                    <MoreVertical className="h-5 w-5 text-gray-700" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={16}
                  className="w-60 animate-in fade-in-0 zoom-in-95"
                >
                  <DropdownMenuItem>
                    <EditServiceDialog service={service}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Edit className="h-4 w-4 mr-2" /> Edit Service
                      </Button>
                    </EditServiceDialog>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <DeleteServiceDialog
                      service={service}
                      onDelete={handleDelete}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-red-600"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete Service
                      </Button>
                    </DeleteServiceDialog>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="p-4 sm:p-6">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 mb-2">
                {service.name}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      i < Math.floor(service.rating || 2)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
                <span className="text-sm sm:text-base font-medium text-gray-600">
                  {service.rating || 2.0} ({service.reviews?.length || 19})
                </span>
              </div>
            </motion.div>

            <motion.div
              className="mt-4 flex items-center justify-between flex-wrap"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500">
                  Starting from
                </p>
                <p className="text-sm sm:text-lg font-bold text-primary">
                  ETB {service.basicPrice.toLocaleString()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="group/button flex items-center gap-1 font-medium text-primary hover:bg-primary/10 w-full sm:w-auto"
              >
                Details
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}

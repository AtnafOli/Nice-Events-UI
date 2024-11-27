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
        className="group relative overflow-hidden bg-white shadow-md transition-all duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/service/detail/${service.id}`} className="block">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: isImageLoaded ? 1 : 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={primaryImage.imageUrl}
                alt={service.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-700 will-change-transform group-hover:scale-105"
                priority
                onLoadingComplete={() => setIsImageLoaded(true)}
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
              className="absolute bottom-4 left-4 z-10"
            >
              <Badge className="bg-white/90 px-2 py-1 text-xs font-medium text-primary backdrop-blur-md">
                {service.subCategory.name}
              </Badge>
            </motion.div>

            {user?.role === "vendor" && (
              <div className="absolute right-3 top-3 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-md transition-colors hover:bg-white"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-700" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 animate-in fade-in-0 zoom-in-95"
                  >
                    <DropdownMenuItem
                      onClick={(e) => e.preventDefault()}
                      className="gap-2 py-2 transition-colors hover:bg-gray-100"
                    >
                      <EditServiceDialog service={service}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Edit className="h-4 w-4" />
                          Edit Service
                        </Button>
                      </EditServiceDialog>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="gap-2 py-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                    >
                      <DeleteServiceDialog
                        service={service}
                        onDelete={handleDelete}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="h-4 w-4" /> Delete Service
                        </Button>
                      </DeleteServiceDialog>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          <div className="p-6">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold tracking-tight text-gray-900 line-clamp-1">
                {service.name}
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {rating} ({reviewCount})
                </span>
              </div>
            </motion.div>

            <motion.p
              className="mt-3 text-sm text-gray-600 line-clamp-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {service.description}
            </motion.p>

            <motion.div
              className="mt-4 flex items-center justify-between"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Starting from
                </p>
                <p className="text-lg font-bold text-primary">
                  ETB {service.basicPrice.toLocaleString()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="group/button flex items-center gap-1 font-medium text-primary hover:bg-primary/10"
              >
                Details
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </Link>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
}

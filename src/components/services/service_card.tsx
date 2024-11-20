"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
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
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      onDelete(service.id);
    }
  };

  const rating = 4.5;
  const reviewCount = 128;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      layout
    >
      <Card className="group relative overflow-hidden rounded-2xl bg-white/50 shadow-sm transition-all duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
        <Link href={`/service/detail/${service.id}`} className="block">
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isImageLoaded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={primaryImage.imageUrl}
                alt={service.name}
                layout="fill"
                objectFit="cover"
                className="transform transition-transform duration-700 will-change-transform group-hover:scale-110"
                priority
                onLoadingComplete={() => setIsImageLoaded(true)}
              />
            </motion.div>
            {!isImageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gray-200" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute left-4 top-4 z-10"
            >
              <Badge className="bg-white/90 px-4 py-1.5 text-xs font-medium text-gray-900 backdrop-blur-md hover:bg-white/95">
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
                      className="h-9 w-9 rounded-full bg-white/80 backdrop-blur-md transition-colors hover:bg-white focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-700" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 animate-in fade-in-0 zoom-in-95"
                  >
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        onEdit(service.id);
                      }}
                      className="gap-2 py-2.5 transition-colors hover:bg-gray-100"
                    >
                      <Edit className="h-4 w-4" />
                      Edit Service
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete();
                      }}
                      className="gap-2 py-2.5 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Service
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          <div className="space-y-5 p-6">
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-gray-900 transition-colors duration-200 hover:text-primary">
                {service.name}
              </h3>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1">
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
                  {rating}
                </span>
                <span className="text-sm text-gray-500">
                  ({reviewCount} reviews)
                </span>
              </div>
              <div className="relative">
                <p
                  className={`mt-2.5 text-sm leading-relaxed text-gray-600 ${
                    !showFullDescription && "line-clamp-2"
                  }`}
                >
                  {service.description}
                </p>
                {service.description.length > 100 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowFullDescription(!showFullDescription);
                    }}
                    className="mt-1 text-sm font-medium text-primary hover:text-primary/80"
                  >
                    {showFullDescription ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">
                  Starting from
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  ETB {service.basicPrice.toLocaleString()}
                </p>
              </div>
              <Button
                variant="ghost"
                className="group/button -mr-2 flex items-center gap-1 font-medium text-primary hover:bg-primary/10"
              >
                View Details
                <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
              </Button>
            </div>
          </div>
        </Link>

        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-1/2 h-0.5 w-24 -translate-x-1/2 transform bg-primary opacity-0 transition-all duration-300 group-hover:opacity-100" />
      </Card>
    </motion.div>
  );
}

"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { Category } from "@/types/category";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CategoryCard({ category }: { category: Category }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleCategoryClick = () => {
    router.push(`/category/${category.id}`);
  };

  return (
    <Card
      className="group relative w-full aspect-[4/3] overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCategoryClick}
    >
      <div className="block h-full w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/50 z-10" />

        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.03 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {category.image ? (
            <img
              src={category.image.imageUrl}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div className="w-full h-full bg-neutral-200 dark:bg-neutral-900" />
          )}
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4 lg:p-6 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h3
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white tracking-tight mb-1 sm:mb-2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {category.name}
          </motion.h3>

          <AnimatePresence>
            {isHovered && (
              <motion.p
                className="text-xs sm:text-sm md:text-base text-white/90 mb-2 sm:mb-3 line-clamp-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {category.description}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.div
            className="inline-flex items-center space-x-1 sm:space-x-2 text-white"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-xs sm:text-sm md:text-base font-medium">
              Explore
            </span>
            <motion.div
              animate={{ x: isHovered ? 3 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </Card>
  );
}

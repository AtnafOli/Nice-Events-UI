"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { Category } from "@/types/category";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function CategoryCard({ category }: { category: Category }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group relative w-full aspect-[4/3] overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/category/${category.id}`} className="block h-full w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60 z-10" />

        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {category.image ? (
            <img
              src={category.image.imageUrl}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800" />
          )}
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h3
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            {category.name}
          </motion.h3>

          <AnimatePresence>
            {isHovered && (
              <motion.p
                className="text-sm sm:text-base text-white/90 mb-4 line-clamp-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {category.description}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.div
            className="inline-flex items-center space-x-2 text-white"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm sm:text-base font-medium">Explore</span>
            <motion.div
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </Link>
    </Card>
  );
}

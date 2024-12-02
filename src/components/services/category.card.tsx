"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { Category } from "@/types/category";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CategoryCard({ category }: { category: Category }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group relative w-full aspect-[3/2] lg:max-h-[300px] overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/category/${category.id}`} className="block h-full w-full">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {category.image ? (
            <img
              src={category.image.imageUrl}
              alt={category.name}
              className="object-cover w-full h-full transition-all duration-500 ease-in-out"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-neutral-200 dark:bg-neutral-700" />
          )}
        </motion.div>

        {/* Overlay Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-80"
          }`}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {category.name}
          </h3>

          {isHovered && (
            <motion.p
              className="text-sm sm:text-base text-white/90 line-clamp-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
            >
              {category.description}
            </motion.p>
          )}

          <motion.div
            className="inline-flex items-center space-x-2 text-white group-hover:text-white/90"
            animate={{ opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm sm:text-lg font-medium">Explore</span>
            <motion.div
              animate={{
                x: isHovered ? 8 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="lg:w-6 w-5 lg:h-6 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </Link>
    </Card>
  );
}

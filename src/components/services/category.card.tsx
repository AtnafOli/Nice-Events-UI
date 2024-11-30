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
      className="group relative w-full aspect-[3/2] max-h-[320px] overflow-hidden rounded-lg cursor-pointer shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/category/${category.id}`}>
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {category.image ? (
            <img
              src={category.image.imageUrl}
              alt={category.name}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800" />
          )}
        </motion.div>

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/50"
          style={{ opacity: isHovered ? 0.8 : 1 }}
        />

        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="lg:space-y-4 space-y-2">
            <h3 className="text-xl md:text-3xl font-bold text-white tracking-tight">
              {category.name}
            </h3>

            <motion.p
              className="text-md md:text-lg text-white/90 line-clamp-3"
              animate={{ opacity: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            >
              {category.description}
            </motion.p>

            <motion.div
              className="inline-flex items-center space-x-2 text-white"
              animate={{ opacity: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-sm md:text-lg">Explore</span>
              <motion.div
                animate={{
                  x: isHovered ? 4 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight className="lg:w-5 w-4 lg:h-5 h-4" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Link>
    </Card>
  );
}

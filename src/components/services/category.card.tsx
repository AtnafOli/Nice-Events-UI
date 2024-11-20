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
      className="group relative w-full h-[320px] overflow-hidden rounded-lg cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/service/${category.id}`}>
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.02 : 1 }}
          transition={{ duration: 0.4 }}
        >
          {category.image ? (
            <img
              src={category.image.imageUrl}
              alt={category.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800" />
          )}
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="space-y-3">
            <h3 className="text-2xl font-light text-white">{category.name}</h3>

            <motion.p
              className="text-sm text-white/80 line-clamp-2"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {category.description}
            </motion.p>

            <motion.div
              className="inline-flex items-center space-x-2 text-white"
              animate={{ opacity: isHovered ? 1 : 0.7 }}
            >
              <span className="text-sm">Explore</span>
              <motion.div
                animate={{
                  x: isHovered ? 4 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Link>
    </Card>
  );
}

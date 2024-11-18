"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { Category } from "@/types/category";
import { motion } from "framer-motion";

export default function CategoryCard({ category }: { category: Category }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="group relative w-full h-[420px] overflow-hidden rounded-radius cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ scale: isHovered ? 1.04 : 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {category.image ? (
            <img
              src={category.image.imageUrl}
              alt={category.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-secondary opacity-5" />
          )}
        </motion.div>

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-background to-transparent"
          animate={{ opacity: isHovered ? 0.97 : 0.95 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="absolute inset-0 p-8 flex flex-col justify-between">
          {/* Category Label */}
          <motion.div
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs tracking-wide text-primary"
          >
            {category.name.toUpperCase()}
          </motion.div>

          {/* Bottom Content */}
          <div className="space-y-6">
            <motion.h3
              className="text-3xl font-light text-foreground"
              animate={{ y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.4 }}
            >
              {category.name}
            </motion.h3>

            <motion.p
              className="text-sm text-muted-foreground max-w-[90%] line-clamp-2"
              animate={{
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {category.description}
            </motion.p>

            {/* Explore Button */}
            <motion.div
              className="inline-flex items-center space-x-2 text-sm text-foreground"
              animate={{
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <span className="font-light">Explore</span>
              <motion.div
                animate={{
                  x: isHovered ? 4 : 0,
                  y: isHovered ? -4 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Hover Border Effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] "
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ transformOrigin: "left" }}
        />
      </Card>
    </motion.div>
  );
}

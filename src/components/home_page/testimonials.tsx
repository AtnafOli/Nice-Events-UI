"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Selam B.",
    role: "Wedding Planner",
    content:
      "NiceEvents connected us with our dream photographer in just two days! The platform is intuitive, and the whole process felt effortless. Highly recommended for planning any special occasion.",
    rating: 5,
    avatar: "/avatars/selam.png",
  },
  {
    id: 2,
    name: "Ermias M.",
    role: "Corporate Event Manager",
    content:
      "Organizing our annual gala was seamless thanks to NiceEvents. It saved us countless hours of searching, and the quality of vendors available across Addis Ababa is truly unmatched.",
    rating: 5,
    avatar: "/avatars/ermias.png",
  },
  {
    id: 3,
    name: "Hiwot F.",
    role: "Birthday Party Host",
    content:
      "Found the most amazing decorators and a fantastic DJ for my son's birthday through NiceEvents. From start to finish, everything came together perfectly. 10/10 experience!",
    rating: 5,
    avatar: "/avatars/hiwot.png",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function SuccessStories() {
  return (
    <section className="relative py-2 md:py-28  overflow-hidden px-12">
      {/* Background Decorations */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob-slow animation-delay-2000" />
      </div>

      <div className="relative z-10 container px-4 md:px-6 mx-auto">
        <motion.div
          className="space-y-12 md:space-y-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Section Heading */}
          <motion.div
            className="max-w-2xl mx-auto text-center space-y-3"
            variants={itemVariants}
          >
            <span className="inline-block px-2.5 py-1 text-[10px] md:text-xs font-semibold tracking-wide uppercase rounded-full bg-primary/10 text-primary">
              Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Creating Unforgettable
              <span className="text-primary">Moments</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
              Hear how NiceEvents helped hosts and professionals across Ethiopia
              bring their event visions to life.
            </p>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            variants={containerVariants}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                className="h-full"
              >
                <Card className="relative flex flex-col h-full overflow-hidden border border-border/10 bg-card/80 backdrop-blur-md shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group rounded-xl">
                  {/* Quote Icon */}
                  <Quote
                    aria-hidden="true"
                    className="absolute top-3 right-3 w-10 h-10 text-primary/5 opacity-50 group-hover:text-primary/10 transition-colors"
                    strokeWidth={1}
                  />
                  <CardContent className="relative z-10 p-5 md:p-6 flex flex-col flex-grow space-y-4">
                    {/* Rating Stars */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i < testimonial.rating
                              ? "fill-primary text-primary"
                              : "fill-muted/20 text-muted-foreground/30"
                          )}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <blockquote className="flex-grow">
                      <p className="text-sm md:text-base text-foreground/90 leading-relaxed italic">
                        "{testimonial.content}"
                      </p>
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-3 border-t border-border/10">
                      {/* Optional Avatar */}
                      {/* <img src={testimonial.avatar} alt={testimonial.name} className="w-8 h-8 rounded-full object-cover bg-muted" /> */}
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-primary">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

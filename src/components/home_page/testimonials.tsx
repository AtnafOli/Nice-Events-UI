"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Selam B.",
    role: "Wedding Planner",
    content:
      "Found our dream photographer in just two days! The whole process felt effortless.",
    rating: 5,
  },
  {
    name: "Ermias M.",
    role: "Corporate Team",
    content:
      "Saved us countless hours of searching. The vendor quality here is unmatched.",
    rating: 5,
  },
  {
    name: "Hiwot F.",
    role: "Birthday Host",
    content:
      "From decorations to music, everything came together perfectly. 10/10!",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-primary/05 to-background">
      <div className="container px-4 mx-auto">
        <motion.div
          className="space-y-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          {/* Header */}
          <div className="space-y-5 text-center">
            <motion.h2
              className="text-4xl font-bold tracking-tight md:text-5xl"
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
            >
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Real Stories
              </span>
              <span className="block mt-3 text-xl text-muted-foreground">
                See how we've helped create unforgettable moments
              </span>
            </motion.h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-primary/10 hover:border-primary/20 transition-colors">
                  <CardContent className="p-6 space-y-4">
                    {/* Rating */}
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-5 h-5",
                            i < testimonial.rating
                              ? "fill-primary text-primary/80"
                              : "fill-muted text-muted"
                          )}
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-lg text-muted-foreground">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="space-y-1">
                      <div className="font-semibold text-primary">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
          >
            <p className="text-muted-foreground">
              Ready to start?{" "}
              <button
                aria-label="Get started"
                className="font-medium text-primary hover:underline"
              >
                Create your event story →
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

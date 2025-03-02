"use client";

import { motion } from "framer-motion";
import { Search, Calendar, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: Search,
    title: "Find Great Vendors",
    description: "Browse trusted professionals in your area",
    emoji: "🔍",
  },
  {
    icon: Calendar,
    title: "Plan Together",
    description: "Book and coordinate details easily",
    emoji: "📅",
  },
  {
    icon: Star,
    title: "Enjoy Your Day",
    description: "Relax while we handle the work",
    emoji: "🎉",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-20 bg-background">
      <div className="container px-4 mx-auto">
        <motion.div
          className="space-y-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "-100px", once: true }}
        >
          {/* Header */}
          <div className="space-y-4 text-center">
            <motion.h2
              className="text-4xl font-bold tracking-tight md:text-5xl"
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
            >
              <span className="text-primary">Simple Planning</span>
              <span className="block mt-2 text-2xl text-muted-foreground">
                Three steps to your perfect event
              </span>
            </motion.h2>
          </div>

          {/* Steps */}
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-full p-6 border rounded-xl bg-background/80 border-primary/40 backdrop-blur-sm hover:bg-accent/50 transition-colors">
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-2xl font-semibold">
                        {step.emoji}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Help Text */}
          <motion.div
            className="z-50 opacity-100 text-center"
            initial={{ scale: 0.95 }}
            whileInView={{ scale: 1 }}
          >
            <p className="text-muted-foreground">
              Need help?{" "}
              <button
                aria-label="Contact support"
                className="font-medium text-primary hover:underline"
              >
                Ask our team
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

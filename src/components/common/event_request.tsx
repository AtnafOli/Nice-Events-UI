"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Send, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "@/lib/api-client";
import { useToast } from "@/hooks/use-toast";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function RequestHelpSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !eventType || !eventDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post("/help", {
        eventType,
        phoneNumber: phone,
        eventDate,
        seen: false,
        fullName: name,
      });

      toast({
        title: "Request Sent",
        description: "Thank you! We'll contact you within 24 hours.",
        variant: "default",
      });

      setName("");
      setPhone("");
      setEventType("");
      setEventDate(null);
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description:
          error?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}

      {/* Decorative elements */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.25]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="smallGrid"
                width="20"
                height="25"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-primary"
                />
              </pattern>
              <pattern
                id="grid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <rect width="100" height="100" fill="url(#smallGrid)" />
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-primary"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-center">
          {/* Left text */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center justify-center lg:justify-start">
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-full bg-accent/10 text-accent border border-accent/20">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  <span>Premium Experience</span>
                </span>
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Your Perfect{" "}
              <span className="text-primary relative">
                Event,
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                >
                  <path
                    d="M2 10C50.6667 4 142.4 -4.8 298 10"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              One Trusted Vendor Away
            </h2>

            <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed">
              Finding the perfect vendor shouldn’t be stressful. Let us match
              you with trusted professionals who will make your event
              unforgettable.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background bg-accent/20 flex items-center justify-center text-accent"
                  >
                    <User className="w-4 h-4" />
                  </div>
                ))}
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">Join 200+ clients</span> who trust
                our expertise
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div variants={itemVariants} className="lg:col-span-7 lg:pl-6">
            <div className="relative bg-card/80 backdrop-blur-md border border-primary/10 shadow-lg rounded-2xl overflow-hidden">
              {/* Gradient top */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary/40 via-accent/40 to-secondary/40"></div>

              {/* Form header */}
              <div className="pt-7 pb-5 px-6 md:px-8 text-center lg:text-left">
                <h3 className="text-2xl font-semibold text-foreground">
                  Request Consultation
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Share your vision and we'll contact you within 24 hours
                </p>
              </div>

              {/* Form body */}
              <div className="pb-7 px-6 md:px-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Event type */}
                  <div className="space-y-1.5">
                    <Label htmlFor="eventType" className="text-xs font-medium">
                      Event Type<span className="text-primary">*</span>
                    </Label>
                    <Select value={eventType} onValueChange={setEventType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="birthday">Birthday</SelectItem>
                        <SelectItem value="corporate">
                          Corporate Event
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-medium">
                      Your Name<span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-medium">
                      Phone Number<span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+2519..."
                    />
                  </div>

                  {/* Event date */}
                  <div className="space-y-1.5">
                    <Label htmlFor="date" className="text-xs font-medium">
                      Event Date<span className="text-primary">*</span>
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <DatePicker
                        selected={eventDate}
                        onChange={(date) => setEventDate(date)}
                        className="pl-10 pr-3 py-2 rounded-md w-full bg-background border border-input text-sm"
                        placeholderText="Select date"
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {formError && (
                    <div className="text-sm text-destructive">{formError}</div>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Request Consultation
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

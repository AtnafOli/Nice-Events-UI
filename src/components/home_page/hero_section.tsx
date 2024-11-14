"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Sparkles,
  Music,
  Utensils,
  Camera,
  MapPin,
  GraduationCap,
  Users,
  Heart,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const eventTypes = [
  { name: "Wedding", icon: Heart },
  { name: "Graduation", icon: GraduationCap },
  { name: "Seminar", icon: Users },
  { name: "Concert", icon: Music },
];

const images = [
  {
    src: "/heroimages/hero_image_1.png",
    alt: "Elegant wedding ceremony",
  },
  {
    src: "/heroimages/hero_image_1.png",
    alt: "Joyful graduation ceremony",
  },
  {
    src: "/heroimages/hero_image_1.png",
    alt: "Professional business seminar",
  },
  {
    src: "/heroimages/hero_image_1.png",
    alt: "Exciting live concert",
  },
];

export default function EnhancedHeroSection() {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen text-foreground overflow-visible lg:px-8 py-8">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-pattern"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 32V.5H32"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
              ></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pattern)"></rect>
        </svg>
      </div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary"
              >
                <Sparkles className="h-4 w-4" />
                <span>Discover Extraordinary Events</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight"
              >
                Find <span className="text-primary">Elite Vendors</span> for
                every vibe
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl text-muted-foreground max-w-2xl"
              >
                Curate unforgettable experiences with our handpicked selection
                of top-tier vendors for weddings, graduations, seminars, and
                more.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="bg-card/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl space-y-6 relative overflow-hidden border border-primary/10"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select onValueChange={setCategory} value={category}>
                  <SelectTrigger className="bg-background/50 backdrop-blur-sm border-primary/20">
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem
                        key={type.name}
                        value={type.name.toLowerCase()}
                      >
                        <div className="flex items-center">
                          <type.icon className="mr-2 h-4 w-4 text-primary" />
                          {type.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select onValueChange={setCity} value={city}>
                  <SelectTrigger className="bg-background/50 backdrop-blur-sm border-primary/20">
                    <SelectValue placeholder="City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="addis-ababa">Addis Ababa</SelectItem>
                    <SelectItem value="bahirdar">Bahirdar</SelectItem>
                    <SelectItem value="adama">Adama</SelectItem>
                    <SelectItem value="adama">Hawasa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-primary lg:text-md text-sm  text-primary-foreground hover:bg-primary/90 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                <Sparkles className="mr-2 h-4 w-4" /> Discover Vendors
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={images[currentImageIndex].src}
                    width={800}
                    height={600}
                    alt={images[currentImageIndex].alt}
                    className="rounded-2xl object-cover w-full h-[600px]"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute right-4 top-4 bg-background/80 backdrop-blur-md rounded-lg p-4 shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/20 rounded-full p-2">
                    <Camera className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Elite Photography</p>
                    <p className="text-sm text-muted-foreground">
                      Capture timeless moments
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 right-8 flex items-center space-x-2 text-sm font-medium text-primary cursor-pointer hover:underline group"
      >
        <span>Explore our exclusive services</span>
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </motion.div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
// Assuming Input might be used elsewhere, keeping import
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles, // Keep for flair
  Search, // Consider for search button
  ArrowRight,
  Camera,
  Tag, // For Category
  MapPin, // For City
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Category } from "@/types/category"; // Assuming this type structure
import { useRouter } from "next/navigation";
import Link from "next/link";
import { City } from "@/lib/city.enum"; // Assuming this enum structure

const images = [
  {
    src: "/heroimages/hero_image_1.png", // Ensure these images are high-resolution and premium
    alt: "Elegant wedding reception details",
  },
  {
    src: "/heroimages/hero_image_2.jpg",
    alt: "Professional corporate event setup",
  },
  {
    src: "/heroimages/hero_image_3.jpg",
    alt: "Stylish private celebration atmosphere",
  },
];

export default function SleekHeroSection({
  categorys,
}: {
  categorys: Category[];
}) {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Slightly longer interval for a calmer feel
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 text-foreground lg:px-8 px-4 py-24 lg:py-32">
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20 gap-12 items-center">
          {/* Text Content & Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-12" // Increased spacing
          >
            {/* Headline Area */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-1.5 text-sm font-medium text-primary"
              >
                <Sparkles className="h-4 w-4" />
                <span>Your Premier Event Partner</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight" // Adjusted leading
              >
                Find <span className="text-primary">Elite Vendors</span> for
                Every Moment.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="text-lg md:text-xl text-muted-foreground max-w-xl" // Slightly larger text
              >
                Connect with top-tier professionals curated for weddings,
                corporate events, celebrations, and more. Effortlessly bring
                your vision to life.
              </motion.p>
            </div>

            {/* Search Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              className="bg-card/60 dark:bg-black/30 backdrop-blur-lg rounded-xl p-6 md:p-8 shadow-xl space-y-6 relative overflow-hidden border border-border/20" // Softer bg, subtle border
            >
              {/* Subtle glow effect */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 z-10 relative">
                <Select onValueChange={setCategory} value={category}>
                  <SelectTrigger className="bg-background/70 backdrop-blur-sm border-border/50 h-12 text-base">
                    {" "}
                    {/* Subtle bg, standard height */}
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Select Service" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {categorys.map((type) => (
                      <SelectItem key={type.name} value={type.id.toString()}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select onValueChange={setCity} value={city}>
                  <SelectTrigger className="bg-background/70 backdrop-blur-sm border-border/50 h-12 text-base">
                    {" "}
                    {/* Subtle bg, standard height */}
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Select City" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(City)
                      .filter((key) => isNaN(Number(key)))
                      .map((cityKey) => (
                        <SelectItem key={cityKey} value={cityKey}>
                          {cityKey.replaceAll("_", " ")}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                size="lg" // Larger button
                onClick={() => {
                  if (city && category) {
                    // Basic check before routing
                    router.push(
                      `/city-and-category-discover/${city}/${category}`
                    );
                  } else {
                    // Optional: Add some user feedback if fields are missing
                    console.warn("Please select both category and city.");
                  }
                }}
                className="w-full text-base font-semibold bg-primary text-primary-foreground h-12 hover:bg-primary/90 transition-colors duration-200 shadow-md" // Refined button style
              >
                <Search className="mr-2 h-5 w-5" /> Discover Vendors
              </Button>
            </motion.div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.0, ease: "easeOut" }}
            className="relative hidden lg:block aspect-[4/3]" // Maintain aspect ratio
          >
            {/* Optional subtle background glow for the image */}
            <div className="absolute -inset-6 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }} // Smoother image transition
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentImageIndex].src}
                    fill // Use fill and object-cover for responsiveness
                    style={{ objectFit: "cover" }}
                    alt={images[currentImageIndex].alt}
                    className="rounded-2xl"
                    priority={currentImageIndex === 0} // Prioritize first image load
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-2xl pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Info Card - Refined Style */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-6 right-6 bg-background/70 backdrop-blur-md rounded-lg p-3 shadow-lg border border-border/20" // Adjusted position & style
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 rounded-md p-2">
                    {" "}
                    {/* Slightly larger padding */}
                    <Camera className="h-5 w-5 text-primary" />{" "}
                    {/* Adjusted icon size */}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Photography</p>{" "}
                    {/* Adjusted text size */}
                    <p className="text-xs text-muted-foreground">
                      {" "}
                      {/* Adjusted text size */}
                      Capture your moments
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Optional: Kept the "Book Consultation" link, styled consistently */}
      <Link href="/contact" passHref legacyBehavior>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
          className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 z-20 flex items-center space-x-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors group" // Adjusted position and spacing
        >
          <span>Book Consultation</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </Link>

      {/* Decorative gradient overlay at the bottom (optional) */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" /> */}
    </section>
  );
}

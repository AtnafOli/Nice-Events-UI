"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { servicesService } from "@/services/services.service";
import type { Service } from "@/types/service";
import {
  ChevronDown,
  Users,
  Briefcase,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";
import ServiceCard from "@/components/services/service_card";
import { useRouter } from "next/navigation";

const EventPlannersPage: React.FC = () => {
  const router = useRouter();

  const [planners, setPlanners] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await servicesService.getAllEventPlanners();
        setPlanners(data || []);
      } catch {
        setPlanners([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // group by subCategory name
  const grouped = planners.reduce<Record<string, Service[]>>((acc, p) => {
    const key = p.subCategory?.name || "Uncategorized";
    (acc[key] = acc[key] || []).push(p);
    return acc;
  }, {});
  const categories = Object.keys(grouped);
  const featured = planners.slice(0, 3);

  // sample testimonials for planners
  const testimonials = [
    {
      quote:
        "Their attention to detail and calm under pressure made our wedding day flawless. Highly recommend!",
      author: "Mulugeta & Hana",
      position: "Couple, Spring Garden Wedding",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
      rating: 5,
    },
    {
      quote:
        "As an HR manager organizing annual retreats, I rely on their seamless coordination. Everything runs like clockwork!",
      author: "Yared Bekele",
      position: "HR Manager, TechCorp",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80",
      rating: 5,
    },
    {
      quote:
        "International conference logistics were handled perfectly, even with last-minute changes. True professionals!",
      author: "Selam Dawit",
      position: "Conference Chair",
      image:
        "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=80&q=80",
      rating: 5,
    },
  ];

  const categoryIcons: Record<string, React.ReactNode> = {
    corporate: <Briefcase className="w-6 h-6" />,
    wedding: <Users className="w-6 h-6" />,
    conference: <Calendar className="w-6 h-6" />,
    destination: <MapPin className="w-6 h-6" />,
  };

  return (
    <div className="min-h-screen bg-[#f9f7f5]">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden" // Assuming you want full screen height
      >
        {/* Background Image & Overlay */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <Image
            // Consider a different image if the focus shifts, e.g., people connecting or a beautifully set table
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="People laughing and connecting at a beautiful event" // Alt text reflecting the feeling
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </motion.div>

        {/* Centered Content Container */}
        <div className="container mx-auto h-full px-4 sm:px-6 lg:px-20 flex flex-col justify-center items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl sm:max-w-2xl"
          >
            {/* Tagline: Focus on the Outcome/Feeling */}
            <span className="inline-block px-4 py-1 text-xs sm:text-sm font-medium uppercase tracking-wider text-white bg-white/15 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              Making Moments Unforgettable
            </span>

            {/* Headline: Creative & Benefit-Oriented */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white leading-tight">
              Enjoy Your Celebration,
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">
                Stress-Free{" "}
              </span>
            </h1>

            {/* Body Text: Human, relatable, focus on experience */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 font-light">
              Planning a wedding, party, or company gathering? Let our friendly
              team take care of everything, from the big ideas to the tiny
              details, so you can actually *enjoy* your special day.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#featured" // Link to your services or portfolio section
                className="relative px-6 py-3 sm:px-8 sm:py-4 bg-[#d4a373] hover:bg-[#c69c6d] text-white font-medium rounded-full overflow-hidden transition-all duration-300 shadow-lg group"
              >
                <span className="relative z-10">Discover</span>{" "}
                <span className="absolute inset-0 w-0 bg-white/20 group-hover:w-full transition-all duration-500 ease-in-out" />
              </Link>
              <button
                onClick={() => {
                  router.push("/contact"); // Ensure router is imported and configured
                }}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-medium rounded-full transition-all duration-300"
              >
                Tell Us About Your Event
              </button>
            </div>
          </motion.div>

          {/* Animated Scroll Down Indicator */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: [0, 10, 0], opacity: 1 }} // Looping bounce animation
            transition={{
              delay: 1.2,
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </motion.div>
        </div>
      </section>

      {/* Featured Planners */}
      <section id="featured" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-20">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-[#d4a373]/10 text-[#d4a373] rounded-full text-xs sm:text-sm font-medium mb-2">
            Handpicked Experts
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Planners
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Meet our top-rated planners who’ve brought countless visions to
            life.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((p) => (
            <ServiceCard key={p.id} service={p} />
          ))}
        </div>
      </section>

      {/* Planner Categories */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-20">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[300px] bg-gray-200 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : planners.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
              No Planners Found
            </h3>
            <p className="text-gray-600">
              We couldn’t locate any event planners right now. Please check back
              later.
            </p>
          </div>
        ) : (
          categories.map((cat) => (
            <div key={cat} className="mb-16">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#d4a373]/10 flex items-center justify-center mr-4 text-[#d4a373]">
                  {categoryIcons[cat.toLowerCase()] || (
                    <Users className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 capitalize">
                    {cat}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {/* custom descriptions per category */}
                    {{
                      wedding: "Dream weddings, flawlessly executed.",
                      corporate: "Seamless corporate gatherings.",
                      conference: "Engaging professional conferences.",
                      destination: "Memorable destination events.",
                    }[cat.toLowerCase()] ||
                      "Professional event planning services."}
                  </p>
                </div>
              </div>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {grouped[cat].map((p) => (
                  <motion.div
                    key={p.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5 },
                      },
                    }}
                  >
                    <ServiceCard service={p} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))
        )}
      </section>

      {/* Success Stories */}
      <section className="py-16 sm:py-24 bg-white px-4 sm:px-6 lg:px-20">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-[#d4a373]/10 text-[#d4a373] rounded-full text-xs sm:text-sm font-medium mb-2">
            Client Praise
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Success Stories
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Hear from clients who trusted our planners and loved the results.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[#f9f7f5] rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row">
            <div
              className="h-48 md:h-auto md:w-1/2 bg-cover bg-center"
              style={{
                backgroundImage: `url('${testimonials[0].image}')`,
              }}
            />
            <div className="p-6 flex flex-col justify-center">
              <div className="flex mb-4">
                {[...Array(testimonials[0].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-500"
                    fill="#f59e0b"
                  />
                ))}
              </div>
              <p className="italic text-gray-700 mb-4">
                "{testimonials[0].quote}"
              </p>
              <p className="font-semibold text-gray-900">
                {testimonials[0].author}
              </p>
              <p className="text-sm text-gray-500">
                {testimonials[0].position}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {testimonials.slice(1).map((t, idx) => (
              <div
                key={idx}
                className="bg-[#f9f7f5] rounded-2xl p-6 shadow-md flex flex-col justify-between"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={t.image}
                      alt={t.author}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t.author}</p>
                    <p className="text-sm text-gray-500">{t.position}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-500"
                      fill="#f59e0b"
                    />
                  ))}
                </div>
                <p className="italic text-gray-700">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-16 bg-gradient-to-r from-[#d4a373] to-[#e6b980] px-4 sm:px-6 lg:px-20 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Plan Your Perfect Event?
        </h2>
        <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-8">
          Let our expert planners craft an unforgettable experience for you.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              router.push("/contact");
            }}
            className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#d4a373] font-medium rounded-full shadow-md transform hover:-translate-y-1 transition"
          >
            Book a Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default EventPlannersPage;

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { servicesService } from "@/services/services.service";
import type { Service } from "@/types/service";
import {
  ChevronDown,
  Star,
  Building,
  TreePalmIcon as PalmTree,
  Landmark,
  Users,
} from "lucide-react";
import ServiceCard from "@/components/services/service_card";
import Footer from "@/components/common/footer/footer";
import { useRouter } from "next/navigation";

const VenuesPage: React.FC = () => {
  const router = useRouter();

  const [venues, setVenues] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        const fetched = await servicesService.getAllVenues();
        setVenues(fetched || []);
      } catch (e) {
        console.error(e);
        setVenues([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  const grouped = venues.reduce<Record<string, Service[]>>((acc, v) => {
    const key = v.subCategory?.name || "Uncategorized";
    acc[key] = acc[key] || [];
    acc[key].push(v);
    return acc;
  }, {});
  const categories = Object.keys(grouped);
  const featured = venues.slice(0, 3);

  const testimonials = [
    {
      quote:
        "We were struggling to find a venue that could accommodate our vision for a rustic yet elegant wedding. The venue specialist found us the perfect barn with modern amenities. Our guests are still raving about how beautiful it was!",
      author: "Abebe & Tigist",
      position: "Wedding at Rosewood Barn",
      image:
        "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-4.0.3&auto=format&fit=crop&w=3270&q=80",
      rating: 5,
    },
    {
      quote:
        "As a corporate event planner, I need reliable venues that impress clients. This service has become my secret weapon for finding unique spaces that set our events apart from competitors.",
      author: "Dawit Haile",
      position: "Director of Events, Horizon Inc.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      rating: 5,
    },
    {
      quote:
        "When planning our charity gala from overseas, finding a venue seemed impossible until we used this service. The virtual tours were a game-changer!",
      author: "Selam Tesfaye",
      position: "Foundation Director",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      rating: 5,
    },
  ];

  const icons: Record<string, React.ReactNode> = {
    hotel: <Building className="w-6 h-6" />,
    resort: <PalmTree className="w-6 h-6" />,
    garden: <Landmark className="w-6 h-6" />,
    ballroom: <Users className="w-6 h-6" />,
  };

  return (
    <div className="min-h-screen bg-[#f9f7f5]">
      {/* Hero */}
      <section ref={heroRef} className="relative h-screen  overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2098&q=80"
            alt="Elegant event venue"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </motion.div>

        <div className="container mx-auto h-full px-4 sm:px-6 lg:px-20 flex flex-col justify-center items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl sm:max-w-2xl"
          >
            <span className="inline-block px-4 py-1 text-xs sm:text-sm font-medium uppercase tracking-wider text-white bg-white/15 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              Experience Extraordinary
            </span>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white leading-tight">
              Where
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">
                Memories Are Made
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 font-light">
              Discover extraordinary spaces for your extraordinary moments. From
              intimate gatherings to grand celebrations, find the perfect
              backdrop for your story.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#venues"
                className="relative px-6 py-3 sm:px-8 sm:py-4 bg-[#d4a373] hover:bg-[#c69c6d] text-white font-medium rounded-full overflow-hidden transition-all duration-300 shadow-lg"
              >
                <span className="relative z-10">Explore Venues</span>
                <span className="absolute inset-0 w-0 bg-white/20 group-hover:w-full transition-all duration-500 ease-in-out" />
              </Link>
              <button
                onClick={() => {
                  router.push("/contact");
                }}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-medium rounded-full transition-all duration-300"
              >
                Book a Consultation
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Featured Venues */}
      <section id="venues" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-20">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-[#d4a373]/10 text-[#d4a373] rounded-full text-xs sm:text-sm font-medium mb-4">
            Handpicked Selection
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Venues
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our most sought-after venues that have consistently
            delivered exceptional event experiences
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featured.map((v) => (
            <ServiceCard key={v.id} service={v} />
          ))}
        </div>
      </section>

      {/* Venue Categories */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-20">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-40 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 w-1/2" />
                  <div className="h-6 bg-gray-200 w-3/4" />
                  <div className="h-4 bg-gray-200 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : venues.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              No Venues Found
            </h3>
            <p className="text-gray-600">
              We couldn't find any venues at the moment. Please check back
              later.
            </p>
          </div>
        ) : (
          categories.map((cat) => (
            <div key={cat} className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#d4a373]/10 flex items-center justify-center text-[#d4a373] mr-4">
                  {icons[cat] || <Landmark className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 capitalize">
                    {cat}
                  </h3>
                  {grouped[cat]?.[0]?.subCategory?.description && (
                    <p className="text-gray-600 text-sm sm:text-base mt-2">
                      {grouped[cat][0].subCategory.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {grouped[cat].map((v) => (
                  <ServiceCard key={v.id} service={v} />
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-white px-4 sm:px-6 lg:px-20">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-[#d4a373]/10 text-[#d4a373] rounded-full text-xs sm:text-sm font-medium mb-4">
            Client Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Success Stories
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Hear from event planners and couples who found their dream venues
            through our service
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 bg-[#f9f7f5] rounded-2xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div
                className="h-48 md:h-auto bg-cover bg-center"
                style={{
                  backgroundImage: `url('${testimonials[0].image}')`,
                }}
              />
              <div className="p-4 sm:p-8 flex flex-col justify-center">
                <div className="flex mb-2">
                  {[...Array(testimonials[0].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500"
                      fill="#f59e0b"
                    />
                  ))}
                </div>
                <p className="italic text-sm sm:text-base text-gray-700 mb-4">
                  "{testimonials[0].quote}"
                </p>
                <p className="font-semibold text-gray-900">
                  {testimonials[0].author}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {testimonials[0].position}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {testimonials.slice(1).map((t, idx) => (
              <div
                key={idx}
                className="bg-[#f9f7f5] rounded-2xl p-4 sm:p-6 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3">
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
                      <p className="text-xs sm:text-sm text-gray-500">
                        {t.position}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-amber-500"
                        fill="#f59e0b"
                      />
                    ))}
                  </div>
                </div>
                <p className="italic text-sm sm:text-base text-gray-700">
                  "{t.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#d4a373] to-[#e6b980] px-4 sm:px-6 lg:px-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Venue?
          </h2>
          <p className="text-base sm:text-lg text-white/90 mb-6">
            Let our venue specialists guide you through the process and find the
            ideal space for your event.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#d4a373] font-medium rounded-full shadow-md transform hover:-translate-y-1 transition"
              onClick={() => {
                router.push("/contact");
              }}
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VenuesPage;

"use client";

import React from "react";

export default function FestiveHero() {
  return (
    <div className="scale-80 relative pt-12 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* inline gradient using CSS vars for perfect color sync */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          style={{
            backgroundImage: `
              linear-gradient(
                135deg,
                hsl(var(--primary)) 0%,
                hsl(var(--accent)) 50%,
                hsl(var(--secondary)) 100%
              )
            `,
          }}
        >
          {/* subtle grid overlay */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M40 0 L0 0 0 40"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* decorative glowy blobs */}
          <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
            <div className="w-64 h-64 rounded-full bg-yellow-300 bg-opacity-20 backdrop-blur-sm" />
          </div>
          <div className="absolute top-0 left-0 transform -translate-x-1/4 -translate-y-1/4">
            <div className="w-64 h-64 rounded-full bg-purple-300 bg-opacity-20 backdrop-blur-sm" />
          </div>

          {/* hero content */}
          <div className="relative py-16 px-8 sm:px-16 text-center sm:text-left text-white">
            <div className="sm:flex items-center">
              <div className="max-w-xl">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
                  <span className="block sm:inline">Create Magical </span>
                  <span className="block font-light italic">Events</span>
                </h1>
                <p className="text-lg sm:text-xl opacity-90 max-w-lg">
                  Discover exceptional services from our carefully selected
                  providers to make your next celebration truly unforgettable.
                </p>
                <div className="mt-10 flex flex-wrap gap-4 justify-center sm:justify-start">
                  <div className="flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-5 py-3">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                    <span>300+ Happy Customers</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-5 py-3">
                    <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
                    <span>25+ Services</span>
                  </div>
                </div>
              </div>
              {/* icon collage */}
              <div className="hidden sm:block sm:w-80 h-80 relative mt-10 sm:mt-0 sm:ml-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full relative">
                    {["🎂", "🎉", "🎵", "🎁"].map((icon, idx) => {
                      const positions = [
                        { top: 0, left: 0, rotate: "6deg", size: "32" },
                        { top: "25%", right: 0, rotate: "-12deg", size: "24" },
                        { bottom: 0, left: "25%", rotate: "12deg", size: "28" },
                        {
                          bottom: "25%",
                          right: "25%",
                          rotate: "-6deg",
                          size: "20",
                        },
                      ][idx];
                      return (
                        <div
                          key={idx}
                          className="absolute bg-white bg-opacity-20 rounded-3xl backdrop-blur-sm flex items-center justify-center"
                          style={{
                            width: `${positions.size}px`,
                            height: `${positions.size}px`,
                            transform: `rotate(${positions.rotate})`,
                            top: positions.top,
                            left: positions.left,
                            right: positions.right,
                            bottom: positions.bottom,
                          }}
                        >
                          <span className={`text-${positions.size / 4}xl`}>
                            {icon}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  Mail,
  Twitter,
  Instagram,
  Facebook,
  MapPin,
  Phone,
  Sparkles,
  // Star icon was imported but not used, removed unless needed elsewhere
} from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    // Added px-6 md:px-12 for consistent horizontal padding on the main footer element
    <footer className="relative bg-gradient-to-t from-background via-primary/10 to-transparent text-foreground pt-36 pb-12 overflow-hidden font-sans px-6 md:px-12">
      {/* Call to Action Section */}
      {/* Centered the CTA block and constrained its max width */}
      <div className="mx-auto max-w-4xl mb-24">
        {/* Adjusted padding and gap for better spacing across devices */}
        <div className=" p-8 md:p-10 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 border border-border/80 backdrop-blur-sm bg-card/80">
          {/* Centered text on mobile, left-aligned on desktop */}
          <div className="space-y-3 text-center md:text-left">
            {/* Adjusted text sizes for better hierarchy */}
            <h2 className="text-2xl scale-75 md:text-4xl font-extrabold text-foreground leading-tight">
              Join Our Network of Ethiopian Professionals
            </h2>
            {/* Adjusted text size and leading */}
            <p className="text-sm md:text-lg text-muted-foreground max-w-md leading-relaxed">
              Connect with clients seeking your expertise across Ethiopia.
              Expand your reach with NiceEvents.
            </p>
          </div>

          {/* Button: Full width on mobile, auto on desktop, centered text */}
          <Link
            href="/become-vendor"
            className="inline-block shrink-0 text-center px-8 py-4 w-full md:w-auto max-w-xs bg-primary text-primary-foreground rounded-full"
          >
            List Your Service
          </Link>
        </div>
      </div>

      {/* Decorative Blobs - positioned absolutely, behind content */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      >
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob-slow"></div>
        <div className="absolute bottom-0 -right-16 w-80 h-80 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob-slow animation-delay-2000"></div>
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob-slow animation-delay-4000"></div>
      </div>

      {/* Main Footer Content */}
      {/* Using container mx-auto for centering the main grid content */}
      <div className="relative z-10 container mx-auto">
        {/* Separator */}
        <div className="flex justify-center my-16">
          <div className="relative w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent flex items-center justify-center">
            <Sparkles
              size={28}
              className="absolute text-primary/60 animate-pulse-slow"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Grid Layout for Links and Branding */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 gap-x-12">
          {/* Branding & Contact Info */}
          {/* Centered logo and text on mobile, left-aligned on desktop */}
          <div className="md:col-span-4 lg:col-span-5 space-y-8 text-center md:text-left">
            {/* Logo/Brand Name */}
            <div className="flex items-center justify-center md:justify-start space-x-3">
              {/* Optional: Add an actual logo image here if available */}
              {/* <img src="/logo.svg" alt="NiceEvents Logo" className="h-10 w-auto" /> */}
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
                NiceEvents
              </h3>
            </div>
            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground max-w-sm leading-relaxed mx-auto md:mx-0">
              Your premier marketplace for curating extraordinary events in
              Ethiopia. Effortlessly connect with elite service providers.
            </p>
            {/* Contact Details - Kept text left-aligned within this block */}
            <div className="pt-6 space-y-4 border-t border-primary/15 text-left inline-block md:block">
              {" "}
              {/* Use inline-block for tighter fit on mobile center align */}
              <h4 className="text-xl font-semibold text-foreground mb-4 text-center md:text-left">
                Get in Touch
              </h4>
              {[
                {
                  icon: MapPin,
                  text: "Meskel Square Area, Addis Ababa, Ethiopia",
                  href: "#",
                }, // Use more general location unless specific is desired
                {
                  icon: Phone,
                  text: "+251 91 234 5678",
                  href: "tel:+251912345678",
                },
                {
                  icon: Mail,
                  text: "info@niceevents.et",
                  href: "mailto:info@niceevents.et",
                },
              ].map((item, idx) => (
                <Link
                  href={item.href}
                  key={idx}
                  className="flex items-center space-x-3 group text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  <item.icon
                    size={18}
                    className="text-primary/70 group-hover:text-primary transition-colors duration-200 shrink-0"
                  />
                  <span className="text-sm md:text-base">{item.text}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links Grid */}
          {/* Responsive grid for link sections */}
          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Discover",
                links: [
                  { href: "/events", label: "Upcoming Events" },
                  { href: "/services", label: "Find Services" },
                  { href: "/categories", label: "Browse Categories" },
                  { href: "/locations", label: "Popular Locations" },
                  { href: "/inspiration", label: "Event Inspiration" },
                ],
              },
              {
                title: "Professionals",
                links: [
                  {
                    href: "/become-a-professional",
                    label: "List Your Service",
                  },
                  { href: "/how-it-works-provider", label: "How It Works" },
                  { href: "/pricing", label: "Plans & Pricing" },
                  { href: "/provider-dashboard", label: "Provider Dashboard" },
                  { href: "/community", label: "Community Forum" },
                  { href: "/provider-support", label: "Support Center" },
                ],
              },
              {
                title: "Company",
                links: [
                  { href: "/about", label: "About NiceEvents" },
                  { href: "/careers", label: "Careers" },
                  { href: "/blog", label: "Blog" }, // Added Blog
                  { href: "/press", label: "Press Kit" },
                  { href: "/terms", label: "Terms of Service" },
                  { href: "/privacy", label: "Privacy Policy" },
                  // { href: "/sitemap", label: "Sitemap" }, // Sitemap often less prominent
                ],
              },
            ].map((section) => (
              <div key={section.title} className="space-y-4">
                <h5 className="text-lg font-semibold text-foreground/90">
                  {section.title}
                </h5>
                <ul className="space-y-3 text-sm md:text-base">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright and Social Links */}
        {/* Centered content on mobile, space-between on desktop */}
        <div className="mt-16 pt-8 border-t border-primary/15 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          {/* Copyright - Centered text on mobile */}
          <p className="text-center md:text-left order-2 md:order-1">
            &copy; {new Date().getFullYear()} NiceEvents Ethiopia. All rights
            reserved.
          </p>
          {/* Social Icons - Centered on mobile */}
          <div className="flex items-center justify-center md:justify-end space-x-5 order-1 md:order-2">
            {[
              // Using placeholder links, replace # with actual URLs
              { icon: Twitter, href: "#", label: "Twitter" },
              { icon: Instagram, href: "#", label: "Instagram" },
              { icon: Facebook, href: "#", label: "Facebook" },
              {
                icon: Mail,
                href: "mailto:info@niceevents.et",
                label: "Email Us",
              },
            ].map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank" // Optional: open social links in new tab
                rel="noopener noreferrer" // Security best practice for target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                <social.icon size={20} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

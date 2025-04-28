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
} from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-background via-primary/10 to-transparent text-foreground pt-32 pb-16 overflow-hidden font-sans">
      {/* Call to Action Section - Simplified & more elegant */}
      <div className="mx-auto max-w-5xl mb-28 px-6 md:px-8">
        <div className="p-10 md:p-12 rounded-[2rem] shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-primary/10 backdrop-blur-md bg-card/80">
          <div className="space-y-4 text-center md:text-left max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight">
              Grow Your Business
              <br className="hidden md:inline" /> with NiceEvents
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Connect with clients seeking your expertise across Ethiopia.
            </p>
          </div>

          <Link
            href="/become-vendor"
            className="inline-block shrink-0 text-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-all duration-200 font-medium shadow-md hover:shadow-lg"
          >
            List Your Service
          </Link>
        </div>
      </div>

      {/* Decorative Blobs - Enhanced with more subtle animation */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-15 pointer-events-none overflow-hidden"
      >
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob-slow"></div>
        <div className="absolute bottom-0 -right-16 w-80 h-80 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob-slow animation-delay-2000"></div>
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob-slow animation-delay-4000"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8">
        {/* Elegant separator */}
        <div className="flex justify-center mb-20">
          <div className="relative w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent">
            <Sparkles
              size={24}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/70 animate-pulse-slow"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Grid Layout - Simplified with more whitespace */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-12">
          {/* Branding & Contact Info */}
          <div className="md:col-span-5 space-y-8 text-center md:text-left">
            {/* Logo/Brand Name */}
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
                NiceEvents
              </h3>
            </div>

            {/* Description */}
            <p className="text-base text-muted-foreground max-w-sm leading-relaxed mx-auto md:mx-0">
              Plan Your Perfect Event with Trusted Vendors — Fast, Easy, and
              Affordable.
            </p>

            {/* Contact Details - Simplified */}
            <div className="pt-8 space-y-5 border-t border-primary/10 text-left inline-block md:block">
              <h4 className="text-lg font-medium text-foreground mb-4 text-center md:text-left">
                Get in Touch
              </h4>
              {[
                {
                  icon: MapPin,
                  text: "Meskel Square, Addis Ababa",
                  href: "https://maps.google.com",
                },
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
                  <span className="text-sm">{item.text}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links - Reduced & Simplified */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {[
              {
                title: "Discover",
                links: [
                  { href: "/events", label: "Events" },
                  { href: "/services", label: "Services" },
                  { href: "/categories", label: "Categories" },
                  { href: "/inspiration", label: "Inspiration" },
                ],
              },
              {
                title: "Professionals",
                links: [
                  { href: "/become-a-professional", label: "Join Us" },
                  { href: "/how-it-works-provider", label: "How It Works" },
                  { href: "/pricing", label: "Pricing" },
                  { href: "/provider-support", label: "Support" },
                ],
              },
              {
                title: "Company",
                links: [
                  { href: "/about", label: "About" },
                  { href: "/blog", label: "Blog" },
                  { href: "/terms", label: "Terms" },
                  { href: "/privacy", label: "Privacy" },
                ],
              },
            ].map((section) => (
              <div key={section.title} className="space-y-5">
                <h5 className="text-base font-semibold text-foreground">
                  {section.title}
                </h5>
                <ul className="space-y-3.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
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

        {/* Bottom Bar - More elegant with subtle separator */}
        <div className="mt-20 pt-8 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright - Refined typography */}
          <p className="text-center md:text-left order-2 md:order-1 text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} NiceEvents Ethiopia. All rights
            reserved.
          </p>

          {/* Social Icons - More elegant */}
          <div className="flex items-center justify-center md:justify-end space-x-6 order-1 md:order-2">
            {[
              { icon: Twitter, href: "#", label: "Twitter" },
              { icon: Instagram, href: "#", label: "Instagram" },
              { icon: Facebook, href: "#", label: "Facebook" },
              { icon: Mail, href: "mailto:info@niceevents.et", label: "Email" },
            ].map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/70 hover:text-primary transition-colors duration-300"
              >
                <social.icon size={18} strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

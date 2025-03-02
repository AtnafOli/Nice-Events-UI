"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t border-primary/10 bg-gradient-to-b from-primary/05 to-background">
      <div className="container px-4 py-12 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5"
        >
          {/* Brand Section */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">NiceEvents</h3>

            <p className="text-muted-foreground">
              Simplifying event planning in Ethiopia.
            </p>
            <button
              aria-label="Get started"
              className="text-primary hover:underline font-medium"
            >
              Start Planning →
            </button>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-semibold">Services</h4>
            <div className="flex flex-col space-y-2">
              {[
                { name: "Weddings", href: "#" },
                { name: "Corporate Events", href: "#" },
                { name: "Birthdays", href: "#" },
                { name: "Concerts", href: "#" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.nav>

          {/* Company */}
          <motion.nav
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-semibold">Company</h4>
            <div className="flex flex-col space-y-2">
              {[
                { name: "About", href: "#" },
                { name: "Blog", href: "#" },
                { name: "Careers", href: "#" },
                { name: "Contact", href: "#" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.nav>

          {/* Legal */}
          <motion.nav
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-semibold">Legal</h4>
            <div className="flex flex-col space-y-2">
              {[
                { name: "Privacy", href: "#" },
                { name: "Terms", href: "#" },
                { name: "Security", href: "#" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.nav>

          {/* Social */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-semibold">Connect</h4>
            <div className="flex space-x-4">
              {[
                {
                  name: "Twitter",
                  href: "#",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  ),
                },
                {
                  name: "Instagram",
                  href: "#",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  ),
                },
                {
                  name: "Facebook",
                  href: "#",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Copyright */}
        <div className="pt-8 mt-8 border-t border-primary/10">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} NiceEvents. All rights reserved.
            <span className="block mt-1 md:inline md:mt-0">
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>{" "}
              ·{" "}
              <Link href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </span>
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10 opacity-10 bg-[url('/svg/grid-pattern.svg')]" />
    </footer>
  );
}

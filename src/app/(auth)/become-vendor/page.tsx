"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AuthGuard } from "@/components/auth/authGuard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ChevronRight } from "lucide-react";
import VendorRegistrationForm from "@/components/forms/vendor-register-form";
import { GoogleSignInButton } from "@/components/common/google.sigin.button";

export default function page() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-secondary/5 to-primary/5 flex items-center justify-center lg:p-4 p-2 relative overflow-hidden">
        <Link
          href="/"
          className="absolute lg:top-4 top-2 lg:left-4 left-2 text-foreground hover:text-primary transition-colors flex items-center lg:gap-2 gap-1 z-10"
        >
          <ArrowLeft className="lg:h-4 h-3 lg:w-4 w-3" />
          <span className="lg:text-base text-sm">Back to Home</span>
        </Link>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <motion.div
            className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-primary/5"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-secondary/5"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="z-10 w-full max-w-lg relative"
        >
          <Card className="backdrop-blur-lg bg-card/90 border-none shadow-2xl overflow-hidden lg:p-2">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
            <CardHeader className="lg:space-y-2 space-y-1.5 relative">
              <CardTitle className="text-2xl md:text-5xl font-bold tracking-tight text-primary">
                Become a Vendor{" "}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm lg:text-base">
                Register your account to start listing your services on
                NiceEvents{" "}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <VendorRegistrationForm />

              <div className="flex justify-center text-sm sm:text-base">
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="font-medium text-primary hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <Separator className="bg-border" />

              <div className="text-center">
                <Link
                  href="/become-vendor"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-primary rounded-xl  text-sm font-medium group"
                >
                  <span className="relative">Become a Vendor</span>
                  <ChevronRight className="ml-0.5 lg:h-4 h-3 lg:w-4 w-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AuthGuard>
  );
}

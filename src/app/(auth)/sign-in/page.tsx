"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { AuthGuard } from "@/components/auth/authGuard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ChevronRight, Sparkles } from "lucide-react";
import SignInForm from "@/components/forms/sign-in-form";

const FloatingSparkle = ({ delay }: { delay: number }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0, -20, 0],
      opacity: [0, 1, 0],
      transition: { duration: 2, delay, repeat: Infinity, ease: "easeInOut" },
    });
  }, [controls, delay]);

  return (
    <motion.div
      className="absolute text-accent"
      initial={{ opacity: 0 }}
      animate={controls}
    >
      <Sparkles size={16} />
    </motion.div>
  );
};

export default function EventSignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-[hsl(150,8%,90.5%)] to-[hsl(20,55%,95%)] flex items-center justify-center p-4 relative overflow-hidden">
        <Link
          href="/"
          className="absolute top-4 left-4 text-foreground hover:text-primary transition-colors flex items-center gap-2 z-10"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
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
          className="z-10 w-full max-w-md relative"
        >
          <Card className="backdrop-blur-md bg-card/90 border-none shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
            <CardHeader className="space-y-1 relative">
              <CardTitle className="text-xl sm:text-3xl font-bold tracking-tight text-primary">
                Welcome to NiceEvents
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm sm:text-base">
                Sign in to your account or explore options below
              </CardDescription>
              <FloatingSparkle delay={0} />
              <FloatingSparkle delay={1} />
              <FloatingSparkle delay={2} />
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <SignInForm />

              <div className="flex justify-between text-sm sm:text-base">
                <Link
                  href="/forgot-password"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Forgot password?
                </Link>
                <Link
                  href="/signup"
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Sign up
                </Link>
              </div>

              <Separator className="bg-border" />

              <div className="grid grid-cols-1">
                <Button
                  variant="outline"
                  className="bg-card/50 hover:bg-muted border-border text-card-foreground transition-all duration-300 ease-in-out rounded-xl h-12 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                    animate={{ scale: [0.9, 1], opacity: [0, 1] }}
                    transition={{ duration: 0.3 }}
                  />
                  <svg
                    className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="relative z-10">Sign in with Google</span>
                </Button>
              </div>

              <Separator className="bg-border" />

              <div className="text-center">
                <Link
                  href="/become-vendor"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium group"
                >
                  <span className="relative">Become a Vendor</span>
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AuthGuard>
  );
}

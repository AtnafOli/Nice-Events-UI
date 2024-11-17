"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/auth.service";
import { toast } from "@/hooks/use-toast";

export default function EmailVerification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  useEffect(() => {
    if (email) inputs.current[0]?.focus();
  }, [email]);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown(resendCountdown - 1),
        1000
      );
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [resendCountdown]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email is missing. Please retry.",
        variant: "destructive",
      });
      return;
    }

    if (code.some((digit) => digit === "")) {
      toast({
        title: "Incomplete Code",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const verificationCode = code.join("");
      await authService.verifyEmail({
        email,
        code: verificationCode,
      });

      toast({
        title: "Success",
        description: "Email verified successfully!",
      });
      router.push("/sign-in");
    } catch (err) {
      toast({
        title: "Verification Failed",
        description: "Invalid verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) return;
    setResendDisabled(true);
    setResendCountdown(60);
    try {
      await authService.resendVerificationCode(email);
      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to resend code. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/20 to-primary/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <motion.div
              className="flex justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-primary" />
              </div>
            </motion.div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              Verify Your Email
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              We&apos;ve sent a 6-digit code to your email address.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-2 justify-center">
              {code.map((digit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Input
                    ref={(el) => {
                      inputs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) =>
                      handleChange(index, e.target.value.replace(/[^0-9]/g, ""))
                    }
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-lg font-semibold bg-secondary/10 border-secondary/20 focus:border-primary focus:ring-primary transition-all duration-300"
                    maxLength={1}
                    aria-label={`Verification code digit ${index + 1}`}
                  />
                </motion.div>
              ))}
            </div>
            <Button
              onClick={handleVerify}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
              size="lg"
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-5 h-5 mr-2" />
              ) : null}
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>
            <div className="space-y-2 text-center">
              <p className="text-sm text-muted-foreground">
                Didn&apos;t receive a code?{" "}
                <button
                  onClick={handleResendCode}
                  disabled={resendDisabled}
                  className="text-primary hover:underline font-medium transition-colors duration-300 disabled:opacity-50"
                >
                  {resendDisabled
                    ? `Resend in ${resendCountdown}s`
                    : "Resend code"}
                </button>
              </p>
              <Link
                href="/sign-in"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

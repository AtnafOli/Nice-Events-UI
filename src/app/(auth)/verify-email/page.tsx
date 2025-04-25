"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
import { cn } from "@/lib/utils";
import { authService } from "@/services/auth.service";
import { toast } from "@/hooks/use-toast";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function EmailVerification() {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const getRedirectUrl = () => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("redirectUrl");
    }
    return null;
  };

  useEffect(() => {
    if (email) {
      inputs.current[0]?.focus();
    }
  }, [email]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    } else if (resendCountdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown, resendDisabled]);

  const handleInputChange = useCallback(
    (index: number, value: string) => {
      if (!/^[0-9]?$/.test(value)) return;

      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < code.length - 1) {
        inputs.current[index + 1]?.focus();
      }
    },
    [code]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (!code[index] && index > 0) {
          inputs.current[index - 1]?.focus();
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        inputs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < code.length - 1) {
        e.preventDefault();
        inputs.current[index + 1]?.focus();
      }
    },
    [code]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text")
        .trim()
        .slice(0, code.length);
      if (!/^[0-9]+$/.test(pastedData)) return;

      const newCode = [...code];
      pastedData.split("").forEach((char, index) => {
        if (index < code.length) {
          newCode[index] = char;
        }
      });
      setCode(newCode);

      const firstEmptyIndex = newCode.findIndex((val) => !val);
      const focusIndex =
        firstEmptyIndex === -1
          ? code.length - 1
          : Math.min(pastedData.length, firstEmptyIndex);
      inputs.current[focusIndex]?.focus();
    },
    [code]
  );

  const handleVerify = async () => {
    if (!email) {
      toast({
        title: "Missing Information",
        description: "Email address not found. Please go back and try again.",
        variant: "destructive",
      });
      return;
    }

    const verificationCode = code.join("");
    if (verificationCode.length !== code.length) {
      toast({
        title: "Incomplete Code",
        description: `Please enter all ${code.length} digits of the verification code.`,
        variant: "destructive",
      });

      const firstEmpty = code.findIndex((c) => c === "");
      if (firstEmpty !== -1) inputs.current[firstEmpty]?.focus();
      return;
    }

    setIsLoading(true);

    try {
      await authService.verifyEmail({
        email,
        code: verificationCode,
      });

      toast({
        title: "Success!",
        description: "Your email has been verified successfully.",
        variant: "default",
      });

      const redirectUrl = getRedirectUrl();
      if (redirectUrl) {
        router.push(`/sign-in?redirectUrl=${redirectUrl}`);
      } else {
        router.push("/sign-in");
      }
    } catch (err: any) {
      toast({
        title: "Verification Failed",
        description:
          err?.response?.data?.message ||
          "Invalid verification code. Please check the code and try again.",
        variant: "destructive",
      });

      setCode(Array(code.length).fill(""));
      inputs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email || resendDisabled) return;

    setIsLoading(true);
    setResendDisabled(true);

    try {
      await authService.resendVerificationCode(email);
      toast({
        title: "Code Resent",
        description: "A new verification code has been sent to your email.",
        variant: "default",
      });
      setResendCountdown(60);
      setCode(Array(code.length).fill(""));
      inputs.current[0]?.focus();
    } catch (err: any) {
      toast({
        title: "Resend Failed",
        description:
          err?.response?.data?.message ||
          "Could not resend code. Please try again in a minute.",
        variant: "destructive",
      });
      setResendDisabled(false);
      setResendCountdown(0);
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 text-center">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              No email address was provided for verification.
            </p>
            <Button asChild>
              <Link href="/sign-up">Go back to Sign Up</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Main animation container */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md"
      >
        {/* Use a softer shadow, e.g., shadow-lg */}
        <Card className="w-full shadow-lg border-border/50">
          <CardHeader className="items-center text-center space-y-3 pt-8">
            <motion.div variants={itemVariants}>
              {/* Slightly larger icon container */}
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                <Mail className="h-8 w-8 text-primary" />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl md:text-3xl font-semibold tracking-tight">
                Check Your Email
              </CardTitle>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardDescription className="text-muted-foreground px-4">
                We've sent a 6-digit verification code to{" "}
                <span className="font-medium text-foreground">{email}</span>.
                Please enter it below.
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6 pb-8 px-6 md:px-8">
            {/* Input group with motion */}
            <motion.div
              variants={containerVariants}
              className="flex gap-3 justify-center"
              onPaste={handlePaste}
            >
              {code.map((digit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex-1 max-w-[4rem]"
                >
                  <Input
                    ref={(el) => {
                      inputs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={cn(
                      "w-full h-14 md:h-16",
                      "text-center text-2xl md:text-3xl font-semibold",
                      "bg-background border border-input",
                      "focus:border-primary focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:outline-none",
                      "transition-all duration-200 ease-in-out",
                      "rounded-md shadow-sm"
                    )}
                    maxLength={1}
                    aria-label={`Verification code digit ${index + 1}`}
                    autoComplete="one-time-code"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Verify button with motion */}
            <motion.div variants={itemVariants}>
              <Button
                onClick={handleVerify}
                disabled={isLoading || code.join("").length !== code.length}
                className="w-full h-11 text-base font-medium transition-all duration-300 ease-in-out"
                size="lg"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                ) : null}
                {isLoading ? "Verifying..." : "Verify Code"}
              </Button>
            </motion.div>

            {/* Resend/Back links with motion */}
            <motion.div
              variants={itemVariants}
              className="space-y-3 text-center pt-2"
            >
              <p className="text-sm text-muted-foreground">
                Didn't receive the code?{" "}
                <button
                  onClick={handleResendCode}
                  disabled={resendDisabled || isLoading}
                  className={cn(
                    "font-medium text-primary hover:text-primary/80 transition-colors duration-200",
                    "disabled:text-muted-foreground disabled:cursor-not-allowed disabled:hover:text-muted-foreground"
                  )}
                >
                  {resendDisabled
                    ? `Resend in ${resendCountdown}s`
                    : "Resend code"}
                </button>
              </p>
              <Link
                href="/sign-in"
                className={cn(
                  "inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors duration-200",
                  isLoading && "pointer-events-none opacity-50"
                )}
              >
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                Back to Sign In
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

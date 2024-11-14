"use client";

import { useState } from "react";
import { AuthGuard } from "@/components/auth/authGuard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInForm from "@/components/forms/sign-in-form";
import { CalendarIcon, UserIcon } from "lucide-react";

export default function EventSignInPage() {
  const [activeTab, setActiveTab] = useState("customer");

  return (
    <AuthGuard>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              Welcome to NiceEvents
            </CardTitle>
            <CardDescription>
              Sign in or create an account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/20 p-1 rounded-full">
                <TabsTrigger
                  value="customer"
                  className="rounded-full data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300 ease-in-out"
                >
                  <UserIcon className="w-4 h-4 mr-2" />
                  Customer
                </TabsTrigger>
                <TabsTrigger
                  value="vendor"
                  className="rounded-full data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-300 ease-in-out"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Vendor
                </TabsTrigger>
              </TabsList>
              <TabsContent value="customer">
                <CustomerSignIn />
              </TabsContent>
              <TabsContent value="vendor">
                <VendorSignIn />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
}

function CustomerSignIn() {
  return (
    <div className="space-y-4">
      <Button variant="outline" className="w-full bg-white hover:bg-accent/10">
        <svg
          className="w-5 h-5 mr-2"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_13183_10121)">
            <path
              d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
              fill="#3F83F8"
            ></path>
            <path
              d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
              fill="#34A853"
            ></path>
            <path
              d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
              fill="#FBBC04"
            ></path>
            <path
              d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
              fill="#EA4335"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_13183_10121">
              <rect
                width="20"
                height="20"
                fill="white"
                transform="translate(0.5)"
              ></rect>
            </clipPath>
          </defs>
        </svg>
        Sign in with Google
      </Button>
      <Separator className="my-4" />
      <SignInForm />
      <div className="mt-6 space-y-2 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary hover:underline">
            Sign Up
          </a>
        </p>
        <a
          href="/forgot-password"
          className="text-sm text-accent hover:underline"
        >
          Forgot your password?
        </a>
      </div>
    </div>
  );
}

function VendorSignIn() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center mb-4">
        Become a Vendor
      </h3>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Join our platform and start showcasing your events to thousands of
        potential customers.
      </p>
      <Button className="w-full bg-primary text-white">
        Apply as a Vendor
      </Button>
      <p className="text-xs text-muted-foreground text-center mt-4">
        Already a vendor?{" "}
        <a href="/vendor-login" className="text-primary hover:underline">
          Sign in here
        </a>
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/userContext";
import { authService } from "@/services/auth.service";
import {
  MapPin,
  Phone,
  CreditCard,
  User,
  Mail,
  Shield,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { SubscriptionModel } from "@/types/subscription";

const calculateProgress = (startDate: string, endDate: string): number => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = Date.now();
  return Math.round(((now - start) / (end - start)) * 100);
};

const DesignAgencyProfile = () => {
  const { user } = useUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("profile");
  const router = useRouter();

  if (!user) return null;

  const { Profile, Subscriptions, Vendor, role } = user;
  const currentSubscription = Subscriptions?.[0] as SubscriptionModel;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authService.signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 lg:mt-24 mt-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24 border-4 border-primary shadow-lg">
                <AvatarImage
                  src={Profile?.avatarUrl || undefined}
                  alt={`${Profile?.firstName} ${Profile?.lastName}`}
                />
                <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                  {Profile?.firstName?.[0]}
                  {Profile?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-5xl font-bold tracking-tight mb-2 text-foreground">
                  {Profile?.firstName} {Profile?.lastName}
                </h1>
                <div className="text-xl text-muted-foreground">
                  {user.email}
                </div>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              {isLoggingOut ? "Logging out..." : "Log out"}{" "}
              <LogOut className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Tabs */}
        <Tabs
          defaultValue="profile"
          className="w-full"
          onValueChange={setActiveTab}
        >
          {/* Tabs List */}
          <TabsList className="flex justify-start space-x-4 mb-12 border-b border-border">
            <TabsTrigger
              value="profile"
              className="text-lg pb-4 px-1 text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all duration-300"
            >
              Profile
            </TabsTrigger>

            {role === "vendor" && (
              <TabsTrigger
                value="subscription"
                className="text-lg pb-4 px-1 text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all duration-300"
              >
                Subscription
              </TabsTrigger>
            )}
            {role === "vendor" && (
              <TabsTrigger
                value="business"
                className="text-lg pb-4 px-1 text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all duration-300"
              >
                Business
              </TabsTrigger>
            )}
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-8">
            <Card>
              <CardContent>
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <User className="mr-2" size={24} /> Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="mr-2" size={18} />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2" size={18} />
                      <span>{Profile?.phoneNumber}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {Profile?.city && (
                      <div className="flex items-center">
                        <MapPin className="mr-2" size={18} />
                        <span>
                          {Profile?.city}, {Profile?.country}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Shield className="mr-2" size={18} />
                      <span>Role:</span>
                      <Badge className="ml-2 bg-secondary text-secondary-foreground">
                        {role}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {currentSubscription && (
            <TabsContent value="subscription" className="space-y-8">
              <Card>
                <CardContent>
                  <h2 className="text-2xl font-semibold mb-4 flex items-center">
                    <CreditCard className="mr-2" size={24} /> Subscription
                    Details
                  </h2>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xl mb-2">Plan:</div>
                        <Badge variant="outline">
                          {currentSubscription?.planId}
                        </Badge>
                      </div>
                      <Button className="bg-primary hover:bg-primary/90">
                        Manage Subscription{" "}
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                    <Progress
                      value={calculateProgress(
                        currentSubscription.startDate,
                        currentSubscription.endDate
                      )}
                      className="h-3"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Business Tab (Vendor Only) */}
          {role === "vendor" && (
            <TabsContent value="business">
              {/* Business Info */}
              {/* Add Vendor Details */}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default DesignAgencyProfile;

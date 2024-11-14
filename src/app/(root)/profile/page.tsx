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
  CalendarDays,
  MapPin,
  Phone,
  Building,
  CreditCard,
  User,
  Mail,
  Shield,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DesignAgencyProfile() {
  const { user } = useUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter();

  if (!user) return null;

  const { Profile, Subscriptions, Vendor, role } = user;
  const currentSubscription = Subscriptions[0];

  const subscriptionProgress = () => {
    const start = new Date(currentSubscription.startDate).getTime();
    const end = new Date(currentSubscription.endDate).getTime();
    const now = new Date().getTime();
    return Math.round(((now - start) / (end - start)) * 100);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authService.signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 lg:mt-16 mt-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24 border-4 border-primary shadow-lg">
                <AvatarImage
                  src={Profile.avatarUrl || undefined}
                  alt={`${Profile.firstName} ${Profile.lastName}`}
                />
                <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                  {Profile.firstName[0]}
                  {Profile.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-5xl font-bold tracking-tight mb-2 text-foreground">
                  {Profile.firstName} {Profile.lastName}
                </h1>
                <div className="text-xl text-muted-foreground">
                  {user.email}
                </div>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-6 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {isLoggingOut ? "Logging out..." : "Log out"}{" "}
              <LogOut className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </header>

        <Tabs
          defaultValue="profile"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="flex justify-start space-x-4 mb-12 border-b border-border">
            <TabsTrigger
              value="profile"
              className="text-lg pb-4 px-1 text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all duration-300"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="subscription"
              className="text-lg pb-4 px-1 text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all duration-300"
            >
              Subscription
            </TabsTrigger>
            {role === "vendor" && (
              <TabsTrigger
                value="business"
                className="text-lg pb-4 px-1 text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary transition-all duration-300"
              >
                Business
              </TabsTrigger>
            )}
          </TabsList>

          <div className="space-y-8">
            <TabsContent value="profile" className="space-y-8">
              <Card className="bg-card text-card-foreground">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center text-foreground">
                    <User className="mr-2" size={24} /> Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center text-muted-foreground">
                        <Mail className="mr-2" size={18} />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Phone className="mr-2" size={18} />
                        <span>{Profile.phoneNumber}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {Profile.city && (
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="mr-2" size={18} />
                          <span>
                            {Profile.city}, {Profile.country}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center text-muted-foreground">
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

            <TabsContent value="subscription" className="space-y-8">
              <Card className="bg-card text-card-foreground">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center text-foreground">
                    <CreditCard className="mr-2" size={24} /> Subscription
                    Details
                  </h2>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xl mb-2 text-foreground">
                          Plan:{" "}
                          <Badge variant="outline" className="ml-2 text-lg">
                            {currentSubscription.planId}
                          </Badge>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <CalendarDays className="mr-2" size={18} />
                          <span>
                            Expires:{" "}
                            {new Date(
                              currentSubscription.endDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
                        Manage Subscription{" "}
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Subscription Progress
                      </div>
                      <Progress
                        value={subscriptionProgress()}
                        className="h-3 bg-secondary/30"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {role === "vendor" && (
              <TabsContent value="business" className="space-y-8">
                <Card className="bg-card text-card-foreground">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center text-foreground">
                      <Building className="mr-2" size={24} /> Business
                      Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="font-medium text-muted-foreground">
                          Business Name
                        </div>
                        <div className="text-xl text-foreground">
                          {Vendor.businessName}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-muted-foreground">
                          Business Phone
                        </div>
                        <div className="text-xl text-foreground">
                          {Vendor.businessPhone}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <div className="font-medium text-muted-foreground">
                          Business Description
                        </div>
                        <div className="text-muted-foreground">
                          {Vendor.businessDescription}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-muted-foreground">
                          Verification Status
                        </div>
                        <Badge
                          variant={
                            Vendor.verificationStatus === "verified"
                              ? "default"
                              : "secondary"
                          }
                          className="text-lg px-4 py-1"
                        >
                          {Vendor.verificationStatus}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
}

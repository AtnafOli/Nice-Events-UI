"use client";

import { useEffect, useState } from "react";
import {
  dashboardService,
  VendorDashboardData,
  VendorDashboardResponse,
} from "@/services/dashboard.service";
import { format } from "date-fns";
import {
  CalendarIcon,
  CreditCard,
  Package,
  UserRound,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const [data, setData] = useState<VendorDashboardData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await dashboardService.getVendorDashBoard();
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  // Find the active subscription (with payment status "paid")
  const getActiveSubscription = () => {
    if (!data?.subscriptions || data.subscriptions.length === 0) return null;
    return (
      data.subscriptions.find((sub) => sub.paymentStatus === "paid") || null
    );
  };

  const activeSubscription = data ? getActiveSubscription() : null;

  if (loading) {
    return (
      <div className="p-8 space-y-8">
        <Skeleton className="h-10 w-1/4" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-[500px] rounded-xl" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-8 flex flex-col items-center justify-center h-[60vh] space-y-4 text-center">
        <Package className="h-12 w-12 text-rose-500" />
        <h2 className="text-2xl font-bold">Failed to load dashboard</h2>
        <p className="text-muted-foreground">Please try refreshing the page</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/20">
      <div className="flex-1 space-y-8 p-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Dashboard Overview
            </h2>
            <p className="text-muted-foreground">
              {format(new Date(), "EEEE, MMMM do, yyyy")}
            </p>
          </div>
          <Button asChild>
            <Link
              href="/vendor/service/manage"
              className="flex items-center gap-2"
            >
              <Package className="h-4 w-4" />
              Add New Service
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* New Requests Card */}
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  New Requests
                </CardTitle>
                <CardDescription className="text-2xl font-bold mt-1">
                  {data.newRequests.length}
                </CardDescription>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                <UserRound className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">
                {data.newRequests.length > 0
                  ? `Latest from ${data.newRequests[0].firstName}`
                  : "No new requests"}
              </p>
            </CardContent>
          </Card>

          {/* Subscription Card - Only show active subscription */}
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Subscription
                </CardTitle>
                <CardDescription className="text-2xl font-bold mt-1">
                  {activeSubscription
                    ? activeSubscription.plan.name
                    : "No Active Plan"}
                </CardDescription>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30">
                <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">
                {activeSubscription
                  ? `Valid until ${format(
                      new Date(activeSubscription.endDate),
                      "MMM dd, yyyy"
                    )}`
                  : "No active subscription"}
              </p>
            </CardContent>
          </Card>

          {/* Active Services Card */}
          <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Services
                </CardTitle>
                <CardDescription className="text-2xl font-bold mt-1">
                  {data.activeServices.length}
                </CardDescription>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/30">
                <Package className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">
                {data.activeServices.length > 0
                  ? `${data.activeServices.length} services available`
                  : "No active services"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="bg-transparent p-0 border-b rounded-none w-full justify-start gap-6">
            <TabsTrigger
              value="requests"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-3"
            >
              New Requests
              {data.newRequests.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {data.newRequests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="subscription"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-3"
            >
              Subscription
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-3"
            >
              Active Services
            </TabsTrigger>
          </TabsList>

          {/* New Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            {data.newRequests.length > 0 ? (
              <div className="space-y-4">
                {data.newRequests.map((request) => (
                  <Card
                    key={request.id}
                    className="border-none shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {request.firstName} {request.lastName}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            For {request.service.name}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {request.status.toLowerCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Contact</div>
                          <div className="text-sm text-muted-foreground">
                            {request.email}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {request.phoneNumber}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Event Date</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarIcon className="h-4 w-4" />
                            {format(
                              new Date(request.eventDate),
                              "MMMM dd, yyyy"
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="text-sm font-medium">Event Details</div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {request.eventDetails}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-none shadow-sm text-center py-12">
                <CardHeader>
                  <Package className="mx-auto h-10 w-10 text-muted-foreground" />
                  <CardTitle className="mt-4">No New Requests</CardTitle>
                  <CardDescription className="mt-2">
                    You don't have any new service requests at the moment.
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </TabsContent>

          {/* Subscription Tab - Show all subscriptions but highlight the active one */}
          <TabsContent value="subscription" className="space-y-4">
            {data.subscriptions.length > 0 ? (
              <div className="space-y-6">
                {activeSubscription && (
                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>
                          {activeSubscription.plan.name} Plan
                        </CardTitle>
                        <Badge variant="default">Active Plan</Badge>
                      </div>
                      <CardDescription>
                        {activeSubscription.plan.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Start Date</p>
                          <p className="text-sm text-muted-foreground">
                            {format(
                              new Date(activeSubscription.startDate),
                              "MMMM dd, yyyy"
                            )}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">End Date</p>
                          <p className="text-sm text-muted-foreground">
                            {format(
                              new Date(activeSubscription.endDate),
                              "MMMM dd, yyyy"
                            )}
                          </p>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Status</p>
                          <Badge
                            variant={
                              activeSubscription.status === "active"
                                ? "default"
                                : "destructive"
                            }
                            className="capitalize"
                          >
                            {activeSubscription.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Payment Status</p>
                          <Badge
                            variant={
                              activeSubscription.paymentStatus === "paid"
                                ? "default"
                                : "destructive"
                            }
                            className="capitalize"
                          >
                            {activeSubscription.paymentStatus}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Price</p>
                        <p className="text-3xl font-bold">
                          ETB{" "}
                          {activeSubscription.plan.basePrice.toLocaleString()}
                        </p>
                      </div>
                    </CardContent>
                    {/* <CardFooter className="flex justify-between">
                      <Button variant="outline" asChild>
                        <Link href="/subscription/upgrade">Upgrade Plan</Link>
                      </Button>
                      <Button variant="ghost" asChild>
                        <Link
                          href="/subscription/details"
                          className="flex items-center gap-1"
                        >
                          View Details <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter> */}
                  </Card>
                )}

                {!activeSubscription && (
                  <Card className="border-none shadow-sm text-center py-8">
                    <CardHeader>
                      <CreditCard className="mx-auto h-10 w-10 text-muted-foreground" />
                      <CardTitle className="mt-4">
                        No Active Subscription
                      </CardTitle>
                      <CardDescription className="mt-2">
                        You have subscriptions but none are currently active
                        (paid).
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-center">
                      <Button asChild>
                        <Link href="/subscription/plans">View Plans</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {/* {data.subscriptions.length > 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Other Subscriptions</h3>
                    {data.subscriptions
                      .filter((sub) => sub.paymentStatus !== "paid")
                      .map((subscription) => (
                        <Card
                          key={subscription.id}
                          className="border-none shadow-sm"
                        >
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle>
                                {subscription.plan.name} Plan
                              </CardTitle>
                              <Badge variant="outline" className="capitalize">
                                {subscription.paymentStatus}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium">
                                  Plan Price
                                </p>
                                <p className="text-lg font-semibold">
                                  ETB{" "}
                                  {subscription.plan.basePrice.toLocaleString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">Status</p>
                                <p className="text-sm text-muted-foreground capitalize">
                                  {subscription.status}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              asChild
                            >
                              <Link
                                href={`/subscription/${subscription.id}/complete-payment`}
                              >
                                Complete Payment
                              </Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                )} */}
              </div>
            ) : (
              <Card className="border-none shadow-sm text-center py-12">
                <CardHeader>
                  <CreditCard className="mx-auto h-10 w-10 text-muted-foreground" />
                  <CardTitle className="mt-4">No Active Subscription</CardTitle>
                  <CardDescription className="mt-2">
                    You don't have any active subscription plans.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center">
                  <Button asChild>
                    <Link href="/subscription/plans">View Plans</Link>
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          {/* Active Services Tab */}
          <TabsContent value="services" className="space-y-4">
            {data.activeServices.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {data.activeServices.map((service) => (
                  <Card
                    key={service.id}
                    className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="aspect-video w-full relative overflow-hidden">
                      {service.images && service.images.length > 0 ? (
                        <Image
                          src={
                            service.images[service.primaryImageIndex || 0]
                              .imageUrl
                          }
                          alt={service.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-muted">
                          <Package className="h-10 w-10 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle>{service.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">
                        ETB {service.basicPrice.toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-none shadow-sm text-center py-12">
                <CardHeader>
                  <Package className="mx-auto h-10 w-10 text-muted-foreground" />
                  <CardTitle className="mt-4">No Active Services</CardTitle>
                  <CardDescription className="mt-2">
                    You don't have any active services. Add a new service to get
                    started.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center">
                  <Button asChild>
                    <Link href="/vendor/service/manage">Add New Service</Link>
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

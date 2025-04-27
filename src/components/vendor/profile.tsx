"use client";

import { useState } from "react";
import { format } from "date-fns";

import {
  Pencil,
  ShieldCheck,
  Building2,
  UserCircle,
  WalletCards,
} from "lucide-react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import { VendorForm } from "./vendor-forms";
import { ProfileForm } from "./profile-form";
import ServiceCard from "../services/service_card";

export function VendorProfile({ vendorData }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [editSection, setEditSection] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { Profile, Vendor, Subscriptions } = vendorData;

  const SectionSkeleton = () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </CardContent>
    </Card>
  );

  if (isLoading)
    return (
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <Skeleton className="h-10 w-64" />
        <div className="space-y-6">
          <SectionSkeleton />
          <SectionSkeleton />
          <SectionSkeleton />
        </div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Building2 className="w-8 h-8" />
            {Vendor.businessName}
          </h1>
          <p className="text-muted-foreground mt-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <Badge
              variant={
                Vendor.verificationStatus === "verified"
                  ? "default"
                  : "secondary"
              }
            >
              {Vendor.verificationStatus}
            </Badge>
          </p>
        </div>
        <Button size="lg" onClick={() => setEditSection("vendor")}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit Business
        </Button>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-muted/50 h-14">
          <TabsTrigger
            value="profile"
            className="py-4 data-[state=active]:bg-background"
          >
            <UserCircle className="w-5 h-5 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="business"
            className="py-4 data-[state=active]:bg-background"
          >
            <Building2 className="w-5 h-5 mr-2" />
            Business
          </TabsTrigger>
          <TabsTrigger
            value="subscription"
            className="py-4 data-[state=active]:bg-background"
          >
            <WalletCards className="w-5 h-5 mr-2" />
            Subscription
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-0 shadow-none">
            <CardHeader className="flex-row justify-between items-center px-0 py-6">
              <CardTitle className="text-2xl">Personal Profile</CardTitle>
              <Button variant="ghost" onClick={() => setEditSection("profile")}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </CardHeader>
            <CardContent className="px-0">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHead className="w-[200px]">Full Name</TableHead>
                    <TableCell>
                      {Profile.firstName} {Profile.lastName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Contact Email</TableHead>
                    <TableCell>{vendorData.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Phone Number</TableHead>
                    <TableCell>{Profile.phoneNumber}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business">
          <Card className="border-0 shadow-none">
            <CardHeader className="flex-row justify-between items-center px-0 py-6">
              <CardTitle className="text-2xl">Business Details</CardTitle>
              <Button variant="ghost" onClick={() => setEditSection("vendor")}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Business
              </Button>
            </CardHeader>
            <CardContent className="px-0">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHead className="w-[200px]">Business Name</TableHead>
                    <TableCell>{Vendor.businessName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableCell className="whitespace-pre-line">
                      {Vendor.businessDescription || "No description provided"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Business Phone</TableHead>
                    <TableCell>{Vendor.businessPhone}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Bank Details</TableHead>
                    <TableCell className="font-mono">
                      {Vendor.bankAccountDetails || "Not provided"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card className="border-0 shadow-none">
            <CardHeader className="px-0 py-6">
              <CardTitle className="text-2xl">Subscription Plan</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="flex items-center justify-between p-6 bg-muted/50 rounded-lg">
                <div>
                  <h3 className="text-xl font-semibold">
                    {Subscriptions[0].plan?.name} Plan
                  </h3>
                  <p className="text-muted-foreground">
                    {format(
                      new Date(Subscriptions[0]?.startDate),
                      "MMM dd, yyyy"
                    )}{" "}
                    -
                    {format(
                      new Date(Subscriptions[0]?.endDate),
                      "MMM dd, yyyy"
                    )}
                  </p>
                </div>
                <Badge variant="outline" className="px-4 py-2 text-sm">
                  {Subscriptions[0].status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Dialogs */}
      <Dialog
        open={!!editSection}
        onOpenChange={(open) => !open && setEditSection(null)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Edit{" "}
              {editSection?.charAt(0).toUpperCase() + editSection?.slice(1)}
            </DialogTitle>
          </DialogHeader>

          {editSection === "profile" && (
            <ProfileForm
              initialData={Profile}
              onSave={() => {
                setEditSection(null);
                // Add save logic
              }}
            />
          )}

          {editSection === "vendor" && (
            <VendorForm
              initialData={Vendor}
              onSave={() => {
                setEditSection(null);
                // Add save logic
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

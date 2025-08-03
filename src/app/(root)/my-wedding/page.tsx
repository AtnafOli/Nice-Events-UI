"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  CheckCircle2,
  Gift,
  Heart,
  ListTodo,
  MapPin,
  PartyPopper,
  Users,
} from "lucide-react";

export default function MyWeddingPage() {
  const [date, setDate] = useState(new Date(2025, 8, 15));
  const [progress, setProgress] = useState(45);

  const daysLeft = Math.ceil(
    (new Date(2025, 8, 15) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Wedding</h1>
          <p className="text-muted-foreground mt-1">
            Plan your perfect day, all in one place
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-3 py-1.5"
          >
            <CalendarDays className="h-4 w-4" />
            <span>{daysLeft} days left</span>
          </Badge>
          <Button>Preview Site</Button>
          <Button variant="outline">Share</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Wedding Progress</CardTitle>
              <CardDescription>
                You're {progress}% done with your planning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="h-2 mb-6" />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <ProgressCard
                  title="Venue"
                  icon={<MapPin className="h-5 w-5" />}
                  complete={true}
                />
                <ProgressCard
                  title="Guest List"
                  icon={<Users className="h-5 w-5" />}
                  complete={true}
                />
                <ProgressCard
                  title="Registry"
                  icon={<Gift className="h-5 w-5" />}
                  complete={false}
                />
                <ProgressCard
                  title="Invitations"
                  icon={<PartyPopper className="h-5 w-5" />}
                  complete={false}
                />
                <ProgressCard
                  title="Wedding Party"
                  icon={<Heart className="h-5 w-5" />}
                  complete={true}
                />
                <ProgressCard
                  title="Timeline"
                  icon={<ListTodo className="h-5 w-5" />}
                  complete={false}
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Wedding Details</TabsTrigger>
              <TabsTrigger value="guests">Guest Management</TabsTrigger>
              <TabsTrigger value="tasks">To-Do List</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Wedding Details</CardTitle>
                  <CardDescription>
                    Manage your wedding information and customize your site
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailItem
                      label="Date"
                      value="September 15, 2025"
                      icon={
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      }
                    />
                    <DetailItem
                      label="Venue"
                      value="Grand Plaza Hotel"
                      icon={
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                      }
                    />
                    <DetailItem
                      label="Ceremony Time"
                      value="4:00 PM"
                      icon={
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      }
                    />
                    <DetailItem
                      label="Reception"
                      value="6:00 PM - 11:00 PM"
                      icon={
                        <PartyPopper className="h-4 w-4 text-muted-foreground" />
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Edit Wedding Details
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="guests" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Guest Management</CardTitle>
                  <CardDescription>
                    Track RSVPs, manage guest list, and organize seating
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Total Guests</h3>
                        <p className="text-sm text-muted-foreground">
                          120 invited
                        </p>
                      </div>
                      <div className="text-2xl font-bold">78</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-center">
                        <div className="text-xl font-semibold">45</div>
                        <div className="text-sm text-muted-foreground">
                          Attending
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-semibold">12</div>
                        <div className="text-sm text-muted-foreground">
                          Declined
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-semibold">63</div>
                        <div className="text-sm text-muted-foreground">
                          Pending
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Manage Guest List</Button>
                  <Button>Send Invitations</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="tasks" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>To-Do List</CardTitle>
                  <CardDescription>
                    Track your planning progress with tasks and deadlines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <TaskItem
                      title="Book photographer"
                      dueDate="July 20, 2025"
                      complete={true}
                    />
                    <TaskItem
                      title="Order wedding cake"
                      dueDate="August 15, 2025"
                      complete={false}
                    />
                    <TaskItem
                      title="Send invitations"
                      dueDate="June 30, 2025"
                      complete={false}
                    />
                    <TaskItem
                      title="Final dress fitting"
                      dueDate="August 30, 2025"
                      complete={false}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Tasks
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Wedding Date</CardTitle>
              <CardDescription>September 15, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wedding Party</CardTitle>
              <CardDescription>Your special people</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Bride's Side
                </h3>
                <div className="flex flex-wrap gap-3">
                  <WeddingPartyMember name="Emma" role="Maid of Honor" />
                  <WeddingPartyMember name="Sophia" role="Bridesmaid" />
                  <WeddingPartyMember name="Olivia" role="Bridesmaid" />
                </div>

                <h3 className="text-sm font-medium text-muted-foreground mt-6">
                  Groom's Side
                </h3>
                <div className="flex flex-wrap gap-3">
                  <WeddingPartyMember name="James" role="Best Man" />
                  <WeddingPartyMember name="William" role="Groomsman" />
                  <WeddingPartyMember name="Noah" role="Groomsman" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Edit Wedding Party
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ProgressCard({ title, icon, complete }) {
  return (
    <div
      className={`border rounded-lg p-4 flex items-center justify-between ${
        complete ? "bg-green-50/50 dark:bg-green-950/20" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-full text-primary">
          {icon}
        </div>
        <span className="font-medium">{title}</span>
      </div>
      {complete && <CheckCircle2 className="h-5 w-5 text-green-600" />}
    </div>
  );
}

function DetailItem({ label, value, icon }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
        {icon}
        <span>{label}</span>
      </div>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function TaskItem({ title, dueDate, complete }) {
  return (
    <div className="flex items-center justify-between border-b pb-3">
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            complete
              ? "border-green-600 bg-green-600/20"
              : "border-muted-foreground"
          }`}
        >
          {complete && <CheckCircle2 className="h-3 w-3 text-green-600" />}
        </div>
        <span
          className={`font-medium ${
            complete ? "line-through text-muted-foreground" : ""
          }`}
        >
          {title}
        </span>
      </div>
      <span className="text-sm text-muted-foreground">{dueDate}</span>
    </div>
  );
}

function WeddingPartyMember({ name, role }) {
  return (
    <div className="flex flex-col items-center">
      <Avatar className="h-16 w-16 mb-2">
        <AvatarImage src="" alt={name} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {name[0]}
        </AvatarFallback>
      </Avatar>
      <span className="font-medium text-sm">{name}</span>
      <span className="text-xs text-muted-foreground">{role}</span>
    </div>
  );
}

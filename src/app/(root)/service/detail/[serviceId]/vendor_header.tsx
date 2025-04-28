import {
  Heart,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Globe,
  Phone,
  MapPin,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Service } from "@/types/service";

export default function VendorHeader({
  service,
  serviceName,
  vendorAddress,
}: {
  service: Service;
  serviceName: string;
  vendorAddress: {
    city?: string;
    country?: string;
  };
}) {
  const reviews = service.reviewService || [];

  const reviewCount = reviews.length;
  const averageRating = reviewCount
    ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
      reviewCount
    : 0;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6 bg-background/60 backdrop-blur-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h1 className="md:text-4xl text-xl font-bold text-black">
            {serviceName}
          </h1>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <p className="text-sm">
              {vendorAddress.city + " " + vendorAddress.country}
            </p>
          </div>
        </div>
        {/* <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
          >
            <Heart className="h-5 w-5" />
            <span className="sr-only">Save to favorites</span>
          </Button>
        </div> */}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5.5 w-5.5 ${
                i < Math.round(averageRating)
                  ? "fill-accent text-accent"
                  : "fill-gray-400 text-gray-200"
              }`}
            />
          ))}
          <span className="text-base font-medium text-gray-600 ml-1">
            {averageRating.toFixed(1)} ({reviewCount})
          </span>
        </div>
      </div>

      {/* <div className="flex flex-wrap gap-3">
        {[
          { icon: Facebook, label: "Facebook", href: "#" },
          { icon: Twitter, label: "Twitter", href: "#" },
          { icon: Instagram, label: "Instagram", href: "#" },
          { icon: Globe, label: "Website", href: "#" },
          { icon: Phone, label: "Call Now", href: "tel:+1234567890" },
        ].map(({ icon: Icon, label, href }) => (
          <Button
            key={label}
            variant="outline"
            size="sm"
            className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300 ease-in-out transform hover:scale-105"
            asChild
          >
            <Link href={href}>
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </Link>
          </Button>
        ))}
      </div> */}
    </div>
  );
}

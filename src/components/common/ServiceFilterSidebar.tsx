"use client";

import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ServiceFilterSidebarProps {
  onFilterChange: (filters: any) => void;
}

const ServiceFilterSidebar: React.FC<ServiceFilterSidebarProps> = ({
  onFilterChange,
}) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [location, setLocation] = useState("");

  const handleFilterChange = () => {
    onFilterChange({
      priceRange,
      rating: selectedRating,
      location,
    });
  };

  return (
    <div className="bg-card/30 p-6 rounded-lg shadow-md space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Filters</h3>
      </div>

      <div>
        <Label className="text-sm font-medium text-foreground mb-2">
          Price Range
        </Label>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="my-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium text-foreground mb-2">
          Rating
        </Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Badge
              key={rating}
              variant={selectedRating === rating ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() =>
                setSelectedRating(selectedRating === rating ? null : rating)
              }
            >
              {rating}★
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label
          htmlFor="location"
          className="text-sm font-medium text-foreground mb-2"
        >
          Location
        </Label>
        <Input
          id="location"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1"
        />
      </div>

      <Button
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        onClick={handleFilterChange}
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default ServiceFilterSidebar;

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VendorDescriptionProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function VendorDescription({
  title,
  subtitle,
  description,
}: VendorDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="max-w-6xl mx-auto bg-transparent shadow-none ">
      <CardHeader className="px-4">
        <CardTitle className="md:text-xl text-base font-bold text-black">
          {title}
        </CardTitle>
        <h2 className="text-sm font-mono text-muted-foreground">{subtitle}</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`prose prose-gray dark:prose-invert ${
            !isExpanded && "line-clamp-3"
          }`}
        >
          <p>{description}</p>
        </div>
        <Button
          variant="link"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-0 h-auto font-semibold text-primary hover:no-underline"
        >
          {isExpanded ? "Show less" : "Read more"}
        </Button>
      </CardContent>
    </Card>
  );
}

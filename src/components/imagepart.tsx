"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ImageInterace } from "@/types/image";

export default function Component({
  images = [],
}: {
  images?: ImageInterace[];
}) {
  const getGridLayout = (imageCount: number) => {
    switch (imageCount) {
      case 0:
        return "hidden";
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-2";
      default:
        return "grid-cols-2 md:grid-cols-4";
    }
  };

  const getImageSpan = (index: number, totalImages: number) => {
    if (totalImages === 1) {
      return "col-span-1 min-h-[450px]";
    }
    if (totalImages === 2) {
      return "col-span-1 min-h-[450px]";
    }
    if (totalImages === 3) {
      return index === 0
        ? "col-span-1 row-span-2 min-h-[450px]"
        : "col-span-1 min-h-[225px]";
    }
    return index === 0
      ? "col-span-2 row-span-2 min-h-[450px]"
      : "col-span-1 min-h-[225px]";
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="w-full rounded-xl bg-transparent">
      <div className={`grid gap-2 ${getGridLayout(images.length)}`}>
        {images.map((image, index) => (
          <div key={index} className={getImageSpan(index, images.length)}>
            <Card className="overflow-hidden group h-full">
              <CardContent className="p-0 relative w-full h-full">
                <Image
                  src={image.imageUrl}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes={
                    index === 0 && images.length > 2
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 50vw, 25vw"
                  }
                />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

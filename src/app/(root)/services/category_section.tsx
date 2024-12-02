import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ServiceCard from "@/components/services/service_card";
import { Service } from "@/types/service";
import { Button } from "@/components/ui/button";

interface CategorySectionProps {
  category: {
    id: number;
    name: string;
    description?: string;
    services: Service[];
  };
}

export default function CategorySection({ category }: CategorySectionProps) {
  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {category.name}
        </h2>
        {category.description && (
          <p className="text-md max-w-3xl text-gray-500 line-clamp-1">
            {category.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {category.services.slice(0, 4).map((service) => (
          <div key={service.id}>
            <ServiceCard service={service} />
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <Link href={`/category/${category.id}`} passHref>
          <Button
            variant="link"
            className="text-primary hover:text-primary-dark transition-colors duration-300"
          >
            Show more <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

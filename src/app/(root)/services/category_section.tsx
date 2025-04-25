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
  isEven: boolean;
}

export default function CategorySection({
  category,
  isEven,
}: CategorySectionProps) {
  // Define theme colors based on category position
  const themeColor = isEven ? "indigo" : "purple";
  const accentColor = isEven ? "purple" : "pink";

  return (
    <section className="pb-12 relative">
      {/* Decorative elements */}
      <div
        className={`absolute top-20 ${
          isEven ? "left-0" : "right-0"
        } w-32 h-32 transform -translate-x-1/2 -translate-y-1/2 opacity-5`}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="currentColor"
            className={`text-${themeColor}-500`}
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`text-${accentColor}-500`}
          />
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`text-${themeColor}-300`}
          />
        </svg>
      </div>

      <div
        className={`absolute bottom-0 ${
          isEven ? "right-0" : "left-0"
        } w-64 h-64 transform translate-x-1/4 translate-y-1/4 opacity-5`}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="10"
            y="10"
            width="80"
            height="80"
            rx="10"
            fill="currentColor"
            className={`text-${accentColor}-500`}
          />
          <rect
            x="25"
            y="25"
            width="50"
            height="50"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`text-${themeColor}-500`}
          />
        </svg>
      </div>

      <div
        className={`flex flex-col md:flex-row md:items-end justify-between mb-10 ${
          isEven ? "" : "md:flex-row-reverse text-right md:text-left"
        }`}
      >
        <div>
          <div className="inline-flex items-center space-x-3 mb-4">
            {/* Category icon based on category name */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center bg-${themeColor}-100 text-${themeColor}-600`}
            >
              {getCategoryIcon(category.name)}
            </div>

            <span
              className={`text-sm uppercase tracking-wider text-${themeColor}-600 font-medium`}
            >
              Event Services
            </span>
          </div>

          <h2
            className={`text-4xl font-bold text-gray-900 mb-3 relative inline-block`}
          >
            {category.name}
            <span
              className={`absolute -bottom-2 left-0 w-3/4 h-1.5 bg-gradient-to-r from-primary/80 to-secondary/10 rounded-full`}
            ></span>
          </h2>

          {category.description && (
            <p className="text-lg max-w-3xl text-gray-600 mt-5 mb-2">
              {category.description}
            </p>
          )}
        </div>

        <Link href={`/category/${category.id}`} passHref>
          <Button
            variant="outline"
            className={`mt-6 md:mt-0 group border-${themeColor}-500 text-${themeColor}-500 hover:bg-${themeColor}-500 hover:text-white transition-all duration-300`}
          >
            Explore {category.name}
            <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {category.services.slice(0, 4).map((service, index) => (
          <div
            key={service.id}
            className="transform transition-all duration-500 hover:-translate-y-2 opacity-0 animate-fade-in"
            style={{
              animationDelay: `${index * 0.15}s`,
              animationFillMode: "forwards",
            }}
          >
            <ServiceCard service={service} accentColor={accentColor} />
          </div>
        ))}

        {category.services.length === 0 && (
          <div className="col-span-4 py-24 text-center">
            <div
              className={`mx-auto w-24 h-24 rounded-full bg-${themeColor}-100 flex items-center justify-center mb-6`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-12 w-12 text-${themeColor}-400`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-xl">
              No services available in this category yet.
            </p>
            <p className={`text-${themeColor}-500 mt-2`}>
              Check back soon or explore other categories!
            </p>
          </div>
        )}
      </div>

      {/* Decorative element at bottom of each section */}
      <div className="w-full flex justify-center mt-20">
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent rounded-full"></div>
      </div>
    </section>
  );
}

// Helper function to get emoji icon based on category name
function getCategoryIcon(categoryName: string) {
  const name = categoryName.toLowerCase();

  if (name.includes("catering") || name.includes("food")) return "🍽️";
  if (name.includes("venue") || name.includes("location")) return "🏛️";
  if (name.includes("photo") || name.includes("camera")) return "📸";
  if (name.includes("music") || name.includes("dj")) return "🎵";
  if (name.includes("decor") || name.includes("decoration")) return "🎭";
  if (name.includes("wedding")) return "💍";
  if (name.includes("birthday")) return "🎂";
  if (name.includes("corporate")) return "💼";
  if (name.includes("light") || name.includes("sound")) return "💡";
  if (name.includes("flower")) return "💐";

  // Default icon
  return "🎉";
}

import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function GoToManageButton() {
  const { user } = useUser();
  const router = useRouter();

  // Only show for admin or vendor
  if (!user || (user.role !== "admin" && user.role !== "vendor")) {
    return null;
  }

  // Determine target path and label
  const { role } = user;
  const pageUrl = role === "admin" ? "/admin" : "/vendor";
  const label = role === "admin" ? "Admin Dashboard" : "Vendor Dashboard";

  const handleClick = () => router.push(pageUrl);

  return (
    <nav aria-label="User navigation">
      <button
        onClick={handleClick}
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
      >
        <span>Go to {label}</span>
        <ChevronRight className="ml-1 h-4 w-4" />
      </button>
    </nav>
  );
}

"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import Sidebar from "@/components/SideBar";
import { HomeIcon } from "@heroicons/react/24/outline";
import { FaServicestack } from "react-icons/fa";

interface AdminLayoutProps {
  children: ReactNode;
}
const links = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <HomeIcon className="w-5 h-5" />,
  },
  {
    label: "Service",
    href: "/vendor/service",
    icon: <FaServicestack className="w-5 h-5" />,
    subLinks: [
      {
        label: "Your Service",
        href: "/vendor/service/manage",
      },
    ],
  },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "vendor")) {
      router.push("/");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || user.role !== "vendor") {
    router.push("/");
    return;
  }

  return (
    <div className="min-h-screen">
      <Sidebar
        links={links}
        brandName="NiceEvents Vendor"
        logo={
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">
              EE
            </span>
          </div>
        }
      />
      <div className="lg:pl-80">
        <main className="">
          <div className="rounded-lg  bg-card/40 text-card-foreground border">
            <div className="flex flex-col space-y-1.5 p-7"></div>
          </div>
          <div className="lg:px-6 lg:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

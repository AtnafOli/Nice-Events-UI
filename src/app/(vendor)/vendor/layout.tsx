"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import Sidebar from "@/components/SideBar";
import { HomeIcon } from "@heroicons/react/24/outline";
import { FaServicestack } from "react-icons/fa";
import { hrtime } from "process";
import { sub } from "date-fns";

interface AdminLayoutProps {
  children: ReactNode;
}
const links = [
  {
    label: "Dashboard",
    href: "/vendor/dashboard",
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
  {
    label: "Requests",
    href: "/vendor/service/requests",
    icon: <FaServicestack className="w-5 h-5" />,
    subLinks: [
      {
        label: "Service Requests",
        href: "/vendor/requests/service",
      },
      // {
      //   label: "New Requests",
      //   href: "/vendor/service/requests/new",
      // },
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
          <div className="lg:px-6 lg:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

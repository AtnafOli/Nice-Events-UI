"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import Sidebar from "@/components/SideBar";
import {
  HomeIcon,
  UsersIcon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

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
    label: "Vendor Management",
    href: "/admin/vendors",
    icon: <UsersIcon className="w-5 h-5" />,
    subLinks: [
      {
        label: "All Vendors",
        href: "/admin/vendors/all",
        icon: <UserGroupIcon className="w-4 h-4" />,
      },
      {
        label: "Subscriptions",
        href: "/admin/vendors/subscriptions",
        icon: <CurrencyDollarIcon className="w-4 h-4" />,
      },
      {
        label: "Verification Requests",
        href: "/admin/vendors/verification",
        icon: <ClipboardDocumentListIcon className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Plan Management",
    href: "/admin/plans",
    icon: <Cog6ToothIcon className="w-5 h-5" />,
    subLinks: [
      {
        label: "Manage Plans",
        href: "/admin/plans/manage",
        icon: <ClipboardDocumentListIcon className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Price Management",
    href: "/admin/prices",
    icon: <CurrencyDollarIcon className="w-5 h-5" />,
    subLinks: [
      {
        label: "Manage Prices",
        href: "/admin/prices/manage",
        icon: <ClipboardDocumentListIcon className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Feature Management",
    href: "/admin/features",
    icon: <SparklesIcon className="w-5 h-5" />,
    subLinks: [
      {
        label: "Manage Features",
        href: "/admin/features/manage",
        icon: <ClipboardDocumentListIcon className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Invoice Management",
    href: "/admin/invoices",
    icon: <DocumentChartBarIcon className="w-5 h-5" />,
    subLinks: [
      {
        label: "Create Invoice",
        href: "/admin/invoices/create",
        icon: <CurrencyDollarIcon className="w-4 h-4" />,
      },
      {
        label: "Manage Invoices",
        href: "/admin/invoices/manage",
        icon: <ClipboardDocumentListIcon className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Payment Methods",
    href: "/admin/payment-methods",
    icon: <CurrencyDollarIcon className="w-5 h-5" />,
    subLinks: [
      {
        label: "Add Payment Method",
        href: "/admin/payment-methods/add",
        icon: <CurrencyDollarIcon className="w-4 h-4" />,
      },
      {
        label: "Manage Payment Methods",
        href: "/admin/payment-methods/manage",
        icon: <ClipboardDocumentListIcon className="w-4 h-4" />,
      },
    ],
  },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
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

  if (!user || user.role !== "admin") {
    router.push("/");
    return;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        links={links}
        brandName="EthioEvents Admin"
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
          <div className="rounded-lg border bg-card text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-7"></div>
          </div>
          <div className="lg:px-6 lg:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

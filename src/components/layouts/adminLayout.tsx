// import { ReactNode } from "react";
// import { useRouter } from "next/router";
// import { useUser } from "@/context/userContext";
// import Sidebar from "../Sidebar";

// interface AdminLayoutProps {
//   children: ReactNode;
// }

// const AdminLayout = ({ children }: AdminLayoutProps) => {
//   const { user, loading } = useUser();
//   const router = useRouter();

//   if (loading) return <p>Loading...</p>;

//   if (!user || user.role !== "admin") {
//     if (typeof window !== "undefined") {
//       router.push("/");
//     }
//     return null;
//   }

//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex-1 p-4 bg-gray-100">
//         <header className="p-4 bg-white shadow-md">
//           <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         </header>
//         <main className="p-4">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

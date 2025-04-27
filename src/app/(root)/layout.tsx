import Footer from "@/components/common/footer/footer";
import Navbar from "@/components/common/navbar/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="lg:mt-28 mt-20">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}

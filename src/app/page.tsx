import Navbar from "@/components/common/navbar/navbar";
import HeroSection from "@/components/home_page/hero_section";
import PlanList from "@/components/home_page/plan_list";

export default function Home() {
  return (
    <div className="">
      <Navbar></Navbar>
      <div className=" grid grid-cols-1 gap-6 lg:px-4 px-2 lg:mt-16 mt-8">
        <HeroSection />
        <PlanList />
      </div>
    </div>
  );
}

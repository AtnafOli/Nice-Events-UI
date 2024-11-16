import Navbar from "@/components/common/navbar/navbar";
import HeroSection from "@/components/home_page/hero_section";
import PlanList from "@/components/home_page/plan_list";

export default function Home() {
  return (
    <div className="">
      <Navbar></Navbar>
      <div className=" grid grid-cols-1 gap-24 lg:mt-16 mt-8 lg:px-12 p-6">
        <HeroSection />
        <PlanList />
      </div>
    </div>
  );
}

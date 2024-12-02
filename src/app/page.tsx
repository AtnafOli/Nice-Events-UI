import Navbar from "@/components/common/navbar/navbar";
import HeroSection from "@/components/home_page/hero_section";
import PlanList from "@/components/home_page/plan_list";
import CategoryList from "@/components/services/category-list";
import { plansService } from "@/services/plan.service";

export default async function Home() {
  const { data } = await plansService.getPlans("");
  return (
    <div className="">
      <Navbar></Navbar>
      <div className=" grid grid-cols-1 gap-20 lg:mt-16 mt-8 lg:px-12 p-2">
        <HeroSection />
        <CategoryList />
        <PlanList plans={data} />
      </div>
    </div>
  );
}

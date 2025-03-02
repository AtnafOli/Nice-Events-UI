import Navbar from "@/components/common/navbar/navbar";
import { CTASection } from "@/components/home_page/cta-section";
import HeroSection from "@/components/home_page/hero_section";
import { HowItWorks } from "@/components/home_page/how_it_works";
import PlanList from "@/components/home_page/plan_list";
import { Testimonials } from "@/components/home_page/testimonials";
import CategoryList from "@/components/services/category-list";
import { categoryService } from "@/services/category.service";
import { plansService } from "@/services/plan.service";

export default async function Home() {
  const { data } = await plansService.getPlans("");
  const { data: categorys } = await categoryService.getCategorys("");

  return (
    <div className="">
      <Navbar></Navbar>
      <div className=" grid grid-cols-1 gap-20 lg:mt-16 mt-8 lg:px-6 p-2">
        <HeroSection categorys={categorys} />
        <CategoryList categorys={categorys} />
        <HowItWorks />
        <PlanList plans={data} />
        <Testimonials />
        {/* <CTASection /> */}
      </div>
    </div>
  );
}

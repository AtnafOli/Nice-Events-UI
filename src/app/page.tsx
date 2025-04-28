import ChatWidget from "@/components/chatbot";
import { RequestHelpSection } from "@/components/common/event_request";
import Footer from "@/components/common/footer/footer";
import Navbar from "@/components/common/navbar/navbar";
import { CTASection } from "@/components/home_page/cta-section";
import HeroSection from "@/components/home_page/hero_section";
import { HowItWorks } from "@/components/home_page/how_it_works";
import PlanList from "@/components/home_page/plan_list";
import { SuccessStories } from "@/components/home_page/testimonials";
import CategoryList from "@/components/services/category-list";
import { useUser } from "@/context/userContext";
import { categoryService } from "@/services/category.service";
import { plansService } from "@/services/plan.service";

export default async function Home() {
  const { data } = await plansService.getPlans("");
  const { data: categorys } = await categoryService.getCategorys("");

  return (
    <div className="">
      <Navbar></Navbar>
      <div className=" grid grid-cols-1 gap-16 lg:mt-16 mt-8">
        <HeroSection categorys={categorys} />
        <CategoryList categorys={categorys} />
        <RequestHelpSection />
        {/* <HowItWorks /> */}
        <PlanList plans={data} />
        <SuccessStories />
        {/* <CTASection /> */}
        <ChatWidget />
      </div>
      <Footer />
    </div>
  );
}

import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-[#FFD700]">
      <div className="container mx-auto text-center space-y-8">
        <h2 className="text-6xl md:text-7xl font-bebas-neue leading-none">
          Ready to Create Your <br />
          <span className="text-[#FF6B6B]">Dream Event?</span>
        </h2>
        <p className="text-xl md:text-2xl font-bold max-w-2xl mx-auto">
          Join our platform today and connect with the best vendors in the
          industry.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="text-xl font-bold py-6 px-8 bg-black text-white neo-brutalism neo-brutalism-hover">
            Find Vendors
          </Button>
          <Button
            variant="outline"
            className="text-xl font-bold py-6 px-8 neo-brutalism neo-brutalism-hover"
          >
            Become a Vendor
          </Button>
        </div>
      </div>
    </section>
  );
}

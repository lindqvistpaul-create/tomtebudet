import Snowfall from "@/components/Snowfall";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyTomtebudet from "@/components/WhyTomtebudet";
import TopSantas from "@/components/TopSantas";
import BecomeSanta from "@/components/BecomeSanta";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Snowfall />
      <Navigation />
      <Hero />
      <HowItWorks />
      <WhyTomtebudet />
      <TopSantas />
      <BecomeSanta />
      <Footer />
    </div>
  );
};

export default Index;

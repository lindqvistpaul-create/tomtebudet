import Snowfall from "@/components/Snowfall";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyTomtebudet from "@/components/WhyTomtebudet";
import BecomeSanta from "@/components/BecomeSanta";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import PrelaunchBanner from "@/components/PrelaunchBanner";
import FamilyInterestCTA from "@/components/FamilyInterestCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Prelaunch Banner */}
      <PrelaunchBanner />
      
      {/* Ambient decoration */}
      <Snowfall />
      
      {/* Header / Navigation */}
      <Header />
      
      {/* Main content sections */}
      <main>
        <Hero />
        <HowItWorks />
        <FamilyInterestCTA />
        <WhyTomtebudet />
        {/* PRELAUNCH: Hide TopSantas since no active santas yet */}
        <BecomeSanta />
        <FAQ />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;

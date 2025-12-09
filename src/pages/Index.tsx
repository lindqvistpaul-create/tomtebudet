import Snowfall from "@/components/Snowfall";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyTomtebudet from "@/components/WhyTomtebudet";
import TopSantas from "@/components/TopSantas";
import BecomeSanta from "@/components/BecomeSanta";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Ambient decoration */}
      <Snowfall />
      
      {/* Header / Navigation */}
      <Header />
      
      {/* Main content sections */}
      <main>
        <Hero />
        <HowItWorks />
        <WhyTomtebudet />
        <TopSantas />
        <BecomeSanta />
        <FAQ />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;

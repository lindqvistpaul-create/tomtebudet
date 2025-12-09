import Snowfall from "@/components/Snowfall";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import MessageForm from "@/components/MessageForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Snowfall />
      <Hero />
      <HowItWorks />
      <MessageForm />
      <Footer />
    </div>
  );
};

export default Index;

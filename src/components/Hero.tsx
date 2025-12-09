import { Button } from "@/components/ui/button";
import { Sparkles, TreePine } from "lucide-react";
import { Link } from "react-router-dom";
import Starfall from "@/components/Starfall";
import TrustBadge from "@/components/TrustBadge";
import { analytics } from "@/lib/analytics";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBookingClick = () => {
    analytics.ctaClick('boka_tomte', 'hero');
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden pt-16 md:pt-20">
      {/* Falling stars - fewer on mobile */}
      <Starfall count={8} />

      {/* Decorative elements - hidden on mobile for cleaner look */}
      <div className="absolute top-32 left-10 text-accent/30 animate-float hidden md:block">
        <TreePine className="w-8 h-8" />
      </div>
      <div className="absolute top-52 right-20 text-accent/20 animate-float hidden md:block" style={{ animationDelay: "1s" }}>
        <Sparkles className="w-12 h-12" />
      </div>
      <div className="absolute top-40 right-10 text-accent/20 animate-float hidden md:block" style={{ animationDelay: "1.5s" }}>
        <TreePine className="w-6 h-6" />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-20 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust badge - smaller on mobile */}
          <div 
            className="flex justify-center mb-4 md:mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <TrustBadge variant="hero" />
          </div>

          {/* Main heading - much smaller on mobile */}
          <h1 
            className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-snow mb-4 md:mb-8 opacity-0 animate-fade-in leading-tight px-2"
            style={{ animationDelay: "0.4s" }}
          >
            Boka en äkta <span className="text-gradient-gold">jultomte</span> till julafton
          </h1>

          {/* Subtitle - shorter on mobile */}
          <p 
            className="text-base md:text-xl text-snow/80 mb-6 md:mb-12 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in px-4"
            style={{ animationDelay: "0.6s" }}
          >
            <span className="hidden sm:inline">Hyra jultomte har aldrig varit enklare. Tomtebudet förmedlar noggrant utvalda, </span>
            BankID-verifierade tomtar i Stockholm och hela Sverige.
          </p>

          {/* CTA Buttons - full width on mobile, stacked */}
          <div 
            className="flex flex-col gap-3 px-4 sm:flex-row sm:gap-4 sm:justify-center sm:px-0 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <Link to="/sok" className="w-full sm:w-auto" onClick={handleBookingClick}>
              <Button variant="hero" size="lg" className="w-full sm:w-auto h-14 text-base">
                🎅 Boka tomte nu
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => scrollToSection("become-santa")}
              className="w-full sm:w-auto h-14 text-base border-accent text-accent hover:bg-accent/10 hover:text-accent"
            >
              Bli en del av magin
            </Button>
          </div>

          {/* Trust indicators - more compact on mobile */}
          <div 
            className="mt-10 md:mt-20 grid grid-cols-3 gap-4 md:gap-8 max-w-sm md:max-w-lg mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "1s" }}
          >
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-serif text-accent mb-0.5 md:mb-1">500+</div>
              <div className="text-snow/60 text-xs md:text-sm">Tomtar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-serif text-accent mb-0.5 md:mb-1">4.9</div>
              <div className="text-snow/60 text-xs md:text-sm">Betyg</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-serif text-accent mb-0.5 md:mb-1">100%</div>
              <div className="text-snow/60 text-xs md:text-sm">Nöjda</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;

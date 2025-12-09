import { Button } from "@/components/ui/button";
import { Sparkles, TreePine } from "lucide-react";
import { Link } from "react-router-dom";
import Starfall from "@/components/Starfall";
import TrustBadge from "@/components/TrustBadge";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden pt-20">
      {/* Falling stars */}
      <Starfall count={15} />

      {/* Decorative elements */}
      <div className="absolute top-32 left-10 text-accent/30 animate-float">
        <TreePine className="w-8 h-8" />
      </div>
      <div className="absolute top-52 right-20 text-accent/20 animate-float" style={{ animationDelay: "1s" }}>
        <Sparkles className="w-12 h-12" />
      </div>
      <div className="absolute top-40 right-10 text-accent/20 animate-float" style={{ animationDelay: "1.5s" }}>
        <TreePine className="w-6 h-6" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust badge */}
          <div 
            className="flex justify-center mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <TrustBadge variant="hero" />
          </div>

          {/* Main heading */}
          <h1 
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-snow mb-8 opacity-0 animate-fade-in leading-tight"
            style={{ animationDelay: "0.4s" }}
          >
            Boka en äkta <span className="text-gradient-gold">jultomte</span> till julafton
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl text-snow/80 mb-12 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            Hyra jultomte har aldrig varit enklare. Tomtebudet förmedlar noggrant utvalda, 
            BankID-verifierade tomtar i Stockholm och hela Sverige. Privat jultomte direkt hem till er familj.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <Link to="/sok">
              <Button variant="hero" size="xl">
                🎅 Boka tomte nu
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="xl" 
              onClick={() => scrollToSection("become-santa")}
              className="border-accent text-accent hover:bg-accent/10 hover:text-accent"
            >
              Bli en del av magin
            </Button>
          </div>

          {/* Trust indicators */}
          <div 
            className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "1s" }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif text-accent mb-1">500+</div>
              <div className="text-snow/60 text-sm">Certifierade tomtar</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif text-accent mb-1">4.9</div>
              <div className="text-snow/60 text-sm">Av 5 i betyg</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif text-accent mb-1">100%</div>
              <div className="text-snow/60 text-sm">Nöjdhetsgaranti</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;

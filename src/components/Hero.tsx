import { Button } from "@/components/ui/button";
import { Shield, Sparkles, Star, Users } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden pt-20">
      {/* Decorative elements */}
      <div className="absolute top-32 left-10 text-accent/30 animate-float">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="absolute top-52 right-20 text-accent/20 animate-float" style={{ animationDelay: "1s" }}>
        <Sparkles className="w-12 h-12" />
      </div>
      <div className="absolute bottom-40 left-20 text-accent/25 animate-float" style={{ animationDelay: "0.5s" }}>
        <Star className="w-10 h-10" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-snow/10 border border-snow/20 backdrop-blur-sm mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-snow/90 text-sm font-medium">Verifierade tomtar med BankID</span>
          </div>

          {/* Main heading */}
          <h1 
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-snow mb-6 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            Tomte<span className="text-gradient-gold">budet</span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-xl md:text-2xl text-snow/80 mb-12 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            Sveriges tryggaste marknadsplats för att boka en 
            verifierad jultomte till julafton.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <Button variant="hero" size="xl" onClick={() => scrollToSection("top-santas")}>
              <Users className="w-5 h-5" />
              Boka en tomte
            </Button>
            <Button variant="snow" size="xl" onClick={() => scrollToSection("become-santa")}>
              Bli tomte
            </Button>
          </div>

          {/* Trust indicators */}
          <div 
            className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "1s" }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif text-accent mb-1">500+</div>
              <div className="text-snow/60 text-sm">Verifierade tomtar</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif text-accent mb-1">4.9</div>
              <div className="text-snow/60 text-sm">Snittbetyg</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif text-accent mb-1">100%</div>
              <div className="text-snow/60 text-sm">Trygghetsgaranti</div>
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

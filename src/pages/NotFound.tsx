import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search, Sparkles } from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import Starfall from "@/components/Starfall";
import { SantaHatIcon } from "@/components/TomtebudetIcons";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Starfall />
      <SimpleHeader />
      
      <main className="pt-24 pb-16 relative z-10 flex items-center justify-center min-h-[calc(100vh-6rem)]">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-soft border border-border/50 text-center">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center">
                  <SantaHatIcon className="w-14 h-14 text-accent" />
                </div>
              </div>

              {/* Sparkles decoration */}
              <div className="flex justify-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-accent/60" />
                <Sparkles className="w-5 h-5 text-accent" />
                <Sparkles className="w-4 h-4 text-accent/60" />
              </div>

              {/* Heading */}
              <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                Hoppsan! Här finns <span className="text-gradient-gold">ingen tomte…</span>
              </h1>

              <p className="text-muted-foreground text-lg mb-8">
                Sidan du letar efter verkar ha gått vilse i julruschen. 
                Men oroa dig inte – vi hjälper dig hitta rätt!
              </p>

              {/* Fun message */}
              <div className="bg-muted/30 rounded-xl p-4 mb-8 border border-border/30">
                <p className="text-sm text-muted-foreground italic">
                  "Även tomtar tar ibland fel väg i snöyran. Det viktiga är att man hittar hem till slut."
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto">
                    <Home className="w-5 h-5" />
                    Tillbaka till startsidan
                  </Button>
                </Link>
                <Link to="/sok">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Search className="w-5 h-5" />
                    Hitta en tomte
                  </Button>
                </Link>
              </div>

              {/* Warm closing */}
              <p className="text-sm text-muted-foreground mt-8">
                ✨ Vi önskar dig en magisk jul!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;

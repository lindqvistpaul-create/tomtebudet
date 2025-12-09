import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, Gift } from "lucide-react";

const TopSantas = () => {
  // PRELAUNCH: No real santas yet - show recruitment message
  return (
    <section id="top-santas" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-6 md:mb-12">
          <span className="text-accent font-medium text-xs md:text-sm uppercase tracking-wider">Våra tomtar</span>
          <h2 className="font-serif text-2xl md:text-5xl text-foreground mt-2 md:mt-3 mb-2 md:mb-4">
            Populära <span className="text-primary">jultomtar</span>
          </h2>
        </div>

        {/* Empty state - Prelaunch recruitment message */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-soft border border-border/50 text-center">
            {/* Icon */}
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-accent" />
            </div>

            {/* Message */}
            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">
              Vi rekryterar tomtar inför <span className="text-gradient-gold">julen 2026</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Just nu bygger vi upp Sveriges tryggaste tomtenätverk. Registrera dig som tomte 
              för att bli en av de första som syns här när bokningen öppnar.
            </p>

            {/* Benefits preview */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>BankID-verifierade</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Gift className="w-4 h-4 text-accent" />
                <span>Handplockade</span>
              </div>
            </div>

            {/* CTA */}
            <Link to="/bli-tomte">
              <Button variant="hero" size="lg">
                🎅 Registrera dig som tomte
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSantas;

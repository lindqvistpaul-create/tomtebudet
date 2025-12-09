import { Button } from "@/components/ui/button";
import { Sparkles, BadgeCheck, Wallet, Calendar } from "lucide-react";

const benefits = [
  {
    icon: BadgeCheck,
    title: "Verifiera dig enkelt",
    description: "Legitimera dig med BankID på några sekunder",
  },
  {
    icon: Wallet,
    title: "Tjäna extra pengar",
    description: "Sätt dina egna priser och få betalt direkt",
  },
  {
    icon: Calendar,
    title: "Flexibla tider",
    description: "Välj när och var du vill arbeta",
  },
];

const BecomeSanta = () => {
  return (
    <section id="become-santa" className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Decorative sparkles */}
      <div className="absolute top-20 left-10 text-accent/20 animate-twinkle">
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="absolute bottom-20 right-10 text-accent/30 animate-twinkle" style={{ animationDelay: "1s" }}>
        <Sparkles className="w-8 h-8" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <span className="text-accent font-medium text-sm uppercase tracking-wider">Bli en del av oss</span>
              <h2 className="font-serif text-4xl md:text-5xl text-snow mt-3 mb-6">
                Bli <span className="text-gradient-gold">Tomte</span>
              </h2>
              <p className="text-snow/80 text-lg mb-8 leading-relaxed">
                Älskar du att göra barn glada? Bli en del av Tomtebudet och sprid 
                julglädje i ditt område. Vi söker pålitliga och kärleksfulla tomtar.
              </p>

              {/* Benefits list */}
              <div className="space-y-4 mb-8">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-snow font-medium mb-1">{benefit.title}</h4>
                      <p className="text-snow/60 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="hero" size="xl">
                Ansök som tomte
              </Button>
            </div>

            {/* Stats card */}
            <div className="bg-card/95 backdrop-blur-sm rounded-3xl p-8 shadow-soft">
              <h3 className="font-serif text-2xl text-foreground mb-6">Tomtar tjänar i snitt</h3>
              
              <div className="text-5xl font-serif text-primary mb-2">8 500 kr</div>
              <p className="text-muted-foreground mb-8">per julafton (3-5 besök)</p>

              <div className="space-y-4 border-t border-border pt-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Genomsnittligt pris per besök</span>
                  <span className="font-medium text-foreground">1 200 kr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Snittid per besök</span>
                  <span className="font-medium text-foreground">20-30 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Utbetalning</span>
                  <span className="font-medium text-foreground">Inom 2 dagar</span>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mt-6">
                * Baserat på tomtar med 4.5+ betyg i Stockholm-området
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeSanta;

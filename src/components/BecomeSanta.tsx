import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Fingerprint, FileCheck, Camera, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Fingerprint,
    step: "1",
    title: "BankID-verifiering",
    description: "Trygg och snabb identitetskontroll.",
  },
  {
    icon: FileCheck,
    step: "2",
    title: "Ladda upp ID",
    description: "Granskas och raderas för din integritet.",
  },
  {
    icon: Camera,
    step: "3",
    title: "Ladda upp foton",
    description: "Porträtt och bild i tomtedräkt.",
  },
  {
    icon: CheckCircle,
    step: "4",
    title: "Välkommen!",
    description: "Bli en del av Tomtebudets nätverk.",
  },
];

const BecomeSanta = () => {
  return (
    <section id="become-santa" className="py-12 md:py-24 bg-gradient-hero relative overflow-hidden">
      {/* Decorative sparkles - hidden on mobile */}
      <div className="absolute top-20 left-10 text-accent/20 animate-twinkle hidden md:block">
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="absolute bottom-20 right-10 text-accent/30 animate-twinkle hidden md:block" style={{ animationDelay: "1s" }}>
        <Sparkles className="w-8 h-8" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section header - compact on mobile */}
          <div className="text-center mb-8 md:mb-16">
            <span className="text-accent font-medium text-xs md:text-sm uppercase tracking-wider">Bli tomte</span>
            <h2 className="font-serif text-2xl md:text-5xl text-snow mt-2 md:mt-3 mb-2 md:mb-4">
              Bli en av våra <span className="text-gradient-gold">jultomtar</span>
            </h2>
            <p className="text-snow/70 max-w-2xl mx-auto text-sm md:text-lg">
              <span className="hidden sm:inline">Vill du hyras ut som jultomte? </span>
              Gå med i Sveriges tryggaste tomtenätverk.
            </p>
          </div>

          {/* Steps - horizontal scroll on mobile */}
          <div className="flex overflow-x-auto gap-3 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:overflow-visible mb-8 md:mb-12 snap-x snap-mandatory">
            {steps.map((item) => (
              <div
                key={item.title}
                className="group relative bg-snow/5 backdrop-blur-sm border border-snow/10 rounded-xl md:rounded-2xl p-4 md:p-6 pt-8 md:pt-6 hover:bg-snow/10 transition-all duration-300 flex-shrink-0 w-[180px] md:w-auto snap-start"
              >
                {/* Step number badge - inside card on mobile, outside on desktop */}
                <div className="absolute top-2 right-2 md:-top-3 md:-right-3 w-6 h-6 md:w-8 md:h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-serif font-bold text-xs md:text-sm shadow-lg">
                  {item.step}
                </div>

                <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4">
                  {/* Icon */}
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-serif text-base md:text-xl text-snow mb-1 md:mb-2">{item.title}</h3>
                    <p className="text-snow/60 leading-snug md:leading-relaxed text-xs md:text-base">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center px-4 md:px-0">
            <Link to="/bli-tomte" className="block sm:inline-block">
              <Button variant="hero" size="lg" className="w-full sm:w-auto h-14 text-base">
                🎅 Ansök som tomte
              </Button>
            </Link>
            <p className="text-snow/50 text-xs md:text-sm mt-3 md:mt-4">
              Kostnadsfri registrering • Sätt egna priser
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeSanta;

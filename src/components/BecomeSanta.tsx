import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Fingerprint, FileCheck, Camera, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Fingerprint,
    step: "1",
    title: "Logga in med BankID",
    description: "Verifiera din identitet snabbt och säkert med BankID.",
  },
  {
    icon: FileCheck,
    step: "2",
    title: "Ladda upp ID-handling",
    description: "Ladda upp en bild på giltig legitimation för extra trygghet.",
  },
  {
    icon: Camera,
    step: "3",
    title: "Ladda upp två bilder",
    description: "Ett porträtt och en bild i tomte-outfit så familjer känner igen dig.",
  },
  {
    icon: CheckCircle,
    step: "4",
    title: "Godkänns av teamet",
    description: "Vårt team granskar din ansökan och godkänner dig som certifierad tomte.",
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
      <div className="absolute top-40 right-20 text-accent/15 animate-twinkle" style={{ animationDelay: "0.5s" }}>
        <Sparkles className="w-5 h-5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Bli en del av oss</span>
            <h2 className="font-serif text-4xl md:text-5xl text-snow mt-3 mb-4">
              Tjäna extra i jul – bli{" "}
              <span className="text-gradient-gold">certifierad jultomte</span>
            </h2>
            <p className="text-snow/70 max-w-2xl mx-auto text-lg">
              Gå igenom vår enkla verifieringsprocess och börja sprida julglädje
            </p>
          </div>

          {/* Steps grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {steps.map((item) => (
              <div
                key={item.title}
                className="group relative bg-snow/5 backdrop-blur-sm border border-snow/10 rounded-2xl p-6 hover:bg-snow/10 transition-all duration-300"
              >
                {/* Step number badge */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-serif font-bold text-sm shadow-lg">
                  {item.step}
                </div>

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-serif text-xl text-snow mb-2">{item.title}</h3>
                    <p className="text-snow/60 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/bli-tomte">
              <Button variant="hero" size="xl">
                🎅 Bli tomte
              </Button>
            </Link>
            <p className="text-snow/50 text-sm mt-4">
              Gratis att registrera sig • Sätt dina egna priser • Utbetalning inom 2 dagar
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeSanta;

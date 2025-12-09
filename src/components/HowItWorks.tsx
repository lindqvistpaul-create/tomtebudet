import { PenLine, Wand2, Send, Heart } from "lucide-react";

const steps = [
  {
    icon: PenLine,
    title: "Skriv din hälsning",
    description: "Berätta vem hälsningen är till och skriv ett personligt meddelande fyllt med julkärlek.",
  },
  {
    icon: Wand2,
    title: "Tomtens magi",
    description: "Våra tomtar läser ditt meddelande och förbereder en magisk julhälsning.",
  },
  {
    icon: Send,
    title: "Leverans från Nordpolen",
    description: "Hälsningen skickas direkt från tomtens verkstad till din kära mottagare.",
  },
  {
    icon: Heart,
    title: "Glädje sprids",
    description: "Se glädjen lysa i ögonen när din personliga julhälsning kommer fram.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Så fungerar det</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-3 mb-4">
            Fyra enkla steg till <span className="text-primary">julmagin</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Att skicka en julhälsning från Nordpolen har aldrig varit enklare
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Step number */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-serif font-bold text-sm">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <step.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

import { Search, UserCheck, CalendarHeart, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Hitta tomte i ditt område",
    description: "Utforska BankID-verifierade tomtar nära dig. Tomte Stockholm, Göteborg, Malmö och hela Sverige – se omdömen och välj den som passar er familj.",
  },
  {
    icon: UserCheck,
    title: "Trygg tomtebokning",
    description: "Varje tomte har genomgått BankID-verifiering och personlig granskning. Boka tomte med fullständig trygghet och nöjdhetsgaranti.",
  },
  {
    icon: CalendarHeart,
    title: "Personligt julafton-besök",
    description: "Dela barnens namn, önskelistor och speciella detaljer. Er privata jultomte anpassar besöket för maximal magi.",
  },
  {
    icon: Sparkles,
    title: "Jultomte hem till er",
    description: "På julafton kommer en riktig jultomte hem till er dörr – redo att skapa minnen som varar livet ut.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Så fungerar det</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-3 mb-4">
            Boka jultomte i <span className="text-primary">fyra enkla steg</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Hyra jultomte till julafton – från bokning till magiskt tomtebesök hemma hos er
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

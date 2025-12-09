import { Search, UserCheck, CalendarHeart, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Hitta tomte",
    description: "Utforska BankID-verifierade tomtar nära dig med omdömen och profiler.",
  },
  {
    icon: UserCheck,
    title: "Trygg bokning",
    description: "Varje tomte har genomgått verifiering och personlig granskning.",
  },
  {
    icon: CalendarHeart,
    title: "Anpassa besöket",
    description: "Dela barnens namn och önskelistor för ett personligt besök.",
  },
  {
    icon: Sparkles,
    title: "Magisk julafton",
    description: "Tomten kommer hem till er dörr och skapar minnen för livet.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header - compact on mobile */}
        <div className="text-center mb-8 md:mb-16">
          <span className="text-accent font-medium text-xs md:text-sm uppercase tracking-wider">Så fungerar det</span>
          <h2 className="font-serif text-2xl md:text-5xl text-foreground mt-2 md:mt-3 mb-2 md:mb-4">
            Boka tomte i <span className="text-primary">fyra steg</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-lg hidden sm:block">
            Hyra jultomte till julafton – från bokning till magiskt tomtebesök
          </p>
        </div>

        {/* Steps - horizontal scroll on mobile, grid on desktop */}
        <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:overflow-visible snap-x snap-mandatory">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative bg-card rounded-xl md:rounded-2xl p-5 md:p-8 pt-8 md:pt-8 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex-shrink-0 w-[280px] md:w-auto snap-start"
            >
              {/* Step number - inside card on mobile, outside on desktop */}
              <div className="absolute top-3 right-3 md:-top-3 md:-right-3 w-7 h-7 md:w-8 md:h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-serif font-bold text-xs md:text-sm shadow-md">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-11 h-11 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary/20 transition-colors">
                <step.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-lg md:text-xl text-foreground mb-2 md:mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

import { Shield, Lock, BadgeCheck, Heart, Users, Clock } from "lucide-react";

const benefits = [
  {
    icon: BadgeCheck,
    title: "BankID-verifierade tomtar",
    description: "Alla tomtar legitimerar sig med BankID för din trygghet. Ingen anonym kontakt.",
  },
  {
    icon: Lock,
    title: "Säker informationsdelning",
    description: "Dela barnens namn och önskemål tryggt. All data är krypterad och skyddad.",
  },
  {
    icon: Shield,
    title: "Trygghetsgaranti",
    description: "Full återbetalning om något inte motsvarar förväntningarna. Vi står bakom varje bokning.",
  },
  {
    icon: Heart,
    title: "Erfarna tomtar",
    description: "Våra tomtar älskar barn och har erfarenhet av att skapa magiska ögonblick.",
  },
  {
    icon: Users,
    title: "Omdömen från familjer",
    description: "Läs vad andra familjer tycker innan du bokar. Transparent och ärligt.",
  },
  {
    icon: Clock,
    title: "Flexibla tider",
    description: "Boka den tid som passar er familj bäst på julafton. Tomtarna anpassar sig.",
  },
];

const WhyTomtebudet = () => {
  return (
    <section id="why-tomtebudet" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Varför Tomtebudet?</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-3 mb-4">
            Trygghet i <span className="text-primary">varje steg</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Vi har byggt Sveriges säkraste plattform för tomtebokningar
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group bg-background rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-tomte-red/10 flex items-center justify-center mb-5 group-hover:bg-tomte-red/20 transition-colors">
                <benefit.icon className="w-6 h-6 text-tomte-red" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl text-foreground mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTomtebudet;

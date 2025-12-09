import { Check } from "lucide-react";

const benefits = [
  "Alla tomtar BankID-verifierade – trygg tomtebokning garanterad",
  "Personlig granskning – endast utvalda jultomtar godkänns",
  "Säker betalning – pengarna frisläpps efter julafton-besöket",
  "Dela barnens önskelistor säkert med er privata jultomte",
  "Se tomten med och utan dräkt innan ni bokar tomte",
  "Omdömen från familjer i Stockholm och hela Sverige",
];

const WhyTomtebudet = () => {
  return (
    <section id="why-tomtebudet" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Trygghet & kvalitet</span>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-3 mb-4">
              Sveriges tryggaste sätt att <span className="text-primary">hyra jultomte</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Boka tomte med BankID-verifiering och fullständig nöjdhetsgaranti
            </p>
          </div>

          {/* Benefits grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-4 bg-background rounded-xl p-6 shadow-soft hover:shadow-lg transition-all duration-300"
              >
                {/* Gold checkmark icon */}
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-accent" strokeWidth={3} />
                </div>

                {/* Text */}
                <p className="text-foreground font-medium text-lg leading-relaxed pt-1.5">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTomtebudet;

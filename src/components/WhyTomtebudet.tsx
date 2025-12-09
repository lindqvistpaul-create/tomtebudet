import { Check } from "lucide-react";

const benefits = [
  "Alla tomtar BankID-verifierade",
  "Personlig granskning av varje tomte",
  "Säker betalning – släpps efter besöket",
  "Se tomten med och utan dräkt",
  "Omdömen från familjer i hela Sverige",
  "100% nöjdhetsgaranti",
];

const WhyTomtebudet = () => {
  return (
    <section id="why-tomtebudet" className="py-12 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header - compact on mobile */}
          <div className="text-center mb-8 md:mb-16">
            <span className="text-accent font-medium text-xs md:text-sm uppercase tracking-wider">Trygghet & kvalitet</span>
            <h2 className="font-serif text-2xl md:text-5xl text-foreground mt-2 md:mt-3 mb-2 md:mb-4">
              Sveriges tryggaste sätt att <span className="text-primary">hyra jultomte</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-lg hidden sm:block">
              Boka tomte med BankID-verifiering och fullständig nöjdhetsgaranti
            </p>
          </div>

          {/* Benefits grid - 2 cols on mobile, more compact */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-start gap-3 md:gap-4 bg-background rounded-lg md:rounded-xl p-4 md:p-6 shadow-soft hover:shadow-lg transition-all duration-300"
              >
                {/* Gold checkmark icon */}
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-accent" strokeWidth={3} />
                </div>

                {/* Text */}
                <p className="text-foreground font-medium text-sm md:text-lg leading-snug md:leading-relaxed pt-0.5 md:pt-1.5">
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

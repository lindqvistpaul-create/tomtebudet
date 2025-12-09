import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import Starfall from "@/components/Starfall";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Gift, ArrowRight } from "lucide-react";

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Starfall />
      <SimpleHeader />
      
      <main className="pt-24 pb-16 relative z-10">
        {/* Hero Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Så funkar <span className="text-gradient-gold">Tomtebudet</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Vi gör det enkelt och tryggt att boka en verifierad jultomte till julafton. 
              Här förklarar vi hur allt fungerar – steg för steg.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sok">
                <Button variant="hero" size="lg">
                  <Search className="w-5 h-5" />
                  Hitta en tomte
                </Button>
              </Link>
              <Link to="/bli-tomte">
                <Button variant="outline" size="lg">
                  <Gift className="w-5 h-5" />
                  Bli tomte
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Process for Families */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground text-center mb-8">
                Så bokar du en tomte
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Sök och jämför tomtar",
                    description: "Ange ditt område och se vilka verifierade tomtar som är tillgängliga. Läs om deras erfarenhet, se betyg och jämför priser."
                  },
                  {
                    step: 2,
                    title: "Välj tid och fyll i detaljer",
                    description: "Välj datum, tid och hur långt besöket ska vara. Berätta om barnen, deras önskemål och eventuella särskilda instruktioner för tomten."
                  },
                  {
                    step: 3,
                    title: "Betala tryggt",
                    description: "Betalningen reserveras säkert, men pengarna överförs inte förrän efter genomfört besök. Full trygghet för dig som kund."
                  },
                  {
                    step: 4,
                    title: "Njut av den magiska stunden",
                    description: "Tomten kommer hem till er på utsatt tid. Ha julklapparna redo och förbered er för en oförglömlig julafton!"
                  }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start bg-card rounded-xl p-6 shadow-soft border border-border/50">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-accent font-serif font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Link to="/sok">
                  <Button variant="hero" size="lg">
                    Boka tomte nu
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process for Santas */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground text-center mb-8">
                Så blir du tomte
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: "Registrera dig",
                    description: "Skapa ett konto och påbörja onboarding-processen. Det tar bara några minuter."
                  },
                  {
                    step: 2,
                    title: "Verifiera din identitet",
                    description: "Logga in med BankID och ladda upp din ID-handling. Detta säkerställer trygghet för familjerna."
                  },
                  {
                    step: 3,
                    title: "Ladda upp foton",
                    description: "Ladda upp ett porträttfoto och ett foto i din tomtedräkt. Visa upp din bästa julmagi!"
                  },
                  {
                    step: 4,
                    title: "Sätt priser och tillgänglighet",
                    description: "Bestäm själv ditt pris per 15 minuter och vilka tider du är tillgänglig på julafton."
                  },
                  {
                    step: 5,
                    title: "Invänta godkännande",
                    description: "Vårt team granskar din ansökan. När du är godkänd kan familjerna börja boka dig!"
                  }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start bg-card rounded-xl p-6 shadow-soft border border-border/50">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-serif font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Link to="/bli-tomte">
                  <Button variant="hero" size="lg">
                    Bli tomte
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ showFullContent />
      </main>
      
      <Footer />
    </div>
  );
};

export default HowItWorksPage;

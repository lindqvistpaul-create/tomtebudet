import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import PrelaunchBanner from "@/components/PrelaunchBanner";

const PrelaunchInfo = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PrelaunchBanner />
      <SimpleHeader />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Icon */}
            <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-8">
              <Calendar className="w-12 h-12 text-accent" />
            </div>

            {/* Heading */}
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              Bokningen öppnar inför <span className="text-gradient-gold">julen 2026</span>
            </h1>

            {/* Description */}
            <div className="text-lg text-muted-foreground mb-8 leading-relaxed space-y-4">
              <p>
                Vi håller just nu på att rekrytera och verifiera jultomtar runt om i Sverige.
              </p>
              <p>
                Tomtebudet kommer att öppna bokningen för familjer inför julen 2026. 
                Då kan du tryggt boka en BankID-verifierad tomte direkt via vår plattform.
              </p>
              <p>
                Fram till dess fokuserar vi på att bygga upp ett starkt nätverk av seriösa tomtar.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-4">
              <Link to="/bli-tomte">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  🎅 Bli tomte
                </Button>
              </Link>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Till startsidan
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrelaunchInfo;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";

const FamilyInterestCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-pine-dark to-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Inför julen 2026</span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl text-snow mb-4">
            Anmäl intresse redan nu
          </h2>
          
          <p className="text-snow/70 text-lg mb-8 max-w-2xl mx-auto">
            Tomtebudet lanseras som bokningsplattform inför julen 2026. Redan nu kan du 
            som familj anmäla ditt intresse, så hör vi av oss när bokningen öppnar och 
            du kan boka en verifierad jultomte i ditt område.
          </p>
          
          <Link to="/intresse-familj">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold gap-2 px-8 py-6 text-lg"
            >
              Anmäl intresse som familj
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FamilyInterestCTA;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gift, Calendar, Shield, Heart } from "lucide-react";
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
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Vi öppnar bokningen till <span className="text-gradient-gold">julen 2026</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Just nu bygger vi upp Sveriges tryggaste tomtenätverk. Bokning för familjer 
              öppnar inför julen 2026. Vill du däremot bli tomte kan du skapa din profil redan nu.
            </p>

            {/* Features coming */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <div className="bg-card rounded-xl p-5 shadow-soft">
                <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-medium text-foreground mb-1">BankID-verifierade</h3>
                <p className="text-sm text-muted-foreground">Alla tomtar genomgår säker identitetskontroll</p>
              </div>
              <div className="bg-card rounded-xl p-5 shadow-soft">
                <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-medium text-foreground mb-1">Handplockade</h3>
                <p className="text-sm text-muted-foreground">Vi granskar varje tomte personligen</p>
              </div>
              <div className="bg-card rounded-xl p-5 shadow-soft">
                <Gift className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-medium text-foreground mb-1">Magiska besök</h3>
                <p className="text-sm text-muted-foreground">Oförglömliga minnen för hela familjen</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/bli-tomte">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  🎅 Bli tomte
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Tillbaka till startsidan
                </Button>
              </Link>
            </div>

            {/* Footer note */}
            <p className="text-sm text-muted-foreground mt-8">
              Vill du veta när bokningen öppnar? Följ oss på sociala medier eller kolla tillbaka här.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrelaunchInfo;

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LogoShowcase = () => {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl text-foreground mb-4 text-center">
            Tomtebudet <span className="text-gradient-gold">Logotyp</span>
          </h1>
          <p className="text-muted-foreground text-center mb-12">
            Premium logotyp i flera varianter för olika användningsområden
          </p>

          {/* Dark Background Showcase */}
          <div className="bg-gradient-hero rounded-3xl p-12 mb-8">
            <h2 className="text-snow/60 text-sm uppercase tracking-wider mb-8 text-center">
              På mörk bakgrund
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Horizontal */}
              <div className="text-center">
                <p className="text-snow/40 text-xs uppercase tracking-wider mb-4">Horisontell</p>
                <div className="flex justify-center">
                  <Logo variant="horizontal" size="lg" textColor="light" iconColor="gold" />
                </div>
              </div>

              {/* Vertical */}
              <div className="text-center">
                <p className="text-snow/40 text-xs uppercase tracking-wider mb-4">Vertikal</p>
                <div className="flex justify-center">
                  <Logo variant="vertical" size="lg" textColor="light" iconColor="gold" />
                </div>
              </div>

              {/* Icon only */}
              <div className="text-center">
                <p className="text-snow/40 text-xs uppercase tracking-wider mb-4">Endast ikon</p>
                <div className="flex justify-center">
                  <Logo variant="icon" size="xl" iconColor="gold" />
                </div>
              </div>

              {/* Wordmark only */}
              <div className="text-center">
                <p className="text-snow/40 text-xs uppercase tracking-wider mb-4">Endast ordmärke</p>
                <div className="flex justify-center">
                  <Logo variant="wordmark" size="lg" textColor="light" />
                </div>
              </div>
            </div>

            {/* Size variations */}
            <div className="mt-12 pt-8 border-t border-snow/10">
              <p className="text-snow/40 text-xs uppercase tracking-wider mb-6 text-center">Storleksvarianter</p>
              <div className="flex flex-wrap items-end justify-center gap-8">
                <div className="text-center">
                  <Logo variant="horizontal" size="sm" textColor="light" />
                  <p className="text-snow/30 text-xs mt-2">Small</p>
                </div>
                <div className="text-center">
                  <Logo variant="horizontal" size="md" textColor="light" />
                  <p className="text-snow/30 text-xs mt-2">Medium</p>
                </div>
                <div className="text-center">
                  <Logo variant="horizontal" size="lg" textColor="light" />
                  <p className="text-snow/30 text-xs mt-2">Large</p>
                </div>
                <div className="text-center">
                  <Logo variant="horizontal" size="xl" textColor="light" />
                  <p className="text-snow/30 text-xs mt-2">Extra Large</p>
                </div>
              </div>
            </div>
          </div>

          {/* Light Background Showcase */}
          <div className="bg-card rounded-3xl p-12 shadow-soft border border-border/50">
            <h2 className="text-muted-foreground text-sm uppercase tracking-wider mb-8 text-center">
              På ljus bakgrund
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Horizontal */}
              <div className="text-center">
                <p className="text-muted-foreground/60 text-xs uppercase tracking-wider mb-4">Horisontell</p>
                <div className="flex justify-center">
                  <Logo variant="horizontal" size="lg" textColor="dark" iconColor="dark" />
                </div>
              </div>

              {/* Vertical */}
              <div className="text-center">
                <p className="text-muted-foreground/60 text-xs uppercase tracking-wider mb-4">Vertikal</p>
                <div className="flex justify-center">
                  <Logo variant="vertical" size="lg" textColor="dark" iconColor="dark" />
                </div>
              </div>

              {/* Icon only - dark */}
              <div className="text-center">
                <p className="text-muted-foreground/60 text-xs uppercase tracking-wider mb-4">Ikon (mörk)</p>
                <div className="flex justify-center">
                  <Logo variant="icon" size="xl" iconColor="dark" />
                </div>
              </div>

              {/* Icon only - gold */}
              <div className="text-center">
                <p className="text-muted-foreground/60 text-xs uppercase tracking-wider mb-4">Ikon (guld)</p>
                <div className="flex justify-center">
                  <Logo variant="icon" size="xl" iconColor="gold" />
                </div>
              </div>
            </div>
          </div>

          {/* Color palette */}
          <div className="mt-8 bg-card rounded-3xl p-8 shadow-soft border border-border/50">
            <h2 className="text-muted-foreground text-sm uppercase tracking-wider mb-6 text-center">
              Färgpalett
            </h2>
            <div className="flex justify-center gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-[#D4A657] mb-2 shadow-md" />
                <p className="text-xs text-foreground font-medium">Guld</p>
                <p className="text-xs text-muted-foreground">#D4A657</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-[#0F2F22] mb-2 shadow-md" />
                <p className="text-xs text-foreground font-medium">Mörkgrön</p>
                <p className="text-xs text-muted-foreground">#0F2F22</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-[#FAFAF8] mb-2 shadow-md border border-border" />
                <p className="text-xs text-foreground font-medium">Ivory</p>
                <p className="text-xs text-muted-foreground">#FAFAF8</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-[#C62828] mb-2 shadow-md" />
                <p className="text-xs text-foreground font-medium">Tomteröd</p>
                <p className="text-xs text-muted-foreground">#C62828</p>
              </div>
            </div>
          </div>

          {/* Back button */}
          <div className="text-center mt-8">
            <Link to="/">
              <Button variant="outline">Tillbaka till startsidan</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;

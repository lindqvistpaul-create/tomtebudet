import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Gift, Fingerprint } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-pine-dark/95 backdrop-blur-md border-b border-snow/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Gift className="w-7 h-7 text-accent" />
            <span className="font-serif text-xl md:text-2xl text-snow">
              Tomte<span className="text-gradient-gold">budet</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection("top-santas")}
              className="text-snow/80 hover:text-accent transition-colors text-sm font-medium"
            >
              Hitta tomte
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")}
              className="text-snow/80 hover:text-accent transition-colors text-sm font-medium"
            >
              Så funkar det
            </button>
            <button 
              onClick={() => scrollToSection("why-tomtebudet")}
              className="text-snow/80 hover:text-accent transition-colors text-sm font-medium"
            >
              Varför Tomtebudet
            </button>
            <button 
              onClick={() => scrollToSection("become-santa")}
              className="text-snow/80 hover:text-accent transition-colors text-sm font-medium"
            >
              För tomtar
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="default"
              className="text-snow/80 hover:text-accent hover:bg-snow/5"
            >
              <Fingerprint className="w-4 h-4 mr-2" />
              Logga in
            </Button>
            <Button 
              variant="hero" 
              size="default"
              onClick={() => scrollToSection("top-santas")}
            >
              Boka tomte
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-snow p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-snow/10">
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => scrollToSection("top-santas")}
                className="text-snow/80 hover:text-accent transition-colors text-left py-3 px-2 rounded-lg hover:bg-snow/5"
              >
                Hitta tomte
              </button>
              <button 
                onClick={() => scrollToSection("how-it-works")}
                className="text-snow/80 hover:text-accent transition-colors text-left py-3 px-2 rounded-lg hover:bg-snow/5"
              >
                Så funkar det
              </button>
              <button 
                onClick={() => scrollToSection("why-tomtebudet")}
                className="text-snow/80 hover:text-accent transition-colors text-left py-3 px-2 rounded-lg hover:bg-snow/5"
              >
                Varför Tomtebudet
              </button>
              <button 
                onClick={() => scrollToSection("become-santa")}
                className="text-snow/80 hover:text-accent transition-colors text-left py-3 px-2 rounded-lg hover:bg-snow/5"
              >
                För tomtar
              </button>
              
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-snow/10">
                <Button 
                  variant="ghost" 
                  size="default"
                  className="w-full justify-start text-snow/80 hover:text-accent hover:bg-snow/5"
                >
                  <Fingerprint className="w-4 h-4 mr-2" />
                  Logga in
                </Button>
                <Button 
                  variant="hero" 
                  size="default"
                  onClick={() => scrollToSection("top-santas")}
                  className="w-full"
                >
                  Boka tomte
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

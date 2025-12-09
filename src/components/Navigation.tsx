import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Gift } from "lucide-react";

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
            <span className="font-serif text-xl md:text-2xl text-snow">Tomtebudet</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
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
              Varför Tomtebudet?
            </button>
            <button 
              onClick={() => scrollToSection("top-santas")}
              className="text-snow/80 hover:text-accent transition-colors text-sm font-medium"
            >
              Hitta tomte
            </button>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="snow" 
              size="default"
              onClick={() => scrollToSection("become-santa")}
            >
              Bli tomte
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
            className="md:hidden text-snow p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-snow/10">
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection("how-it-works")}
                className="text-snow/80 hover:text-accent transition-colors text-left py-2"
              >
                Så funkar det
              </button>
              <button 
                onClick={() => scrollToSection("why-tomtebudet")}
                className="text-snow/80 hover:text-accent transition-colors text-left py-2"
              >
                Varför Tomtebudet?
              </button>
              <button 
                onClick={() => scrollToSection("top-santas")}
                className="text-snow/80 hover:text-accent transition-colors text-left py-2"
              >
                Hitta tomte
              </button>
              <div className="flex flex-col gap-2 pt-4 border-t border-snow/10">
                <Button 
                  variant="snow" 
                  size="default"
                  onClick={() => scrollToSection("become-santa")}
                  className="w-full"
                >
                  Bli tomte
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

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Fingerprint } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const navLinks = [
    { label: "Hitta tomte", target: "top-santas" },
    { label: "Så fungerar det", target: "how-it-works" },
    { label: "Trygghet & kvalitet", target: "why-tomtebudet" },
    { label: "Bli tomte", target: "become-santa" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-pine-dark/95 backdrop-blur-md border-b border-snow/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <Logo variant="horizontal" size="md" textColor="light" iconColor="gold" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollToSection(link.target)}
                className="text-snow/80 hover:text-accent transition-colors text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="default"
              className="text-snow/80 hover:text-accent hover:bg-snow/5"
            >
              <Fingerprint className="w-4 h-4" />
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
            className="lg:hidden text-snow p-2 hover:bg-snow/5 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Stäng meny" : "Öppna meny"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden py-4 border-t border-snow/10 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollToSection(link.target)}
                  className="text-snow/80 hover:text-accent transition-colors text-left py-3 px-3 rounded-lg hover:bg-snow/5"
                >
                  {link.label}
                </button>
              ))}
              
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-snow/10">
                <Button 
                  variant="ghost" 
                  size="default"
                  className="w-full justify-start text-snow/80 hover:text-accent hover:bg-snow/5"
                >
                  <Fingerprint className="w-4 h-4" />
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
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

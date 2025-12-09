import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Gift, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { user, signOut, loading } = useAuth();

  const scrollToSection = (id: string) => {
    if (isHomePage) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
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
            <Link to="/tomte-dashboard">
              <Button 
                variant="ghost" 
                size="default"
                className="text-snow/80 hover:text-accent hover:bg-snow/5"
              >
                <Gift className="w-4 h-4" />
                Tomteportal
              </Button>
            </Link>
            
            {loading ? (
              <div className="w-24 h-10 bg-snow/10 rounded animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="default"
                    className="text-snow/80 hover:text-accent hover:bg-snow/5 gap-2"
                  >
                    <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-accent" />
                    </div>
                    <span className="max-w-24 truncate">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/mitt-konto" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Mitt konto
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/mina-bokningar" className="cursor-pointer">
                      <Gift className="w-4 h-4 mr-2" />
                      Mina bokningar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logga ut
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button 
                  variant="ghost" 
                  size="default"
                  className="text-snow/80 hover:text-accent hover:bg-snow/5"
                >
                  <User className="w-4 h-4" />
                  Logga in
                </Button>
              </Link>
            )}
            
            <Link to="/sok">
              <Button 
                variant="hero" 
                size="default"
              >
                Boka tomte
              </Button>
            </Link>
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
                {user ? (
                  <>
                    <Link to="/mitt-konto" onClick={() => setIsOpen(false)}>
                      <Button 
                        variant="ghost" 
                        size="default"
                        className="w-full justify-start text-snow/80 hover:text-accent hover:bg-snow/5"
                      >
                        <User className="w-4 h-4" />
                        Mitt konto
                      </Button>
                    </Link>
                    <Link to="/mina-bokningar" onClick={() => setIsOpen(false)}>
                      <Button 
                        variant="ghost" 
                        size="default"
                        className="w-full justify-start text-snow/80 hover:text-accent hover:bg-snow/5"
                      >
                        <Gift className="w-4 h-4" />
                        Mina bokningar
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="default"
                      className="w-full justify-start text-destructive hover:bg-destructive/10"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4" />
                      Logga ut
                    </Button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button 
                      variant="ghost" 
                      size="default"
                      className="w-full justify-start text-snow/80 hover:text-accent hover:bg-snow/5"
                    >
                      <User className="w-4 h-4" />
                      Logga in
                    </Button>
                  </Link>
                )}
                <Link to="/tomte-dashboard" onClick={() => setIsOpen(false)}>
                  <Button 
                    variant="ghost" 
                    size="default"
                    className="w-full justify-start text-snow/80 hover:text-accent hover:bg-snow/5"
                  >
                    <Gift className="w-4 h-4" />
                    Tomteportal
                  </Button>
                </Link>
                <Link to="/sok" onClick={() => setIsOpen(false)}>
                  <Button 
                    variant="hero" 
                    size="default"
                    className="w-full"
                  >
                    Boka tomte
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

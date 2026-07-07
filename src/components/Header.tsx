import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Gift, User, LogOut, Calendar, Settings, ChevronRight, Shield } from "lucide-react";
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
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { user, role, signOut, loading } = useAuth();

  const isAdmin = role === "admin";
  const isSanta = role === "santa";
  const isCustomer = role === "customer";

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
    { label: "Hitta tomte", href: "/sok", icon: Gift },
    { label: "Så fungerar det", href: "/sa-funkar-det", icon: Calendar },
    { label: "Trygghet & kvalitet", target: "why-tomtebudet", icon: Settings },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-pine-dark/95 backdrop-blur-md border-b border-snow/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-20">
          {/* Logo */}
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <Logo variant="horizontal" size="md" textColor="light" iconColor="gold" className="hidden sm:flex" />
            <Logo variant="icon" size="sm" textColor="light" iconColor="gold" className="flex sm:hidden" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              'href' in link ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-snow/80 hover:text-accent transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.target}
                  onClick={() => scrollToSection(link.target!)}
                  className="text-snow/80 hover:text-accent transition-colors text-sm font-medium"
                >
                  {link.label}
                </button>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {loading ? (
              <div className="w-24 h-10 bg-snow/10 rounded animate-pulse" />
            ) : user ? (
              <>
                {/* Role-specific navigation */}
                {isSanta && (
                  <Link to="/tomte-dashboard">
                    <Button 
                      variant="ghost" 
                      size="default"
                      className="text-snow/80 hover:text-accent hover:bg-snow/5"
                    >
                      <Calendar className="w-4 h-4" />
                      Tomtens dashboard
                    </Button>
                  </Link>
                )}
                {isCustomer && (
                  <Link to="/mina-bokningar">
                    <Button 
                      variant="ghost" 
                      size="default"
                      className="text-snow/80 hover:text-accent hover:bg-snow/5"
                    >
                      <Gift className="w-4 h-4" />
                      Mina bokningar
                    </Button>
                  </Link>
                )}
                
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
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="cursor-pointer">
                          <Shield className="w-4 h-4 mr-2" />
                          Adminpanel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link to="/mitt-konto" className="cursor-pointer">
                        <Settings className="w-4 h-4 mr-2" />
                        Mitt konto
                      </Link>
                    </DropdownMenuItem>
                    {isCustomer && (
                      <DropdownMenuItem asChild>
                        <Link to="/mina-bokningar" className="cursor-pointer">
                          <Gift className="w-4 h-4 mr-2" />
                          Mina bokningar
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {isSanta && (
                      <DropdownMenuItem asChild>
                        <Link to="/tomte-dashboard" className="cursor-pointer">
                          <Calendar className="w-4 h-4 mr-2" />
                          Tomtens dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logga ut
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    variant="ghost" 
                    size="default"
                    className="text-snow/80 hover:text-accent hover:bg-snow/5"
                  >
                    <User className="w-4 h-4" />
                    Logga in
                  </Button>
                </Link>
                <Link to="/signup?role=santa">
                  <Button 
                    variant="ghost" 
                    size="default"
                    className="text-snow/80 hover:text-accent hover:bg-snow/5"
                  >
                    <Gift className="w-4 h-4" />
                    Bli tomte
                  </Button>
                </Link>
              </>
            )}
            
            {!isSanta && (
              <Link to="/sok">
                <Button 
                  variant="hero" 
                  size="default"
                >
                  Boka tomte
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button - larger touch target */}
          <button
            className="lg:hidden text-snow p-3 -mr-2 hover:bg-snow/5 rounded-xl transition-colors active:scale-95 touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Stäng meny" : "Öppna meny"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="bg-pine-dark border-snow/10 max-h-[85vh]">
          <DrawerHeader className="border-b border-snow/10 pb-4">
            <div className="flex items-center justify-between">
              <Logo variant="horizontal" size="sm" textColor="light" iconColor="gold" />
              <DrawerClose asChild>
                <button 
                  className="p-3 -mr-2 text-snow/80 hover:text-snow hover:bg-snow/5 rounded-xl transition-colors active:scale-95 touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center"
                  aria-label="Stäng meny"
                >
                  <X className="w-6 h-6" />
                </button>
              </DrawerClose>
            </div>
            <DrawerTitle className="sr-only">Navigation</DrawerTitle>
          </DrawerHeader>

          <div className="flex flex-col p-4 overflow-y-auto">
            {/* User info banner if logged in */}
            {user && (
              <div className="flex items-center gap-3 p-4 mb-4 bg-snow/5 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-snow font-medium truncate">
                    {user.user_metadata?.full_name || 'Välkommen!'}
                  </p>
                  <p className="text-snow/60 text-sm truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation links */}
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return 'href' in link ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 text-snow/80 hover:text-snow active:text-accent transition-colors py-4 px-4 rounded-xl hover:bg-snow/5 active:bg-snow/10 touch-manipulation min-h-[56px]"
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-base font-medium">{link.label}</span>
                    <ChevronRight className="w-5 h-5 text-snow/40" />
                  </Link>
                ) : (
                  <button
                    key={link.target}
                    onClick={() => scrollToSection(link.target!)}
                    className="flex items-center gap-4 text-snow/80 hover:text-snow active:text-accent transition-colors py-4 px-4 rounded-xl hover:bg-snow/5 active:bg-snow/10 touch-manipulation min-h-[56px] w-full text-left"
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-base font-medium">{link.label}</span>
                    <ChevronRight className="w-5 h-5 text-snow/40" />
                  </button>
                );
              })}
            </nav>

            {/* Divider */}
            <div className="h-px bg-snow/10 my-4" />

            {/* User actions */}
            <div className="flex flex-col gap-1">
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 text-accent hover:text-accent/80 active:text-accent transition-colors py-4 px-4 rounded-xl hover:bg-accent/10 active:bg-accent/20 touch-manipulation min-h-[56px]"
                    >
                      <Shield className="w-5 h-5 flex-shrink-0" />
                      <span className="flex-1 text-base font-medium">Adminpanel</span>
                      <ChevronRight className="w-5 h-5 text-accent/40" />
                    </Link>
                  )}
                  
                  <Link
                    to="/mitt-konto"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 text-snow/80 hover:text-snow active:text-accent transition-colors py-4 px-4 rounded-xl hover:bg-snow/5 active:bg-snow/10 touch-manipulation min-h-[56px]"
                  >
                    <Settings className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-base font-medium">Mitt konto</span>
                    <ChevronRight className="w-5 h-5 text-snow/40" />
                  </Link>
                  
                  {isCustomer && (
                    <Link
                      to="/mina-bokningar"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 text-snow/80 hover:text-snow active:text-accent transition-colors py-4 px-4 rounded-xl hover:bg-snow/5 active:bg-snow/10 touch-manipulation min-h-[56px]"
                    >
                      <Gift className="w-5 h-5 flex-shrink-0" />
                      <span className="flex-1 text-base font-medium">Mina bokningar</span>
                      <ChevronRight className="w-5 h-5 text-snow/40" />
                    </Link>
                  )}
                  
                  {isSanta && (
                    <Link
                      to="/tomte-dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 text-snow/80 hover:text-snow active:text-accent transition-colors py-4 px-4 rounded-xl hover:bg-snow/5 active:bg-snow/10 touch-manipulation min-h-[56px]"
                    >
                      <Calendar className="w-5 h-5 flex-shrink-0" />
                      <span className="flex-1 text-base font-medium">Tomtens dashboard</span>
                      <ChevronRight className="w-5 h-5 text-snow/40" />
                    </Link>
                  )}

                  {/* Divider before logout */}
                  <div className="h-px bg-snow/10 my-2" />
                  
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-4 text-destructive hover:text-destructive/80 transition-colors py-4 px-4 rounded-xl hover:bg-destructive/10 active:bg-destructive/20 touch-manipulation min-h-[56px] w-full text-left"
                  >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-base font-medium">Logga ut</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 text-snow/80 hover:text-snow active:text-accent transition-colors py-4 px-4 rounded-xl hover:bg-snow/5 active:bg-snow/10 touch-manipulation min-h-[56px]"
                  >
                    <User className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-base font-medium">Logga in</span>
                    <ChevronRight className="w-5 h-5 text-snow/40" />
                  </Link>
                  
                  <Link
                    to="/signup?role=santa"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 text-snow/80 hover:text-snow active:text-accent transition-colors py-4 px-4 rounded-xl hover:bg-snow/5 active:bg-snow/10 touch-manipulation min-h-[56px]"
                  >
                    <Gift className="w-5 h-5 flex-shrink-0" />
                    <span className="flex-1 text-base font-medium">Bli tomte</span>
                    <ChevronRight className="w-5 h-5 text-snow/40" />
                  </Link>
                </>
              )}
            </div>

            {/* Primary CTA */}
            {!isSanta && (
              <div className="mt-6 pb-safe">
                <Link to="/sok" onClick={() => setIsOpen(false)}>
                  <Button 
                    variant="hero" 
                    size="lg"
                    className="w-full text-base py-6 min-h-[56px]"
                  >
                    <Gift className="w-5 h-5" />
                    Boka tomte
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Header;

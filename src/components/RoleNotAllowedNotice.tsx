import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gift, ShieldX, Sparkles, Star, Calendar } from "lucide-react";

type RoleType = "customer" | "santa" | "admin";

interface RoleNotAllowedNoticeProps {
  userRole: RoleType;
  requiredRole: RoleType;
}

const RoleNotAllowedNotice = ({ userRole, requiredRole }: RoleNotAllowedNoticeProps) => {
  // Determine content based on required role
  const getContent = () => {
    if (requiredRole === "admin") {
      return {
        title: "Åtkomst nekad",
        message: "Den här sidan är endast tillgänglig för administratörer. Om du tror att du borde ha tillgång, vänligen kontakta support.",
        buttonText: "Till startsidan",
        buttonLink: "/",
        buttonIcon: Gift,
        accentColor: "tomte-red",
      };
    }
    
    if (requiredRole === "santa") {
      return {
        title: "Endast för jultomtar",
        message: "Den här sidan är bara till för jultomtar. Om du vill bli tomte och sprida julglädje kan du skicka in en ansökan.",
        buttonText: "Bli tomte",
        buttonLink: "/bli-tomte",
        buttonIcon: Star,
        accentColor: "accent",
      };
    }
    
    return {
      title: "Endast för kunder",
      message: "Den här sidan är bara till för kunder. Gå till din tomtedashboard för att se dina bokningar och hantera din profil.",
      buttonText: "Tomtens dashboard",
      buttonLink: "/tomte-dashboard",
      buttonIcon: Calendar,
      accentColor: "primary",
    };
  };

  const content = getContent();

  const ButtonIcon = content.buttonIcon;

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Link to="/" className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Gift className="w-8 h-8 text-accent" />
          <span className="font-serif text-2xl text-background">
            Tomte<span className="text-accent">budet</span>
          </span>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-background rounded-3xl p-8 md:p-10 shadow-2xl text-center">
            {/* Icon */}
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full bg-tomte-red/10 flex items-center justify-center mx-auto">
                <ShieldX className="w-10 h-10 text-tomte-red" />
              </div>
              <div className="absolute -top-2 -right-2 left-0 right-0 flex justify-center">
                <div className="flex gap-1">
                  <Sparkles className="w-4 h-4 text-accent animate-twinkle" />
                  <Sparkles className="w-5 h-5 text-accent animate-twinkle" style={{ animationDelay: "0.2s" }} />
                  <Sparkles className="w-4 h-4 text-accent animate-twinkle" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>

            {/* Text */}
            <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
              {content.title}
            </h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {content.message}
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Link to={content.buttonLink}>
                <Button variant="hero" size="lg" className="w-full gap-2">
                  <ButtonIcon className="w-4 h-4" />
                  {content.buttonText}
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg" className="w-full">
                  Tillbaka till startsidan
                </Button>
              </Link>
            </div>
          </div>

          {/* Back to home */}
          <div className="text-center mt-8">
            <Link to="/" className="text-background/70 hover:text-background transition-colors">
              ← Tillbaka till startsidan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleNotAllowedNotice;
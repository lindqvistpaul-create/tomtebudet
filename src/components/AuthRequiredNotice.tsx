import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gift, Lock, Sparkles, User } from "lucide-react";

interface AuthRequiredNoticeProps {
  title?: string;
  message?: string;
  returnTo?: string;
}

const AuthRequiredNotice = ({
  title = "Du behöver logga in",
  message = "För att se den här sidan behöver du vara inloggad på Tomtebudet. Logga in eller skapa ett konto för att fortsätta.",
  returnTo,
}: AuthRequiredNoticeProps) => {
  const loginUrl = returnTo ? `/login?returnTo=${encodeURIComponent(returnTo)}` : "/login";
  const signupUrl = returnTo ? `/signup?returnTo=${encodeURIComponent(returnTo)}` : "/signup";

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
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Lock className="w-10 h-10 text-primary" />
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
              {title}
            </h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {message}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to={loginUrl} className="flex-1">
                <Button variant="hero" size="lg" className="w-full gap-2">
                  <User className="w-4 h-4" />
                  Logga in
                </Button>
              </Link>
              <Link to={signupUrl} className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  Skapa konto
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

export default AuthRequiredNotice;
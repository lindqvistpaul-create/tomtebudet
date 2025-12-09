import { Shield, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  variant?: "default" | "hero" | "compact" | "card";
  className?: string;
}

const TrustBadge = ({ variant = "default", className }: TrustBadgeProps) => {
  if (variant === "hero") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-3 px-5 py-3 rounded-full",
          "bg-snow/10 border border-snow/20 backdrop-blur-sm",
          "shadow-lg shadow-accent/10",
          className
        )}
      >
        <div className="relative">
          <Shield className="w-5 h-5 text-accent" />
          <Check className="absolute -bottom-0.5 -right-0.5 w-3 h-3 text-accent" strokeWidth={3} />
        </div>
        <span className="text-snow text-sm font-medium tracking-wide">
          BankID-verifierade tomtar – tryggt för hela familjen
        </span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
          "bg-primary/10 border border-primary/20",
          className
        )}
      >
        <Shield className="w-4 h-4 text-primary" />
        <span className="text-foreground text-xs font-medium">
          BankID-verifierad
        </span>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          "flex items-center gap-4 p-4 rounded-xl",
          "bg-gradient-to-r from-primary/5 to-accent/5",
          "border border-primary/15",
          className
        )}
      >
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center shadow-md">
            <Check className="w-3 h-3 text-accent-foreground" strokeWidth={3} />
          </div>
        </div>
        <div>
          <p className="font-serif text-lg text-foreground font-medium">
            BankID-verifierade tomtar
          </p>
          <p className="text-muted-foreground text-sm">
            Tryggt för hela familjen
          </p>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 px-4 py-2.5 rounded-xl",
        "bg-card border border-border/50 shadow-soft",
        "hover:shadow-lg transition-shadow duration-300",
        className
      )}
    >
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent flex items-center justify-center shadow-sm">
          <Check className="w-2.5 h-2.5 text-accent-foreground" strokeWidth={3} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-foreground text-sm font-semibold">
          BankID-verifierade tomtar
        </span>
        <span className="text-muted-foreground text-xs">
          Tryggt för hela familjen
        </span>
      </div>
    </div>
  );
};

export default TrustBadge;

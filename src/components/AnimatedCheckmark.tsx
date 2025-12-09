import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedCheckmarkProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-28 h-28",
};

const iconSizes = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-14 h-14",
};

const AnimatedCheckmark = ({ className, size = "md" }: AnimatedCheckmarkProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Outer glow rings */}
      <div 
        className="absolute inset-0 rounded-full bg-primary/20 checkmark-circle"
        style={{ animationDelay: "0.1s" }}
      />
      <div 
        className="absolute inset-2 rounded-full bg-primary/10 checkmark-circle"
        style={{ animationDelay: "0.2s" }}
      />
      
      {/* Main circle */}
      <div 
        className={cn(
          "rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center checkmark-success shadow-lg",
          sizeClasses[size]
        )}
        style={{ 
          boxShadow: "0 0 30px hsl(var(--primary) / 0.4), 0 10px 40px -10px hsl(var(--primary) / 0.5)" 
        }}
      >
        <Check className={cn("text-primary-foreground stroke-[3]", iconSizes[size])} />
      </div>

      {/* Sparkle effects */}
      <div 
        className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-star-twinkle"
        style={{ animationDelay: "0.5s" }}
      />
      <div 
        className="absolute -bottom-2 -left-1 w-2 h-2 bg-accent rounded-full animate-star-twinkle"
        style={{ animationDelay: "0.8s" }}
      />
      <div 
        className="absolute top-1/2 -right-3 w-2 h-2 bg-accent rounded-full animate-star-twinkle"
        style={{ animationDelay: "1.1s" }}
      />
    </div>
  );
};

export default AnimatedCheckmark;

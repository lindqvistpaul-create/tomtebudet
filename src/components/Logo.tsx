import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "horizontal" | "vertical" | "icon" | "wordmark";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  iconColor?: "gold" | "white" | "dark";
  textColor?: "light" | "dark";
}

const Logo = ({ 
  variant = "horizontal", 
  size = "md", 
  className,
  iconColor = "gold",
  textColor = "light"
}: LogoProps) => {
  const sizeConfig = {
    sm: { icon: 24, text: "text-lg", gap: "gap-1.5" },
    md: { icon: 32, text: "text-xl", gap: "gap-2" },
    lg: { icon: 40, text: "text-2xl", gap: "gap-2.5" },
    xl: { icon: 56, text: "text-4xl", gap: "gap-3" },
  };

  const iconColors = {
    gold: "#D4A657",
    white: "#FAFAF8",
    dark: "#0F2F22",
  };

  const config = sizeConfig[size];
  const iconFill = iconColors[iconColor];

  // Premium minimalist Santa hat / gift icon
  const LogoIcon = ({ width = config.icon }: { width?: number }) => (
    <svg 
      width={width} 
      height={width} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Stylized gift box with ribbon - premium minimalist design */}
      <rect 
        x="8" 
        y="20" 
        width="32" 
        height="24" 
        rx="3" 
        stroke={iconFill}
        strokeWidth="2.5"
        fill="none"
      />
      {/* Lid */}
      <rect 
        x="6" 
        y="14" 
        width="36" 
        height="8" 
        rx="2" 
        stroke={iconFill}
        strokeWidth="2.5"
        fill="none"
      />
      {/* Vertical ribbon */}
      <line 
        x1="24" 
        y1="14" 
        x2="24" 
        y2="44" 
        stroke={iconFill}
        strokeWidth="2.5"
      />
      {/* Bow - left loop */}
      <path 
        d="M24 14C24 14 18 8 14 8C10 8 8 10 8 12C8 14 10 16 14 14C18 12 24 14 24 14Z" 
        stroke={iconFill}
        strokeWidth="2"
        fill="none"
      />
      {/* Bow - right loop */}
      <path 
        d="M24 14C24 14 30 8 34 8C38 8 40 10 40 12C40 14 38 16 34 14C30 12 24 14 24 14Z" 
        stroke={iconFill}
        strokeWidth="2"
        fill="none"
      />
      {/* Bow center */}
      <circle 
        cx="24" 
        cy="14" 
        r="2.5" 
        fill={iconFill}
      />
    </svg>
  );

  // Alternative: Stylized Santa hat icon (more unique)
  const SantaHatIcon = ({ width = config.icon }: { width?: number }) => (
    <svg 
      width={width} 
      height={width} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Hat body - elegant curved triangle */}
      <path 
        d="M8 38C8 38 12 36 24 36C36 36 40 38 40 38L36 16C36 16 32 8 24 8C16 8 12 16 12 16L8 38Z" 
        stroke={iconFill}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Hat brim - fur trim */}
      <path 
        d="M6 38C6 38 10 34 24 34C38 34 42 38 42 38C42 38 38 42 24 42C10 42 6 38 6 38Z" 
        stroke={iconFill}
        strokeWidth="2.5"
        fill="none"
      />
      {/* Pompom */}
      <circle 
        cx="24" 
        cy="8" 
        r="4" 
        stroke={iconFill}
        strokeWidth="2.5"
        fill="none"
      />
      {/* Decorative star accent */}
      <path 
        d="M24 20L25.5 23L29 23.5L26.5 26L27 29.5L24 28L21 29.5L21.5 26L19 23.5L22.5 23L24 20Z" 
        fill={iconFill}
      />
    </svg>
  );

  const Wordmark = () => (
    <span className={cn("font-serif font-semibold tracking-tight", config.text)}>
      <span className={cn(
        textColor === "light" ? "text-snow" : "text-foreground"
      )}>
        Tomte
      </span>
      <span className="text-gradient-gold">budet</span>
    </span>
  );

  if (variant === "icon") {
    return (
      <div className={cn("inline-flex", className)}>
        <SantaHatIcon width={config.icon * 1.5} />
      </div>
    );
  }

  if (variant === "wordmark") {
    return (
      <div className={cn("inline-flex items-center", className)}>
        <Wordmark />
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={cn("inline-flex flex-col items-center gap-2", className)}>
        <SantaHatIcon width={config.icon * 1.5} />
        <Wordmark />
      </div>
    );
  }

  // Default: horizontal
  return (
    <div className={cn("inline-flex items-center", config.gap, className)}>
      <SantaHatIcon />
      <Wordmark />
    </div>
  );
};

export default Logo;

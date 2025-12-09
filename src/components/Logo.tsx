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
    sm: { icon: 24, text: "text-lg", gap: "gap-2" },
    md: { icon: 32, text: "text-xl", gap: "gap-2.5" },
    lg: { icon: 40, text: "text-2xl", gap: "gap-3" },
    xl: { icon: 56, text: "text-4xl", gap: "gap-4" },
  };

  const iconColors = {
    gold: "#D4A657",
    white: "#FAFAF8",
    dark: "#0F2F22",
  };

  const config = sizeConfig[size];
  const iconFill = iconColors[iconColor];

  // Premium minimalist Santa hat icon - elegant, Scandinavian design
  const PremiumHatIcon = ({ width = config.icon }: { width?: number }) => (
    <svg 
      width={width} 
      height={width} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Elegant curved hat silhouette */}
      <path 
        d="M10 40C10 40 14 37 24 37C34 37 38 40 38 40"
        stroke={iconFill}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Hat body - flowing elegant curve */}
      <path 
        d="M14 37C15 30 17 22 20 16C22 12 24 10 28 10C30 10 33 11 36 14"
        stroke={iconFill}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Hat tip curve */}
      <path 
        d="M36 14C38 16 40 20 40 24C40 26 39 28 37 28"
        stroke={iconFill}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Elegant pompom */}
      <circle 
        cx="37" 
        cy="28" 
        r="4" 
        fill={iconFill}
      />
      {/* Subtle star sparkle */}
      <path 
        d="M18 24L18.8 26.4L21.2 26.4L19.2 27.8L20 30.2L18 28.8L16 30.2L16.8 27.8L14.8 26.4L17.2 26.4L18 24Z" 
        fill={iconFill}
        opacity="0.7"
      />
    </svg>
  );

  // Alternative: Elegant star icon with Nordic feel
  const StarIcon = ({ width = config.icon }: { width?: number }) => (
    <svg 
      width={width} 
      height={width} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Eight-pointed Nordic star */}
      <path 
        d="M24 4L26.5 18.5L41 16L30 24L41 32L26.5 29.5L24 44L21.5 29.5L7 32L18 24L7 16L21.5 18.5L24 4Z"
        stroke={iconFill}
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Inner diamond */}
      <path 
        d="M24 16L28 24L24 32L20 24L24 16Z"
        fill={iconFill}
      />
    </svg>
  );

  // Gift package icon - minimal premium design
  const GiftIcon = ({ width = config.icon }: { width?: number }) => (
    <svg 
      width={width} 
      height={width} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Gift box body */}
      <rect 
        x="10" 
        y="20" 
        width="28" 
        height="22" 
        rx="2" 
        stroke={iconFill}
        strokeWidth="2.5"
        fill="none"
      />
      {/* Lid */}
      <rect 
        x="8" 
        y="14" 
        width="32" 
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
        y2="42" 
        stroke={iconFill}
        strokeWidth="2.5"
      />
      {/* Bow - elegant curves */}
      <path 
        d="M24 14C22 12 18 8 15 9C12 10 12 13 14 14C16 15 20 14 24 14"
        stroke={iconFill}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M24 14C26 12 30 8 33 9C36 10 36 13 34 14C32 15 28 14 24 14"
        stroke={iconFill}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Bow center */}
      <circle cx="24" cy="14" r="2" fill={iconFill} />
    </svg>
  );

  // Combined icon: Hat with star - signature Tomtebudet mark
  const SignatureIcon = ({ width = config.icon }: { width?: number }) => (
    <svg 
      width={width} 
      height={width} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Stylized "T" monogram with hat curve */}
      <path 
        d="M12 16H36"
        stroke={iconFill}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Hat curve accent */}
      <path 
        d="M32 16C36 18 40 22 40 26C40 28 39 30 36 30"
        stroke={iconFill}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Pompom */}
      <circle cx="36" cy="30" r="3.5" fill={iconFill} />
      {/* Vertical stem */}
      <path 
        d="M24 16V40"
        stroke={iconFill}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Small decorative star */}
      <path 
        d="M16 26L17 28.5L19.5 28.5L17.5 30L18 32.5L16 31L14 32.5L14.5 30L12.5 28.5L15 28.5L16 26Z" 
        fill={iconFill}
      />
    </svg>
  );

  const Wordmark = ({ useGoldGradient = true }: { useGoldGradient?: boolean }) => (
    <span className={cn("font-serif font-semibold tracking-tight leading-none", config.text)}>
      <span className={cn(
        textColor === "light" ? "text-white" : "text-foreground"
      )}>
        Tomte
      </span>
      {useGoldGradient ? (
        <span 
          style={{ 
            background: 'linear-gradient(135deg, #D4A657 0%, #E8C97A 50%, #D4A657 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          budet
        </span>
      ) : (
        <span style={{ color: '#D4A657' }}>budet</span>
      )}
    </span>
  );

  if (variant === "icon") {
    return (
      <div className={cn("inline-flex", className)}>
        <SignatureIcon width={config.icon * 1.5} />
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
      <div className={cn("inline-flex flex-col items-center gap-3", className)}>
        <SignatureIcon width={config.icon * 1.75} />
        <Wordmark />
      </div>
    );
  }

  // Default: horizontal
  return (
    <div className={cn("inline-flex items-center", config.gap, className)}>
      <SignatureIcon />
      <Wordmark />
    </div>
  );
};

export default Logo;
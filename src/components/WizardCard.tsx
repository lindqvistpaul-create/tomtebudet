import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface WizardCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
  variant?: "default" | "highlighted" | "success";
}

const WizardCard = ({
  children,
  title,
  subtitle,
  icon,
  className,
  variant = "default",
}: WizardCardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 md:p-8 transition-all duration-300",
        variant === "default" && "bg-card shadow-soft border border-border/50",
        variant === "highlighted" && "bg-card shadow-lg border-2 border-accent/30 shadow-[0_4px_40px_rgba(212,166,87,0.1)]",
        variant === "success" && "bg-gradient-to-br from-accent/5 to-accent/10 border-2 border-accent/40",
        className
      )}
    >
      {/* Header */}
      {(title || subtitle || icon) && (
        <div className="mb-6">
          {icon && (
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <span className="text-accent">{icon}</span>
            </div>
          )}
          {title && (
            <h2 className="font-serif text-2xl md:text-3xl text-foreground leading-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-muted-foreground mt-2 text-base md:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Content */}
      {children}
    </div>
  );
};

// Sub-component for wizard sections
interface WizardSectionProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const WizardSection = ({
  children,
  title,
  description,
  className,
}: WizardSectionProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      {(title || description) && (
        <div>
          {title && (
            <h3 className="font-serif text-lg text-foreground mb-1">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

// Sub-component for info boxes within wizard
interface WizardInfoBoxProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "info" | "success" | "warning" | "gold";
  className?: string;
}

export const WizardInfoBox = ({
  children,
  icon,
  variant = "info",
  className,
}: WizardInfoBoxProps) => {
  return (
    <div
      className={cn(
        "rounded-xl p-4 flex items-start gap-3",
        variant === "info" && "bg-primary/5 border border-primary/20",
        variant === "success" && "bg-primary/10 border border-primary/30",
        variant === "warning" && "bg-secondary/10 border border-secondary/30",
        variant === "gold" && "bg-accent/10 border border-accent/30",
        className
      )}
    >
      {icon && (
        <span className={cn(
          "flex-shrink-0 mt-0.5",
          variant === "info" && "text-primary",
          variant === "success" && "text-primary",
          variant === "warning" && "text-secondary",
          variant === "gold" && "text-accent"
        )}>
          {icon}
        </span>
      )}
      <div className="flex-1 text-sm">{children}</div>
    </div>
  );
};

// Sub-component for summary rows
interface WizardSummaryRowProps {
  label: string;
  value: string | ReactNode;
  highlight?: boolean;
  className?: string;
}

export const WizardSummaryRow = ({
  label,
  value,
  highlight = false,
  className,
}: WizardSummaryRowProps) => {
  return (
    <div className={cn("flex items-center justify-between py-2", className)}>
      <span className={cn(
        "text-muted-foreground",
        highlight && "text-foreground font-medium"
      )}>
        {label}
      </span>
      <span className={cn(
        "text-foreground",
        highlight && "font-serif text-xl font-semibold"
      )}>
        {value}
      </span>
    </div>
  );
};

export default WizardCard;
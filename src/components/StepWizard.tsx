import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { ReactNode } from "react";

export interface WizardStep {
  id: number;
  name: string;
  shortName?: string;
  description?: string;
  icon?: ReactNode;
}

interface StepWizardProps {
  steps: WizardStep[];
  currentStep: number;
  variant?: "horizontal" | "vertical" | "compact";
  showDescriptions?: boolean;
  className?: string;
}

const StepWizard = ({
  steps,
  currentStep,
  variant = "horizontal",
  showDescriptions = true,
  className,
}: StepWizardProps) => {
  if (variant === "compact") {
    return (
      <div className={cn("w-full", className)}>
        {/* Compact progress bar */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Steg {currentStep} av {steps.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {steps[currentStep - 1]?.name}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${(currentStep / steps.length) * 100}%`,
              background: 'linear-gradient(135deg, hsl(39, 60%, 59%) 0%, hsl(39, 70%, 68%) 100%)'
            }}
          />
        </div>
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={cn("w-full", className)}>
        <div className="space-y-0">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="relative">
                <div className="flex items-start gap-4">
                  {/* Step indicator */}
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                        isCompleted && "bg-gradient-to-br from-accent to-gold-glow border-accent text-primary-foreground",
                        isCurrent && "border-accent bg-accent/10 text-accent",
                        !isCompleted && !isCurrent && "border-border bg-muted text-muted-foreground"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" strokeWidth={3} />
                      ) : (
                        <span className={cn(
                          "font-serif font-semibold",
                          isCurrent && "text-accent"
                        )}>
                          {step.id}
                        </span>
                      )}
                    </div>
                    {/* Connecting line */}
                    {!isLast && (
                      <div 
                        className={cn(
                          "w-0.5 h-16 transition-colors duration-300",
                          isCompleted ? "bg-accent" : "bg-border"
                        )}
                      />
                    )}
                  </div>

                  {/* Step content */}
                  <div className={cn("pb-8", isLast && "pb-0")}>
                    <h3 className={cn(
                      "font-serif text-lg transition-colors duration-300",
                      isCurrent ? "text-foreground" : "text-muted-foreground",
                      isCompleted && "text-foreground"
                    )}>
                      {step.name}
                    </h3>
                    {showDescriptions && step.description && (
                      <p className={cn(
                        "text-sm mt-1 transition-colors duration-300",
                        isCurrent ? "text-muted-foreground" : "text-muted-foreground/60"
                      )}>
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Default: horizontal
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              {/* Step */}
              <div className="flex flex-col items-center">
                {/* Circle indicator */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 shadow-sm",
                    isCompleted && "bg-gradient-to-br from-accent to-gold-glow border-accent/50",
                    isCurrent && "border-accent bg-background shadow-[0_0_20px_rgba(212,166,87,0.3)]",
                    !isCompleted && !isCurrent && "border-border bg-muted"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-primary" strokeWidth={3} />
                  ) : step.icon ? (
                    <span className={cn(
                      "transition-colors duration-300",
                      isCurrent ? "text-accent" : "text-muted-foreground"
                    )}>
                      {step.icon}
                    </span>
                  ) : (
                    <span className={cn(
                      "font-serif text-lg font-semibold transition-colors duration-300",
                      isCurrent ? "text-accent" : "text-muted-foreground"
                    )}>
                      {step.id}
                    </span>
                  )}
                </div>

                {/* Label */}
                <div className="mt-3 text-center">
                  <p className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isCurrent ? "text-foreground" : "text-muted-foreground",
                    isCompleted && "text-foreground"
                  )}>
                    {step.shortName || step.name}
                  </p>
                  {showDescriptions && step.description && isCurrent && (
                    <p className="text-xs text-muted-foreground mt-1 max-w-[120px]">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div className="flex-1 mx-4 h-0.5 relative">
                  {/* Background line */}
                  <div className="absolute inset-0 bg-border rounded-full" />
                  {/* Progress line */}
                  <div 
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out",
                      isCompleted ? "w-full" : "w-0"
                    )}
                    style={{
                      background: 'linear-gradient(90deg, hsl(39, 60%, 59%) 0%, hsl(39, 70%, 68%) 100%)'
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepWizard;
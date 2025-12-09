import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onBack?: () => void;
  onComplete?: () => void;
  nextLabel?: string;
  backLabel?: string;
  completeLabel?: string;
  completeIcon?: ReactNode;
  isNextDisabled?: boolean;
  isLoading?: boolean;
  showBackOnFirstStep?: boolean;
  className?: string;
}

const WizardNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onComplete,
  nextLabel = "Fortsätt",
  backLabel = "Tillbaka",
  completeLabel = "Slutför",
  completeIcon,
  isNextDisabled = false,
  isLoading = false,
  showBackOnFirstStep = false,
  className,
}: WizardNavigationProps) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className={cn(
      "flex items-center justify-between pt-6 mt-6 border-t border-border",
      className
    )}>
      {/* Back button */}
      {(!isFirstStep || showBackOnFirstStep) ? (
        <Button 
          variant="outline" 
          onClick={onBack}
          disabled={isLoading}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          {backLabel}
        </Button>
      ) : (
        <div /> // Spacer
      )}

      {/* Next/Complete button */}
      {isLastStep ? (
        <Button
          variant="festive"
          size="lg"
          onClick={onComplete}
          disabled={isNextDisabled || isLoading}
          className="gap-2 min-w-[180px]"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Vänta...
            </>
          ) : (
            <>
              {completeIcon}
              {completeLabel}
            </>
          )}
        </Button>
      ) : (
        <Button
          variant="hero"
          onClick={onNext}
          disabled={isNextDisabled || isLoading}
          className="gap-2"
        >
          {nextLabel}
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default WizardNavigation;
import { validatePassword, getPasswordStrengthLabel } from "@/lib/passwordValidation";
import { cn } from "@/lib/utils";
import { Check, AlertCircle } from "lucide-react";

interface PasswordStrengthIndicatorProps {
  password: string;
  showDetails?: boolean;
}

export function PasswordStrengthIndicator({ 
  password, 
  showDetails = true 
}: PasswordStrengthIndicatorProps) {
  if (!password) return null;

  const validation = validatePassword(password);
  const { label, color } = getPasswordStrengthLabel(validation.score);

  return (
    <div className="space-y-2 mt-2">
      {/* Strength bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className={cn("h-full transition-all duration-300", color)}
            style={{ width: `${(validation.score / 4) * 100}%` }}
          />
        </div>
        <span className={cn(
          "text-xs font-medium",
          validation.score <= 1 && "text-destructive",
          validation.score === 2 && "text-amber-600",
          validation.score >= 3 && "text-emerald-600"
        )}>
          {label}
        </span>
      </div>

      {/* Errors */}
      {showDetails && validation.errors.length > 0 && (
        <div className="space-y-1">
          {validation.errors.map((error, index) => (
            <div key={index} className="flex items-center gap-1.5 text-xs text-destructive">
              <AlertCircle className="w-3 h-3 flex-shrink-0" />
              <span>{error}</span>
            </div>
          ))}
        </div>
      )}

      {/* Suggestions (only when no errors) */}
      {showDetails && validation.suggestions.length > 0 && validation.errors.length === 0 && (
        <div className="space-y-1">
          {validation.suggestions.slice(0, 2).map((suggestion, index) => (
            <div key={index} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Check className="w-3 h-3 flex-shrink-0 text-emerald-500 opacity-30" />
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  variant?: "booking" | "santa" | "review" | "stat";
}

export const SkeletonCard = ({ className, variant = "booking" }: SkeletonCardProps) => {
  if (variant === "santa") {
    return (
      <div className={cn("bg-card rounded-xl p-4 shadow-soft animate-pulse", className)}>
        <div className="aspect-[4/3] bg-muted rounded-lg mb-3" />
        <div className="h-5 bg-muted rounded w-3/4 mb-2" />
        <div className="h-4 bg-muted rounded w-1/2 mb-3" />
        <div className="flex justify-between items-center">
          <div className="h-4 bg-muted rounded w-1/4" />
          <div className="h-8 bg-muted rounded w-20" />
        </div>
      </div>
    );
  }

  if (variant === "stat") {
    return (
      <div className={cn("bg-card rounded-xl p-4 shadow-soft animate-pulse", className)}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-muted rounded-full" />
          <div className="flex-1">
            <div className="h-3 bg-muted rounded w-1/2 mb-2" />
            <div className="h-6 bg-muted rounded w-1/3" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "review") {
    return (
      <div className={cn("bg-muted/30 rounded-xl p-4 animate-pulse", className)}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-muted rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-muted rounded w-1/3 mb-1" />
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-muted rounded" />
              ))}
            </div>
          </div>
        </div>
        <div className="h-4 bg-muted rounded w-full mb-2" />
        <div className="h-4 bg-muted rounded w-3/4" />
      </div>
    );
  }

  // Default: booking card
  return (
    <div className={cn("bg-card rounded-2xl p-5 shadow-soft animate-pulse", className)}>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-muted rounded-xl flex-shrink-0" />
        <div className="flex-1">
          <div className="h-5 bg-muted rounded w-1/2 mb-2" />
          <div className="flex gap-3">
            <div className="h-4 bg-muted rounded w-16" />
            <div className="h-4 bg-muted rounded w-12" />
            <div className="h-4 bg-muted rounded w-20" />
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="h-5 bg-muted rounded w-16 mb-1" />
          <div className="h-4 bg-muted rounded w-12" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonList = ({ 
  count = 3, 
  variant = "booking" 
}: { 
  count?: number; 
  variant?: "booking" | "santa" | "review" | "stat";
}) => {
  return (
    <div className={cn(
      "space-y-4",
      variant === "santa" && "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 space-y-0",
      variant === "stat" && "grid grid-cols-2 md:grid-cols-4 gap-4 space-y-0"
    )}>
      {[...Array(count)].map((_, i) => (
        <SkeletonCard key={i} variant={variant} />
      ))}
    </div>
  );
};

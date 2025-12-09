import { Sparkles } from "lucide-react";

const PrelaunchBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-2.5 px-4">
      <div className="container mx-auto flex items-center justify-center gap-2 text-center">
        <Sparkles className="w-4 h-4 text-accent flex-shrink-0" />
        <p className="text-xs sm:text-sm font-medium">
          <span className="font-semibold">Tomtebudet lanseras julen 2026.</span>
          <span className="hidden sm:inline"> Vi bygger just nu upp Sveriges tryggaste tomtenätverk.</span>
        </p>
      </div>
    </div>
  );
};

export default PrelaunchBanner;

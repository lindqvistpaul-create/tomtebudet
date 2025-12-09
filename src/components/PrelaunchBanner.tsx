import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const PrelaunchBanner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-3 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent flex-shrink-0" />
          <p className="text-xs sm:text-sm font-medium">
            <span className="font-semibold">Tomtebudet lanseras julen 2026.</span>
            <span className="hidden sm:inline"> Vi bygger just nu upp Sveriges tryggaste tomtenätverk.</span>
          </p>
        </div>
        <Link to="/bli-tomte">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground whitespace-nowrap text-xs h-8"
          >
            Bli tomte inför 2026
          </Button>
        </Link>
        <Link to="/bli-tomte">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground whitespace-nowrap"
          >
            Bli tomte inför 2026
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PrelaunchBanner;

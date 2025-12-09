import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const PrelaunchBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-3 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent" />
          <p className="text-sm sm:text-base font-medium">
            Tomtebudet lanseras till julen 2026. Just nu söker vi tomtar!
          </p>
        </div>
        <Link to="/bli-tomte">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground whitespace-nowrap"
          >
            Bli tomte
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PrelaunchBanner;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const PrelaunchBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-4 px-4">
      <div className="container mx-auto flex flex-col items-center justify-center gap-3 text-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent" />
          <p className="text-sm sm:text-base font-semibold">
            Tomtebudet lanseras julen 2026
          </p>
        </div>
        <p className="text-xs sm:text-sm text-primary-foreground/80 max-w-lg">
          Vi bygger just nu upp Sveriges tryggaste tomtenätverk. 
          Bli jultomte redan nu – skapa din profil idag.
        </p>
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

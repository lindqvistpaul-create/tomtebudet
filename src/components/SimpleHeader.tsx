import { Gift } from "lucide-react";
import { Link } from "react-router-dom";

const SimpleHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-pine-dark/95 backdrop-blur-md border-b border-snow/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Gift className="w-7 h-7 text-accent" />
            <span className="font-serif text-xl md:text-2xl text-snow">
              Tomte<span className="text-gradient-gold">budet</span>
            </span>
          </Link>

          {/* Right side links */}
          <div className="flex items-center gap-4">
            <Link 
              to="/mina-bokningar" 
              className="text-snow/80 hover:text-accent transition-colors text-sm font-medium"
            >
              Mina bokningar
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;

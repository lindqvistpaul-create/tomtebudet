import { Gift, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-pine-dark py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <Gift className="w-8 h-8 text-accent" />
            <span className="font-serif text-2xl text-snow">Tomtebudet</span>
          </div>

          {/* Tagline */}
          <p className="text-snow/60 max-w-md mb-8">
            Sprider julmagin från Nordpolen till hela världen, 
            en hälsning i taget.
          </p>

          {/* Links */}
          <div className="flex gap-8 mb-10 text-snow/70">
            <a href="#" className="hover:text-accent transition-colors">Om oss</a>
            <a href="#" className="hover:text-accent transition-colors">Vanliga frågor</a>
            <a href="#" className="hover:text-accent transition-colors">Kontakt</a>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-snow/20 mb-8" />

          {/* Copyright */}
          <p className="text-snow/40 text-sm flex items-center gap-2">
            Skapat med <Heart className="w-4 h-4 text-secondary" /> av tomtens älvor © 2024
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

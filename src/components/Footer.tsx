import { Gift, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-pine-dark py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo & description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-7 h-7 text-accent" />
              <span className="font-serif text-xl text-snow">Tomtebudet</span>
            </div>
            <p className="text-snow/60 text-sm leading-relaxed">
              Sveriges tryggaste marknadsplats för att boka verifierade jultomtar till julafton.
            </p>
          </div>

          {/* For families */}
          <div>
            <h4 className="text-snow font-medium mb-4">För familjer</h4>
            <ul className="space-y-2 text-snow/60 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">Hitta tomte</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Hur det fungerar</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Priser</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Vanliga frågor</a></li>
            </ul>
          </div>

          {/* For santas */}
          <div>
            <h4 className="text-snow font-medium mb-4">För tomtar</h4>
            <ul className="space-y-2 text-snow/60 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">Bli tomte</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Så funkar det</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Ersättning</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Tips & råd</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-snow font-medium mb-4">Om oss</h4>
            <ul className="space-y-2 text-snow/60 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">Om Tomtebudet</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Kontakt</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Integritetspolicy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Villkor</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-snow/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-snow/40 text-sm flex items-center gap-2">
              Skapat med <Heart className="w-4 h-4 text-secondary" /> i Sverige © 2024
            </p>
            <div className="flex items-center gap-2 text-snow/40 text-sm">
              <span>Säker betalning via</span>
              <span className="text-snow/60 font-medium">Stripe</span>
              <span className="mx-2">•</span>
              <span>Verifiering via</span>
              <span className="text-snow/60 font-medium">BankID</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

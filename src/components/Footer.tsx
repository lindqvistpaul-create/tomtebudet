import { useState } from "react";
import { Heart, ChevronDown, Shield, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: "families",
      title: "För familjer",
      links: [
        { label: "Anmäl intresse", to: "/intresse-familj" },
        { label: "Hitta en tomte", to: "/sok" },
        { label: "Så fungerar det", to: "/sa-funkar-det" },
        { label: "Trygghet och kvalitet", href: "#why-tomtebudet" },
        { label: "Vanliga frågor", to: "/sa-funkar-det#faq" },
      ],
    },
    {
      id: "santas",
      title: "För tomtar",
      links: [
        { label: "Bli tomte", to: "/bli-tomte" },
        { label: "Hur det fungerar", to: "/sa-funkar-det" },
        { label: "Ersättning och villkor", to: "/sa-funkar-det#faq" },
        { label: "Vanliga frågor", to: "/sa-funkar-det" },
      ],
    },
    {
      id: "company",
      title: "Om Tomtebudet",
      links: [
        { label: "Så fungerar det", to: "/sa-funkar-det" },
        { label: "Kontakta oss", to: "/kontakt" },
        { label: "Integritet & säkerhet", to: "/integritet-sakerhet" },
        { label: "Köpvillkor", to: "/kopvillkor" },
      ],
    },
  ];

  return (
    <footer className="bg-pine-dark py-10 md:py-16">
      <div className="container mx-auto px-4">
        {/* Mobile: Accordion layout */}
        <div className="md:hidden">
          {/* Logo & description */}
          <div className="mb-6 text-center">
            <Link to="/" className="inline-block mb-3">
              <Logo variant="horizontal" size="sm" textColor="light" iconColor="gold" />
            </Link>
            <p className="text-snow/60 text-sm leading-relaxed max-w-xs mx-auto">
              Trygga och magiska julupplevelser mellan familjer och verifierade tomtar.
            </p>
          </div>

          {/* Accordion sections */}
          <div className="border-t border-snow/10">
            {sections.map((section) => (
              <div key={section.id} className="border-b border-snow/10">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center justify-between w-full py-4 px-2 text-left touch-manipulation min-h-[56px]"
                >
                  <span className="text-snow font-medium">{section.title}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-snow/60 transition-transform duration-200 ${
                      openSection === section.id ? "rotate-180" : ""
                    }`} 
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-200 ${
                    openSection === section.id ? "max-h-64 pb-4" : "max-h-0"
                  }`}
                >
                  <ul className="space-y-1 px-2">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        {'to' in link ? (
                          <Link
                            to={link.to}
                            className="block py-3 px-3 text-snow/60 hover:text-accent active:text-accent transition-colors rounded-lg hover:bg-snow/5 active:bg-snow/10 touch-manipulation min-h-[48px] flex items-center"
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            className="block py-3 px-3 text-snow/60 hover:text-accent active:text-accent transition-colors rounded-lg hover:bg-snow/5 active:bg-snow/10 touch-manipulation min-h-[48px] flex items-center"
                          >
                            {link.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges - compact */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 mb-6">
            <div className="flex items-center gap-2 text-snow/60 text-xs bg-snow/5 px-3 py-2 rounded-lg">
              <CreditCard className="w-4 h-4" />
              <span>Stripe</span>
            </div>
            <div className="flex items-center gap-2 text-snow/60 text-xs bg-snow/5 px-3 py-2 rounded-lg">
              <Shield className="w-4 h-4" />
              <span>BankID</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-snow/40 text-xs text-center flex items-center justify-center gap-1.5">
            Skapat med <Heart className="w-3 h-3 text-tomte-red" /> i Sverige © 2024
          </p>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:block">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Logo & description */}
            <div className="md:col-span-1">
              <Link to="/" className="inline-block mb-4">
                <Logo variant="horizontal" size="md" textColor="light" iconColor="gold" />
              </Link>
              <p className="text-snow/60 text-sm leading-relaxed">
                Vi förmedlar trygga och magiska julupplevelser mellan familjer och 
                verifierade jultomtar i hela Sverige.
              </p>
            </div>

            {/* Link sections */}
            {sections.map((section) => (
              <div key={section.id}>
                <h4 className="text-snow font-medium mb-4">{section.title}</h4>
                <ul className="space-y-2 text-snow/60 text-sm">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {'to' in link ? (
                        <Link to={link.to} className="hover:text-accent transition-colors">
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.href} className="hover:text-accent transition-colors">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-snow/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-snow/40 text-sm flex items-center gap-2">
                Skapat med <Heart className="w-4 h-4 text-tomte-red" /> i Sverige © 2024
              </p>
              <div className="flex items-center gap-2 text-snow/40 text-sm">
                <span>Säker betalning via</span>
                <span className="text-snow/60 font-medium">Stripe</span>
                <span className="mx-2">•</span>
                <span>Identitet via</span>
                <span className="text-snow/60 font-medium">BankID</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { HelpCircle, Users, Gift } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const familyFAQs: FAQItem[] = [
  {
    question: "Hur bokar man en tomte?",
    answer: "Sök bland våra verifierade tomtar, välj den som passar er bäst. Fyll i datum, tid och information. Betalningen reserveras och släpps först efter besöket."
  },
  {
    question: "Är alla tomtar verifierade?",
    answer: "Ja, alla tomtar genomgår BankID-verifiering, ID-kontroll och manuell granskning av vårt team. Er familjs trygghet är vår högsta prioritet."
  },
  {
    question: "Hur fungerar betalningen?",
    answer: "Betalningen reserveras tryggt via Stripe när du bokar, men överförs inte till tomten förrän efter besöket. Om något går fel får du tillbaka hela beloppet."
  },
  {
    question: "Vad kostar ett tomtebesök?",
    answer: "Priset varierar, de flesta tomtar tar 500–800 kr per 15 min. Ett typiskt 30 min-besök kostar 1000–1600 kr. Du ser alltid exakt pris innan du bokar."
  },
  {
    question: "Vad händer om tomten inte dyker upp?",
    answer: "I det osannolika fallet får du omedelbart tillbaka hela beloppet. Vi hjälper dig gärna att hitta en annan tillgänglig tomte."
  }
];

const santaFAQs: FAQItem[] = [
  {
    question: "Hur blir jag tomte hos Tomtebudet?",
    answer: "Registrera dig, verifiera med BankID, ladda upp ID och foton, sätt priser och tillgänglighet. Efter granskning är du redo att ta emot bokningar!"
  },
  {
    question: "Måste jag verifiera mig med BankID?",
    answer: "Ja, detta krävs för familjernas trygghet. BankID-verifiering bekräftar din identitet och skapar förtroende."
  },
  {
    question: "Hur får jag betalt?",
    answer: "Efter varje genomfört besök överförs betalningen automatiskt till ditt bankkonto, normalt inom 2–3 bankdagar."
  },
  {
    question: "Kan jag bestämma mina egna priser?",
    answer: "Absolut! Du sätter själv pris per 15 min och väljer vilka dagar/tider du är tillgänglig. Full kontroll via din dashboard."
  }
];

interface FAQSectionProps {
  showFullContent?: boolean;
}

const FAQ = ({ showFullContent = false }: FAQSectionProps) => {
  return (
    <section id="faq" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header - compact on mobile */}
        <div className="text-center mb-6 md:mb-12">
          <span className="inline-flex items-center gap-2 text-accent text-xs md:text-sm font-medium mb-2 md:mb-4">
            <HelpCircle className="w-4 h-4" />
            Vanliga frågor
          </span>
          <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-2 md:mb-4">
            Så funkar <span className="text-gradient-gold">Tomtebudet</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base hidden sm:block">
            {showFullContent 
              ? "Här hittar du svar på de vanligaste frågorna."
              : "Har du frågor? Här hittar du svar på det vanligaste."
            }
          </p>
        </div>

        {/* Two columns - stacked on mobile */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
          {/* For Families */}
          <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-8 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <h3 className="font-serif text-lg md:text-xl text-foreground">För familjer</h3>
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {familyFAQs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`family-${index}`}
                  className="border border-border/50 rounded-lg md:rounded-xl px-3 md:px-4 data-[state=open]:bg-muted/30"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-accent hover:no-underline py-3 md:py-4">
                    <span className="flex items-center gap-2 md:gap-3">
                      <HelpCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent flex-shrink-0" />
                      <span className="text-xs md:text-base">{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-3 md:pb-4 pl-5 md:pl-7 text-xs md:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* For Santas */}
          <div className="bg-card rounded-xl md:rounded-2xl p-4 md:p-8 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Gift className="w-4 h-4 md:w-5 md:h-5 text-accent" />
              </div>
              <h3 className="font-serif text-lg md:text-xl text-foreground">För tomtar</h3>
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {santaFAQs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`santa-${index}`}
                  className="border border-border/50 rounded-lg md:rounded-xl px-3 md:px-4 data-[state=open]:bg-muted/30"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-accent hover:no-underline py-3 md:py-4">
                    <span className="flex items-center gap-2 md:gap-3">
                      <HelpCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent flex-shrink-0" />
                      <span className="text-xs md:text-base">{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-3 md:pb-4 pl-5 md:pl-7 text-xs md:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

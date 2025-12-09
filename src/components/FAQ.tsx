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
    answer: "Det är enkelt! Sök bland våra verifierade tomtar, välj den som passar er bäst baserat på område och tillgänglighet. Fyll i datum, tid och information om ert besök. Betalningen reserveras och släpps först efter att besöket genomförts."
  },
  {
    question: "Är alla tomtar verifierade?",
    answer: "Ja, alla tomtar på Tomtebudet genomgår en noggrann verifieringsprocess. De måste verifiera sin identitet via BankID, ladda upp ID-handling och genomgå en manuell granskning av vårt team innan de godkänns. Er familjs trygghet är vår högsta prioritet."
  },
  {
    question: "Hur fungerar betalningen?",
    answer: "Betalningen reserveras tryggt via Stripe när du bokar, men pengarna överförs inte till tomten förrän efter att besöket är genomfört. Om något skulle gå fel får du tillbaka hela beloppet. Detta ger dig full trygghet."
  },
  {
    question: "Vad kostar ett tomtebesök?",
    answer: "Priset varierar beroende på tomte och besökets längd. De flesta tomtar tar mellan 500–800 kr per 15 minuter. Ett typiskt besök på 30 minuter kostar ofta runt 1000–1600 kr. Du ser alltid det exakta priset innan du bokar."
  },
  {
    question: "Vad händer om tomten blir sjuk eller inte dyker upp?",
    answer: "I det osannolika fallet att en tomte inte kan genomföra besöket får du omedelbart tillbaka hela beloppet. Vi kontaktar dig så snart vi får information och hjälper gärna till att hitta en annan tillgänglig tomte om möjligt."
  }
];

const santaFAQs: FAQItem[] = [
  {
    question: "Hur blir jag tomte hos Tomtebudet?",
    answer: "Registrera dig genom vår onboarding-process. Du skapar ett konto, verifierar din identitet med BankID, laddar upp ID-handling och foton (både porträtt och i tomtedräkt), sätter dina priser och tillgänglighet. Efter en snabb granskning av vårt team är du redo att ta emot bokningar!"
  },
  {
    question: "Måste jag verifiera mig med BankID och ID-handling?",
    answer: "Ja, detta är ett krav för att säkerställa trygghet för familjerna som bokar. BankID-verifiering bekräftar din identitet och ID-handlingen granskas manuellt av oss. Detta skapar förtroende och gör att familjer känner sig trygga med att släppa in dig i sitt hem."
  },
  {
    question: "Hur får jag betalt?",
    answer: "Efter varje genomfört besök överförs betalningen automatiskt till ditt angivna bankkonto. Pengarna är normalt hos dig inom 2–3 bankdagar. Du kan följa alla dina intäkter och utbetalningar i din tomte-dashboard."
  },
  {
    question: "Kan jag bestämma mina egna priser och tider?",
    answer: "Absolut! Du sätter själv ditt pris per 15 minuter och väljer vilka dagar och tider du är tillgänglig. Du har full kontroll över din kalender och kan uppdatera tillgängligheten när som helst via din dashboard."
  }
];

interface FAQSectionProps {
  showFullContent?: boolean;
}

const FAQ = ({ showFullContent = false }: FAQSectionProps) => {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-accent text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Vanliga frågor
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            Så funkar <span className="text-gradient-gold">Tomtebudet</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {showFullContent 
              ? "Här hittar du svar på de vanligaste frågorna om hur Tomtebudet fungerar – både för familjer som vill boka en tomte och för dig som vill bli tomte."
              : "Har du frågor? Här hittar du svar på det vanligaste."
            }
          </p>
        </div>

        {/* Two columns for families and santas */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* For Families */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-foreground">För familjer</h3>
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {familyFAQs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`family-${index}`}
                  className="border border-border/50 rounded-xl px-4 data-[state=open]:bg-muted/30"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-accent hover:no-underline py-4">
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm md:text-base">{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 pl-7">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* For Santas */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-serif text-xl text-foreground">För tomtar</h3>
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {santaFAQs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`santa-${index}`}
                  className="border border-border/50 rounded-xl px-4 data-[state=open]:bg-muted/30"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-accent hover:no-underline py-4">
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm md:text-base">{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 pl-7">
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

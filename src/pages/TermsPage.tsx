import { Link } from "react-router-dom";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import { Shield, CreditCard, Users, FileText, Clock, AlertTriangle } from "lucide-react";

const TermsPage = () => {
  const sections = [
    {
      id: "allmant",
      icon: FileText,
      title: "1. Allmänt",
      content: (
        <div className="space-y-4">
          <p>
            Tomtebudet är en digital marknadsplats som förmedlar kontakt mellan familjer som önskar 
            ett tomtebesök och verifierade jultomtar som erbjuder sina tjänster.
          </p>
          <p>
            Tomtebudet utför inte själv tomteuppdrag utan tillhandahåller plattformen för 
            matchning, verifiering av tomtar samt säker betalningshantering. Avtal om 
            tomtebesök ingås direkt mellan kund och tomte.
          </p>
          <p>
            Genom att använda Tomtebudet godkänner du dessa villkor i sin helhet.
          </p>
        </div>
      )
    },
    {
      id: "bokning-betalning",
      icon: CreditCard,
      title: "2. Bokningar & betalning",
      content: (
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Så fungerar bokningen</h4>
          <p>
            Du väljer en verifierad tomte baserat på tillgänglighet, pris och omdömen. 
            Därefter anger du önskad tid, längd på besöket och adress. Priset baseras på 
            tomtens timpris per 15 minuter multiplicerat med bokningens längd.
          </p>
          
          <h4 className="font-medium text-foreground mt-6">Betalning</h4>
          <p>
            Vid bokning reserveras beloppet på ditt betalkort eller vald betalmetod. 
            Pengarna dras inte förrän tomtebesöket har genomförts och bekräftats.
          </p>
          <p>
            Betalningen hanteras av vår betalningspartner och Tomtebudet har aldrig 
            tillgång till dina fullständiga kortuppgifter.
          </p>
          
          <h4 className="font-medium text-foreground mt-6">Kvitto & bekräftelse</h4>
          <p>
            Efter genomfört besök skickas ett kvitto till din registrerade e-postadress. 
            Du kan även se alla dina bokningar under "Mina bokningar" i ditt konto.
          </p>
        </div>
      )
    },
    {
      id: "avbokning",
      icon: Clock,
      title: "3. Avbokningspolicy",
      content: (
        <div className="space-y-4">
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
            <h4 className="font-medium text-foreground mb-2">Sammanfattning</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong>Kostnadsfri avbokning</strong> fram till 48 timmar innan bokad tid</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span><strong>40% av totalbeloppet</strong> debiteras vid avbokning senare än 48 timmar innan</span>
              </li>
            </ul>
          </div>

          <h4 className="font-medium text-foreground mt-6">Kostnadsfri avbokning</h4>
          <p>
            Du kan avboka din bokning kostnadsfritt fram till 48 timmar innan den bokade 
            besökstiden. Vid kostnadsfri avbokning återbetalas hela beloppet.
          </p>

          <h4 className="font-medium text-foreground mt-6">Sen avbokning</h4>
          <p>
            Vid avbokning senare än 48 timmar innan bokad tid debiteras 40% av 
            bokningsbeloppet som kompensation för tomtens planering och förlorad tidslucka.
          </p>
          <p className="text-muted-foreground text-sm">
            Detta beror på att tomten har reserverat tiden för ditt besök och kan ha 
            tackat nej till andra uppdrag. Avgiften täcker delvis tomtens förlorade 
            intäkt och administrativa kostnader.
          </p>

          <h4 className="font-medium text-foreground mt-6">Hur du avbokar</h4>
          <p>
            Avbokning görs enklast via <Link to="/mina-bokningar" className="text-accent hover:underline">"Mina bokningar"</Link> i 
            ditt konto, eller genom att kontakta oss via vårt <Link to="/kontakt" className="text-accent hover:underline">kontaktformulär</Link>.
          </p>
        </div>
      )
    },
    {
      id: "no-show",
      icon: AlertTriangle,
      title: "4. No-show & förseningar",
      content: (
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Om tomten inte dyker upp</h4>
          <p>
            I det osannolika fallet att en tomte inte dyker upp utan förvarning får du 
            full återbetalning av hela bokningsbeloppet. Vi kontaktar dig omedelbart och 
            försöker i mån av möjlighet hitta en ersättningstomte.
          </p>

          <h4 className="font-medium text-foreground mt-6">Om tomten är försenad</h4>
          <p>
            Om tomten blir försenad med mer än 15 minuter utan att meddela dig i förväg 
            har du rätt till proportionell prisreduktion eller full återbetalning om 
            förseningen påverkar besöket väsentligt.
          </p>

          <h4 className="font-medium text-foreground mt-6">Om familjen inte är hemma</h4>
          <p>
            Om tomten anländer vid bokad tid och ingen öppnar eller familjen inte är 
            tillgänglig, räknas detta som ett genomfört uppdrag och full betalning 
            debiteras. Tomten väntar i upp till 15 minuter innan uppdraget avslutas.
          </p>
          <p className="text-muted-foreground text-sm">
            Vi rekommenderar att säkerställa att någon vuxen är hemma vid bokad tid 
            och att portkod eller andra instruktioner är korrekt angivna.
          </p>
        </div>
      )
    },
    {
      id: "ansvar",
      icon: Users,
      title: "5. Användarkonton & ansvar",
      content: (
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Kundens ansvar</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Att uppgifter om adress, kontaktinformation och barn är korrekta</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Att vara tillgänglig på angiven adress vid bokad tid</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Att meddela eventuella ändringar i god tid</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Att behandla tomten med respekt</span>
            </li>
          </ul>

          <h4 className="font-medium text-foreground mt-6">Tomtens ansvar</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Att infinna sig på angiven adress i rätt tid</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Att uppträda professionellt och vänligt</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Att följa Tomtebudets riktlinjer för besök</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Att meddela vid eventuella förseningar</span>
            </li>
          </ul>

          <h4 className="font-medium text-foreground mt-6">Tomtebudets ansvar</h4>
          <p>
            Tomtebudet ansvarar för att verifiera tomtarnas identitet via BankID, 
            granska profiler manuellt och tillhandahålla säker betalningshantering. 
            Tomtebudet är dock inte part i avtalet mellan kund och tomte.
          </p>
        </div>
      )
    },
    {
      id: "personuppgifter",
      icon: Shield,
      title: "6. Personuppgifter",
      content: (
        <div className="space-y-4">
          <p>
            Vi värnar om din integritet och hanterar dina personuppgifter i enlighet 
            med GDPR och svensk dataskyddslagstiftning.
          </p>
          <p>
            För fullständig information om hur vi samlar in, behandlar och skyddar 
            dina personuppgifter, se vår sida för{" "}
            <Link to="/integritet-sakerhet" className="text-accent hover:underline font-medium">
              Integritet, säkerhet & användarvillkor
            </Link>.
          </p>
        </div>
      )
    },
    {
      id: "andringar",
      icon: FileText,
      title: "7. Ändringar i villkor",
      content: (
        <div className="space-y-4">
          <p>
            Tomtebudet förbehåller sig rätten att uppdatera dessa villkor. Vid väsentliga 
            ändringar meddelar vi registrerade användare via e-post.
          </p>
          <p>
            Den senaste versionen av villkoren finns alltid tillgänglig på denna sida. 
            Genom fortsatt användning av tjänsten efter att ändringar publicerats 
            godkänner du de uppdaterade villkoren.
          </p>
          <p className="text-muted-foreground text-sm">
            Senast uppdaterad: December 2024
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SimpleHeader />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
              <FileText className="w-8 h-8 text-accent" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Köpvillkor & avbokningspolicy
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tydliga villkor för en trygg julupplevelse. Läs igenom innan du bokar 
              så att du vet vad som gäller.
            </p>
          </div>

          {/* Quick Summary Card */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-6 md:p-8 mb-12">
            <h2 className="font-serif text-xl md:text-2xl mb-4">Snabbsammanfattning</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Gratis avbokning</p>
                  <p className="text-sm text-primary-foreground/70">Fram till 48h innan besöket</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Sen avbokning</p>
                  <p className="text-sm text-primary-foreground/70">40% av beloppet debiteras</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Säker betalning</p>
                  <p className="text-sm text-primary-foreground/70">Pengarna dras efter besöket</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Tomte no-show</p>
                  <p className="text-sm text-primary-foreground/70">Full återbetalning</p>
                </div>
              </div>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-card rounded-2xl p-6 mb-12 shadow-soft">
            <h2 className="font-serif text-lg text-foreground mb-4">Innehåll</h2>
            <nav className="grid sm:grid-cols-2 gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors py-1"
                >
                  <section.icon className="w-4 h-4" />
                  <span className="text-sm">{section.title}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="bg-card rounded-2xl p-6 md:p-8 shadow-soft scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="font-serif text-xl md:text-2xl text-foreground">
                    {section.title}
                  </h2>
                </div>
                <div className="text-muted-foreground leading-relaxed">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Har du frågor om våra villkor?
            </p>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
            >
              Kontakta oss
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;

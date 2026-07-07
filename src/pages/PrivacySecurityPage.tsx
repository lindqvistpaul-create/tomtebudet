import { useState } from "react";
import { Shield, Lock, CreditCard, Cookie, Mail, CheckCircle2, FileCheck, Users, Eye, Database, AlertCircle } from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import Starfall from "@/components/Starfall";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PrivacySecurityPage = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      toast({
        title: "Fyll i alla fält",
        description: "Vänligen fyll i alla obligatoriska fält.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from('contact_messages').insert({
      name: contactForm.name.trim(),
      email: contactForm.email.trim(),
      subject: "Integritet & säkerhet",
      message: contactForm.message.trim(),
    });

    if (error) {
      toast({
        title: "Något gick fel",
        description: "Ditt meddelande kunde inte skickas. Försök igen senare.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    toast({
      title: "Meddelande skickat",
      description: "Tack för ditt meddelande. Vi återkommer så snart vi kan."
    });

    setContactForm({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Starfall />
      <SimpleHeader />
      
      <main className="pt-24 pb-16 relative z-10">
        {/* Hero Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Din trygghet är vår prioritet</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Integritet, säkerhet & <span className="text-gradient-gold">användarvillkor</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              På Tomtebudet tar vi din säkerhet och integritet på största allvar. 
              Här förklarar vi hur vi skyddar dig, dina uppgifter och dina transaktioner.
            </p>
          </div>
        </section>

        {/* Section 1: Trygghetsgaranti */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-soft border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground">Vår trygghetsgaranti</h2>
                </div>
                
                <p className="text-muted-foreground mb-8">
                  Tomtebudet är byggt med trygghet som grundpelare. Vi förstår att det handlar om att släppa in 
                  någon i ert hem – och därför har vi skapat Sveriges säkraste plattform för tomtebokningar.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: FileCheck, title: "BankID-verifiering", desc: "Alla tomtar verifierar sin identitet via BankID innan de kan ta emot bokningar." },
                    { icon: Eye, title: "ID-handling granskas", desc: "Varje tomte laddar upp giltig legitimation som granskas manuellt av vårt team." },
                    { icon: Users, title: "Manuell profilgranskning", desc: "Vårt team godkänner varje tomte individuellt – ingen automatisk genomsläpp." },
                    { icon: CreditCard, title: "Escrow-betalning", desc: "Betalningen reserveras vid bokning men överförs först efter genomfört besök." },
                    { icon: Shield, title: "Dubbelskydd", desc: "Både kunder och tomtar skyddas av verifiering, profiler och omdömessystem." }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/30">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: GDPR */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-soft border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground">Så hanterar vi din data (GDPR)</h2>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Vi följer EU:s dataskyddsförordning (GDPR) och behandlar dina personuppgifter med största respekt och omsorg.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Vi sparar endast data som behövs för att genomföra bokningar",
                    "Vi delar aldrig dina uppgifter med tredje part utan ditt samtycke",
                    "All data krypteras i transport via HTTPS",
                    "Vi lagrar endast nödvändig information för tomtebesöket",
                    "All din data kan raderas på begäran"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-muted/50 rounded-2xl p-6">
                  <h3 className="font-serif text-lg text-foreground mb-4">Data vi behandlar</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { label: "Namn", desc: "För att identifiera dig som kund eller tomte" },
                      { label: "Kontaktinformation", desc: "E-post och telefon för kommunikation" },
                      { label: "Besöksadress", desc: "För att tomten ska kunna hitta rätt" },
                      { label: "Barnens namn", desc: "Frivilligt – för personligt bemötande" },
                      { label: "Betalningsinformation", desc: "Hanteras säkert av vår betalpartner" }
                    ].map((item, index) => (
                      <div key={index} className="p-3 rounded-lg bg-card border border-border/30">
                        <p className="font-medium text-foreground text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: BankID */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-soft border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <FileCheck className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground">BankID & identitetsverifiering</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-serif text-xl text-foreground mb-4">För tomtar</h3>
                    <p className="text-muted-foreground mb-4">
                      Alla som vill bli tomte på Tomtebudet måste genomgå en fullständig verifieringsprocess:
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Logga in med BankID för att bekräfta identitet",
                        "Ladda upp giltig legitimation (körkort, pass eller ID-kort)",
                        "Genomgå manuell granskning av vårt trygghets-team",
                        "Ladda upp foto – både porträtt och i tomtedräkt"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl text-foreground mb-4">För kunder</h3>
                    <p className="text-muted-foreground mb-4">
                      Som kund har du flexibla inloggningsalternativ:
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Skapa konto med e-post och lösenord",
                        "Valfritt: Logga in med BankID för extra säkerhet",
                        "Din information skyddas oavsett inloggningsmetod"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Betalningssäkerhet */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-soft border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground">Betalningssäkerhet</h2>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Vi har byggt ett betalningssystem som skyddar både dig som kund och tomten som utför uppdraget.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                    <Lock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Pengarna dras inte förrän besöket är klart</h4>
                      <p className="text-sm text-muted-foreground">
                        När du bokar reserveras beloppet på ditt kort, men pengarna överförs inte till tomten 
                        förrän efter att besöket har genomförts. Detta ger dig full trygghet.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border/30">
                    <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Säker betalningspartner</h4>
                      <p className="text-sm text-muted-foreground">
                        Alla betalningar hanteras av en tredjepartsleverantör med banknivå-kryptering. 
                        Vi ser eller lagrar aldrig dina kortuppgifter.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border border-border/30">
                    <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Återbetalning vid no-show</h4>
                      <p className="text-sm text-muted-foreground">
                        Om tomten inte dyker upp får du omedelbart hela beloppet återbetalt. 
                        Vi kontaktar dig direkt om vi får information om problem.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Cookies */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-soft border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground">Cookies & tekniska loggar</h2>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Vi respekterar din integritet och använder endast de cookies som är nödvändiga för att 
                  webbplatsen ska fungera korrekt.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                    <h4 className="font-medium text-foreground mb-2">Nödvändiga cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Används för inloggning, sessionshantering och grundläggande funktioner. 
                      Dessa kan inte stängas av.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                    <h4 className="font-medium text-foreground mb-2">Inga spårningscookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Vi använder inga tredjepartscookies för reklam eller spårning. 
                      Din aktivitet säljs aldrig till annonsörer.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Tekniska loggar:</strong> Vi sparar endast loggar som 
                    behövs för felsökning och säkerhet. Dessa anonymiseras automatiskt efter 30 dagar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Kontakt */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-soft border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground">Kontakta oss om integritet</h2>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Har du frågor om hur vi hanterar dina personuppgifter, vill begära radering av din data, 
                  eller har andra integritetsrelaterade funderingar? Kontakta oss så hjälper vi dig.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Ditt namn
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Anna Andersson"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="bg-muted/50"
                      maxLength={100}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      E-postadress
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="anna@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="bg-muted/50"
                      maxLength={255}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Ditt meddelande
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Beskriv din fråga eller begäran..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="bg-muted/50 min-h-[120px]"
                      maxLength={1000}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Skickar..." : "Skicka meddelande"}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-border/50 text-center">
                  <p className="text-sm text-muted-foreground">
                    Du kan också nå oss direkt på{" "}
                    <a href="mailto:integritet@tomtebudet.se" className="text-accent hover:underline">
                      integritet@tomtebudet.se
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacySecurityPage;

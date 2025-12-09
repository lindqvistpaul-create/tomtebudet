import { useState } from "react";
import { Button } from "@/components/ui/button";
import StepWizard from "@/components/StepWizard";
import WizardCard, { WizardSection, WizardInfoBox, WizardSummaryRow } from "@/components/WizardCard";
import WizardNavigation from "@/components/WizardNavigation";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import { Clock, Users, MapPin, Check, CreditCard, Shield, Sparkles } from "lucide-react";
import { bookingFlow } from "@/lib/microcopy";

const WizardDemo = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [variant, setVariant] = useState<"horizontal" | "vertical" | "compact">("horizontal");

  const steps = bookingFlow.steps.map(step => ({
    id: step.id,
    name: step.name,
    shortName: step.shortName,
    description: step.description,
  }));

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    alert("Wizard slutförd!");
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl text-foreground mb-4">
              Wizard <span className="text-gradient-gold">Komponenter</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Eleganta steg-för-steg komponenter med guld-progressindikator för boknings- och onboarding-flöden.
            </p>
          </div>

          {/* Variant selector */}
          <div className="flex justify-center gap-2 mb-8">
            <Button 
              variant={variant === "horizontal" ? "default" : "outline"}
              onClick={() => setVariant("horizontal")}
              size="sm"
            >
              Horisontell
            </Button>
            <Button 
              variant={variant === "vertical" ? "default" : "outline"}
              onClick={() => setVariant("vertical")}
              size="sm"
            >
              Vertikal
            </Button>
            <Button 
              variant={variant === "compact" ? "default" : "outline"}
              onClick={() => setVariant("compact")}
              size="sm"
            >
              Kompakt
            </Button>
          </div>

          {/* Step Wizard */}
          <div className="mb-8">
            <StepWizard 
              steps={steps} 
              currentStep={currentStep} 
              variant={variant}
              showDescriptions={variant !== "compact"}
            />
          </div>

          {/* Wizard Card Content */}
          <WizardCard
            title={bookingFlow.titles[Object.keys(bookingFlow.titles)[currentStep - 1] as keyof typeof bookingFlow.titles]}
            subtitle={bookingFlow.subtitles[Object.keys(bookingFlow.subtitles)[currentStep - 1] as keyof typeof bookingFlow.subtitles]}
            icon={currentStep === 1 ? <Clock className="w-6 h-6" /> : 
                  currentStep === 3 ? <Users className="w-6 h-6" /> : 
                  currentStep === 4 ? <MapPin className="w-6 h-6" /> :
                  currentStep === 5 ? <Check className="w-6 h-6" /> :
                  currentStep === 6 ? <CreditCard className="w-6 h-6" /> :
                  currentStep === 7 ? <Sparkles className="w-6 h-6" /> : undefined}
            variant={currentStep === 7 ? "success" : currentStep === 5 ? "highlighted" : "default"}
          >
            {/* Demo content for each step */}
            {currentStep === 1 && (
              <WizardSection title="Tillgängliga tider" description="Välj när tomten ska besöka er">
                <div className="grid grid-cols-4 gap-2">
                  {["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"].map((time) => (
                    <button
                      key={time}
                      className="py-3 px-4 rounded-lg border-2 border-border text-center hover:border-accent transition-colors"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </WizardSection>
            )}

            {currentStep === 2 && (
              <WizardSection title="Varaktighet" description="Hur länge ska tomten stanna?">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { min: 15, label: "15 min", desc: "Kort besök" },
                    { min: 30, label: "30 min", desc: "Standard" },
                    { min: 45, label: "45 min", desc: "Utökat" },
                  ].map((d) => (
                    <button
                      key={d.min}
                      className="p-4 rounded-xl border-2 border-border text-center hover:border-accent transition-colors"
                    >
                      <div className="font-serif text-xl text-foreground">{d.label}</div>
                      <div className="text-sm text-muted-foreground">{d.desc}</div>
                    </button>
                  ))}
                </div>
              </WizardSection>
            )}

            {currentStep === 3 && (
              <WizardSection title="Barn" description="Berätta om era barn">
                <div className="p-4 bg-muted/30 rounded-xl space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Barnets namn..." className="px-4 py-3 rounded-lg border border-border bg-background" />
                    <input placeholder="Ålder..." className="px-4 py-3 rounded-lg border border-border bg-background" />
                  </div>
                  <input placeholder="Presenter som tomten tar med..." className="w-full px-4 py-3 rounded-lg border border-border bg-background" />
                </div>
              </WizardSection>
            )}

            {currentStep === 4 && (
              <WizardSection title="Adress" description="Vart ska tomten komma?">
                <div className="space-y-3">
                  <input placeholder="Gatuadress..." className="w-full px-4 py-3 rounded-lg border border-border bg-background" />
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Postnummer..." className="px-4 py-3 rounded-lg border border-border bg-background" />
                    <input placeholder="Stad..." className="px-4 py-3 rounded-lg border border-border bg-background" />
                  </div>
                  <textarea placeholder="Instruktioner till tomten..." className="w-full px-4 py-3 rounded-lg border border-border bg-background resize-none" rows={3} />
                </div>
              </WizardSection>
            )}

            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="bg-muted/30 rounded-xl p-4 space-y-2">
                  <WizardSummaryRow label="Tomte" value="Tomte Erik" />
                  <WizardSummaryRow label="Datum & tid" value="24 dec kl 15:00" />
                  <WizardSummaryRow label="Varaktighet" value="30 minuter" />
                  <WizardSummaryRow label="Adress" value="Storgatan 15, Stockholm" />
                  <div className="border-t border-border pt-2 mt-2">
                    <WizardSummaryRow label="Totalt" value="900 kr" highlight />
                  </div>
                </div>
                <WizardInfoBox icon={<Shield className="w-5 h-5" />} variant="gold">
                  <div>
                    <p className="font-medium text-foreground">Trygg betalning</p>
                    <p className="text-muted-foreground">Beloppet reserveras och frisläpps till tomten först efter genomfört besök.</p>
                  </div>
                </WizardInfoBox>
              </div>
            )}

            {currentStep === 6 && (
              <WizardSection title="Kortuppgifter" description="Säker betalning">
                <div className="space-y-4">
                  <input placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 rounded-lg border border-border bg-background" />
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="MM/ÅÅ" className="px-4 py-3 rounded-lg border border-border bg-background" />
                    <input placeholder="CVV" className="px-4 py-3 rounded-lg border border-border bg-background" />
                  </div>
                </div>
              </WizardSection>
            )}

            {currentStep === 7 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-accent" strokeWidth={3} />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-2">Bokningen är bekräftad!</h3>
                <p className="text-muted-foreground mb-6">Tack för ert förtroende. En magisk julupplevelse väntar er familj.</p>
                <div className="flex justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <Sparkles className="w-6 h-6 text-accent" />
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
              </div>
            )}

            {/* Navigation */}
            {currentStep < 7 && (
              <WizardNavigation
                currentStep={currentStep}
                totalSteps={6}
                onNext={handleNext}
                onBack={handleBack}
                onComplete={handleComplete}
                nextLabel={bookingFlow.navigation.next}
                backLabel={bookingFlow.navigation.back}
                completeLabel={currentStep === 6 ? bookingFlow.navigation.pay : bookingFlow.navigation.confirm}
                completeIcon={currentStep === 6 ? <CreditCard className="w-5 h-5" /> : undefined}
              />
            )}

            {currentStep === 7 && (
              <div className="flex justify-center pt-6 mt-6 border-t border-border">
                <Button variant="hero" size="lg" onClick={() => setCurrentStep(1)}>
                  {bookingFlow.navigation.complete}
                </Button>
              </div>
            )}
          </WizardCard>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WizardDemo;
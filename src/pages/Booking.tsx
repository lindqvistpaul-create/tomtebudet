import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Clock, Users, MapPin, CreditCard, Check, Plus, Trash2, Shield, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import { mockSantas, Child } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Tid", fullTitle: "Välj tid", icon: Clock },
  { id: 2, title: "Barn", fullTitle: "Barnens info", icon: Users },
  { id: 3, title: "Adress", fullTitle: "Adress", icon: MapPin },
  { id: 4, title: "Bekräfta", fullTitle: "Bekräftelse", icon: Check },
];

const durations = [
  { minutes: 15, label: "15 min", description: "Kort besök" },
  { minutes: 30, label: "30 min", description: "Standard", popular: true },
  { minutes: 45, label: "45 min", description: "Utökat" },
];

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const santa = mockSantas.find((s) => s.id === id) || mockSantas[0];
  const contentRef = useRef<HTMLDivElement>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [children, setChildren] = useState<Child[]>([
    { name: "", age: "", gifts: "", specialInfo: "" },
  ]);
  const [address, setAddress] = useState({
    street: "",
    postalCode: "",
    city: "",
    doorCode: "",
    instructions: "",
  });

  const totalPrice = (selectedDuration / 15) * santa.pricePerQuarter;

  // Scroll to top when step changes
  useEffect(() => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentStep]);

  const addChild = () => {
    setChildren([...children, { name: "", age: "", gifts: "", specialInfo: "" }]);
  };

  const removeChild = (index: number) => {
    if (children.length > 1) {
      setChildren(children.filter((_, i) => i !== index));
    }
  };

  const updateChild = (index: number, field: keyof Child, value: string) => {
    const updated = [...children];
    updated[index][field] = value;
    setChildren(updated);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = () => {
    navigate(`/betala/${id}`);
  };

  const isStep1Valid = selectedTime !== "";
  const isStep2Valid = children.some(c => c.name.trim() !== "");
  const isStep3Valid = address.street.trim() !== "" && address.city.trim() !== "";

  const canProceed = () => {
    switch (currentStep) {
      case 1: return isStep1Valid;
      case 2: return isStep2Valid;
      case 3: return isStep3Valid;
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-36 lg:pb-16">
      <SimpleHeader />
      
      <main className="pt-16 md:pt-24 pb-8" ref={contentRef}>
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Mobile Step Indicator - Compact pill design */}
          <div className="lg:hidden mb-4">
            <div className="bg-card rounded-2xl p-4 shadow-soft border border-border/30">
              {/* Progress bar */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-accent to-gold-glow"
                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                  {currentStep}/{steps.length}
                </span>
              </div>
              
              {/* Step pills */}
              <div className="flex items-center justify-between gap-1">
                {steps.map((step) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  
                  return (
                    <button
                      key={step.id}
                      onClick={() => currentStep > step.id && setCurrentStep(step.id)}
                      disabled={currentStep <= step.id}
                      className={cn(
                        "flex items-center gap-1.5 px-2.5 py-2 rounded-xl transition-all duration-200 flex-1 justify-center touch-manipulation min-h-[44px]",
                        isActive && "bg-accent/10 text-accent",
                        isCompleted && "bg-primary/5 text-primary cursor-pointer hover:bg-primary/10 active:scale-95",
                        !isActive && !isCompleted && "text-muted-foreground"
                      )}
                    >
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                        isActive && "bg-accent text-accent-foreground",
                        isCompleted && "bg-primary text-primary-foreground",
                        !isActive && !isCompleted && "bg-muted"
                      )}>
                        {isCompleted ? (
                          <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        ) : (
                          <Icon className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <span className={cn(
                        "text-xs font-medium hidden xs:block",
                        isActive && "text-accent",
                        isCompleted && "text-primary"
                      )}>
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop Progress Steps */}
          <div className="hidden lg:block mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                          isCompleted && "bg-gradient-to-br from-accent to-gold-glow border-accent/50",
                          isActive && "border-accent bg-accent/10 shadow-[0_0_20px_rgba(212,166,87,0.3)]",
                          !isActive && !isCompleted && "border-border bg-muted"
                        )}
                      >
                        {isCompleted ? (
                          <Check className="w-5 h-5 text-primary" strokeWidth={3} />
                        ) : (
                          <Icon className={cn(
                            "w-5 h-5 transition-colors",
                            isActive ? "text-accent" : "text-muted-foreground"
                          )} />
                        )}
                      </div>
                      <span className={cn(
                        "text-sm mt-2 font-medium",
                        isActive ? "text-foreground" : "text-muted-foreground",
                        isCompleted && "text-foreground"
                      )}>
                        {step.fullTitle}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={cn(
                        "h-0.5 flex-1 mx-4 rounded-full transition-colors duration-300",
                        isCompleted ? "bg-accent" : "bg-muted"
                      )} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-5 md:p-8 shadow-soft border border-border/30">
                {/* Step 1: Choose Time */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h2 className="font-serif text-xl md:text-2xl text-foreground">Välj tid och varaktighet</h2>
                      <p className="text-muted-foreground text-sm mt-1">24 december 2024</p>
                    </div>
                    
                    {/* Duration - Touch optimized */}
                    <div>
                      <Label className="text-foreground mb-3 block text-sm font-medium">Varaktighet</Label>
                      <div className="grid grid-cols-3 gap-2 md:gap-3">
                        {durations.map((d) => (
                          <button
                            key={d.minutes}
                            onClick={() => setSelectedDuration(d.minutes)}
                            className={cn(
                              "relative p-4 rounded-xl border-2 text-center transition-all active:scale-[0.98] touch-manipulation min-h-[80px] flex flex-col items-center justify-center",
                              selectedDuration === d.minutes
                                ? "border-accent bg-accent/5 shadow-[0_0_15px_rgba(212,166,87,0.2)]"
                                : "border-border hover:border-accent/50"
                            )}
                          >
                            {d.popular && (
                              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap">
                                Populär
                              </span>
                            )}
                            <div className="font-serif text-xl text-foreground">{d.label}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{d.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection - Large touch targets */}
                    <div>
                      <Label className="text-foreground mb-3 block text-sm font-medium">Välj starttid</Label>
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                        {santa.availableTimes.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={cn(
                              "py-3.5 px-2 rounded-xl border-2 text-center transition-all active:scale-[0.98] touch-manipulation min-h-[52px] font-medium",
                              selectedTime === time
                                ? "border-accent bg-accent/5 text-foreground shadow-[0_0_15px_rgba(212,166,87,0.2)]"
                                : "border-border hover:border-accent/50 text-foreground"
                            )}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                      {!selectedTime && (
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Välj en starttid för att fortsätta
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Children Info */}
                {currentStep === 2 && (
                  <div className="space-y-5 animate-fade-in">
                    <div>
                      <h2 className="font-serif text-xl md:text-2xl text-foreground">Barnens information</h2>
                      <p className="text-muted-foreground text-sm mt-1">
                        Hjälp tomten att göra besöket extra speciellt
                      </p>
                    </div>

                    {children.map((child, index) => (
                      <div key={index} className="p-4 bg-muted/30 rounded-xl space-y-4 border border-border/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                              <Sparkles className="w-4 h-4 text-accent" />
                            </div>
                            <h3 className="font-medium text-foreground">Barn {index + 1}</h3>
                          </div>
                          {children.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeChild(index)}
                              className="text-muted-foreground hover:text-destructive h-10 w-10 p-0 touch-manipulation"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <Label className="text-xs text-muted-foreground">Namn *</Label>
                            <Input
                              placeholder="Barnets namn"
                              value={child.name}
                              onChange={(e) => updateChild(index, "name", e.target.value)}
                              className="bg-background h-12 text-base"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs text-muted-foreground">Ålder</Label>
                            <Input
                              placeholder="t.ex. 6 år"
                              value={child.age}
                              onChange={(e) => updateChild(index, "age", e.target.value)}
                              className="bg-background h-12 text-base"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">Presenter som tomten tar med</Label>
                          <Input
                            placeholder="t.ex. Docka, Lego, Bok"
                            value={child.gifts}
                            onChange={(e) => updateChild(index, "gifts", e.target.value)}
                            className="bg-background h-12 text-base"
                          />
                        </div>
                        
                        <div className="space-y-1.5">
                          <Label className="text-xs text-muted-foreground">Specialinfo (valfritt)</Label>
                          <Textarea
                            placeholder="t.ex. Älskar dinosaurier, blyg till en början..."
                            value={child.specialInfo}
                            onChange={(e) => updateChild(index, "specialInfo", e.target.value)}
                            className="bg-background resize-none min-h-[80px] text-base"
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      onClick={addChild}
                      className="w-full border-dashed h-12 touch-manipulation"
                    >
                      <Plus className="w-4 h-4" />
                      Lägg till ett barn till
                    </Button>
                  </div>
                )}

                {/* Step 3: Address */}
                {currentStep === 3 && (
                  <div className="space-y-5 animate-fade-in">
                    <div>
                      <h2 className="font-serif text-xl md:text-2xl text-foreground">Leveransadress</h2>
                      <p className="text-muted-foreground text-sm mt-1">
                        Vart ska tomten komma?
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Gatuadress *</Label>
                        <Input
                          placeholder="Storgatan 15"
                          value={address.street}
                          onChange={(e) => setAddress({ ...address, street: e.target.value })}
                          className="bg-background h-12 text-base"
                          autoComplete="street-address"
                        />
                      </div>

                      <div className="grid grid-cols-5 gap-3">
                        <div className="col-span-2 space-y-1.5">
                          <Label className="text-xs text-muted-foreground">Postnummer</Label>
                          <Input
                            placeholder="114 55"
                            value={address.postalCode}
                            onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                            className="bg-background h-12 text-base"
                            inputMode="numeric"
                            autoComplete="postal-code"
                          />
                        </div>
                        <div className="col-span-3 space-y-1.5">
                          <Label className="text-xs text-muted-foreground">Stad *</Label>
                          <Input
                            placeholder="Stockholm"
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            className="bg-background h-12 text-base"
                            autoComplete="address-level2"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Portkod (valfritt)</Label>
                        <Input
                          placeholder="1234"
                          value={address.doorCode}
                          onChange={(e) => setAddress({ ...address, doorCode: e.target.value })}
                          className="bg-background h-12 text-base"
                          inputMode="numeric"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Instruktioner till tomten (valfritt)</Label>
                        <Textarea
                          placeholder="t.ex. Ring på dörren, använd bakdörren..."
                          value={address.instructions}
                          onChange={(e) => setAddress({ ...address, instructions: e.target.value })}
                          className="bg-background resize-none min-h-[100px] text-base"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <div className="space-y-5 animate-fade-in">
                    <div>
                      <h2 className="font-serif text-xl md:text-2xl text-foreground">Bekräfta din bokning</h2>
                      <p className="text-muted-foreground text-sm mt-1">Granska informationen nedan</p>
                    </div>
                    
                    {/* Summary Cards */}
                    <div className="space-y-3">
                      <div className="p-4 bg-muted/30 rounded-xl border border-border/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-accent" />
                          <h3 className="font-medium text-foreground text-sm">Tid & Tomte</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {santa.name} • 24 dec kl {selectedTime} • {selectedDuration} min
                        </p>
                      </div>

                      <div className="p-4 bg-muted/30 rounded-xl border border-border/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-accent" />
                          <h3 className="font-medium text-foreground text-sm">Barn</h3>
                        </div>
                        {children.filter(c => c.name).map((child, i) => (
                          <p key={i} className="text-muted-foreground text-sm">
                            {child.name}{child.age && `, ${child.age}`}{child.gifts && ` – ${child.gifts}`}
                          </p>
                        ))}
                      </div>

                      <div className="p-4 bg-muted/30 rounded-xl border border-border/30">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-accent" />
                          <h3 className="font-medium text-foreground text-sm">Adress</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {address.street}, {address.postalCode} {address.city}
                          {address.doorCode && ` • Portkod: ${address.doorCode}`}
                        </p>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-foreground text-sm">Trygg betalning</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {totalPrice} kr reserveras nu och frisläpps efter genomfört besök. Avboka gratis 48h innan.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Desktop Navigation Buttons */}
                <div className="hidden lg:flex items-center justify-between mt-8 pt-6 border-t border-border">
                  {currentStep > 1 ? (
                    <Button variant="outline" onClick={handleBack} size="lg">
                      <ChevronLeft className="w-4 h-4" />
                      Tillbaka
                    </Button>
                  ) : (
                    <div />
                  )}
                  
                  {currentStep < 4 ? (
                    <Button variant="hero" onClick={handleNext} disabled={!canProceed()} size="lg">
                      Fortsätt
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button variant="festive" size="lg" onClick={handleConfirm}>
                      <CreditCard className="w-5 h-5" />
                      Bekräfta & Betala {totalPrice} kr
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - Order Summary (Desktop only) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28 bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                <div className="flex items-center gap-4 pb-4 border-b border-border">
                  <img
                    src={santa.image}
                    alt={santa.name}
                    className="w-16 h-16 rounded-xl object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-serif text-lg text-foreground">{santa.name}</h3>
                    <p className="text-sm text-muted-foreground">{santa.location}</p>
                  </div>
                </div>

                <div className="py-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Datum</span>
                    <span className="text-foreground">24 december 2024</span>
                  </div>
                  {selectedTime && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tid</span>
                      <span className="text-foreground">{selectedTime}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Varaktighet</span>
                    <span className="text-foreground">{selectedDuration} min</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">Totalt</span>
                    <span className="font-serif text-2xl text-foreground">{totalPrice} kr</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Reserveras nu, betalas efter besöket
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Footer - Enhanced */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border shadow-lg z-40">
        <div className="container mx-auto px-4 py-3 pb-safe">
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <Button 
                variant="outline" 
                onClick={handleBack} 
                className="flex-shrink-0 h-12 w-12 p-0 touch-manipulation active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="text-xs text-muted-foreground">Totalt</div>
              <div className="font-serif text-xl text-foreground">{totalPrice} kr</div>
            </div>
            
            {currentStep < 4 ? (
              <Button 
                variant="hero" 
                onClick={handleNext} 
                disabled={!canProceed()}
                className="h-12 px-6 text-base touch-manipulation active:scale-[0.98] flex-shrink-0"
              >
                Fortsätt
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button 
                variant="festive" 
                onClick={handleConfirm} 
                className="h-12 px-5 text-sm touch-manipulation active:scale-[0.98] flex-shrink-0"
              >
                <CreditCard className="w-4 h-4" />
                Betala {totalPrice} kr
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

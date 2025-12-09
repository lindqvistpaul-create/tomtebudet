import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Clock, Users, MapPin, CreditCard, Check, Plus, Trash2, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import { mockSantas, Child } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Välj tid", icon: Clock },
  { id: 2, title: "Barnens info", icon: Users },
  { id: 3, title: "Adress", icon: MapPin },
  { id: 4, title: "Bekräftelse", icon: Check },
];

const durations = [
  { minutes: 15, label: "15 min", description: "Kort besök" },
  { minutes: 30, label: "30 min", description: "Standard" },
  { minutes: 45, label: "45 min", description: "Utökat besök" },
];

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const santa = mockSantas.find((s) => s.id === id) || mockSantas[0];

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
    // Navigate to payment page
    navigate(`/betala/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                        currentStep >= step.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <span
                      className={cn(
                        "text-sm mt-2 font-medium",
                        currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "h-0.5 w-full mx-4 hidden md:block",
                        currentStep > step.id ? "bg-primary" : "bg-muted"
                      )}
                      style={{ minWidth: "60px" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft">
                {/* Step 1: Choose Time */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="font-serif text-2xl text-foreground">Välj tid och varaktighet</h2>
                    
                    {/* Duration */}
                    <div>
                      <Label className="text-foreground mb-3 block">Varaktighet</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {durations.map((d) => (
                          <button
                            key={d.minutes}
                            onClick={() => setSelectedDuration(d.minutes)}
                            className={cn(
                              "p-4 rounded-xl border-2 text-center transition-all",
                              selectedDuration === d.minutes
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <div className="font-serif text-xl text-foreground">{d.label}</div>
                            <div className="text-sm text-muted-foreground">{d.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                      <Label className="text-foreground mb-3 block">Välj starttid (24 december)</Label>
                      <div className="grid grid-cols-5 gap-2">
                        {santa.availableTimes.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={cn(
                              "py-3 px-4 rounded-lg border-2 text-center transition-all",
                              selectedTime === time
                                ? "border-primary bg-primary/5 text-foreground"
                                : "border-border hover:border-primary/50 text-foreground"
                            )}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Children Info */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="font-serif text-2xl text-foreground">Barnens information</h2>
                    <p className="text-muted-foreground">
                      Hjälp tomten att göra besöket extra speciellt genom att dela information om barnen.
                    </p>

                    {children.map((child, index) => (
                      <div key={index} className="p-5 bg-muted/30 rounded-xl space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-foreground">Barn {index + 1}</h3>
                          {children.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeChild(index)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Namn</Label>
                            <Input
                              placeholder="Barnets namn"
                              value={child.name}
                              onChange={(e) => updateChild(index, "name", e.target.value)}
                              className="bg-background"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Ålder</Label>
                            <Input
                              placeholder="t.ex. 6 år"
                              value={child.age}
                              onChange={(e) => updateChild(index, "age", e.target.value)}
                              className="bg-background"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Presenter som tomten tar med</Label>
                          <Input
                            placeholder="t.ex. Docka, Lego, Bok"
                            value={child.gifts}
                            onChange={(e) => updateChild(index, "gifts", e.target.value)}
                            className="bg-background"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Specialinformation (valfritt)</Label>
                          <Textarea
                            placeholder="t.ex. Älskar dinosaurier, blyg till en början..."
                            value={child.specialInfo}
                            onChange={(e) => updateChild(index, "specialInfo", e.target.value)}
                            className="bg-background resize-none"
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      onClick={addChild}
                      className="w-full border-dashed"
                    >
                      <Plus className="w-4 h-4" />
                      Lägg till ett barn till
                    </Button>
                  </div>
                )}

                {/* Step 3: Address */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="font-serif text-2xl text-foreground">Leveransadress</h2>
                    <p className="text-muted-foreground">
                      Vart ska tomten komma?
                    </p>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Gatuadress</Label>
                        <Input
                          placeholder="Storgatan 15"
                          value={address.street}
                          onChange={(e) => setAddress({ ...address, street: e.target.value })}
                          className="bg-background"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Postnummer</Label>
                          <Input
                            placeholder="114 55"
                            value={address.postalCode}
                            onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Stad</Label>
                          <Input
                            placeholder="Stockholm"
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            className="bg-background"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Portkod (valfritt)</Label>
                        <Input
                          placeholder="1234"
                          value={address.doorCode}
                          onChange={(e) => setAddress({ ...address, doorCode: e.target.value })}
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Instruktioner till tomten (valfritt)</Label>
                        <Textarea
                          placeholder="t.ex. Ring på dörren, använd bakdörren, vänta ute tills barnen är klara..."
                          value={address.instructions}
                          onChange={(e) => setAddress({ ...address, instructions: e.target.value })}
                          className="bg-background resize-none"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h2 className="font-serif text-2xl text-foreground">Bekräfta din bokning</h2>
                    
                    {/* Summary */}
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/30 rounded-xl">
                        <h3 className="font-medium text-foreground mb-2">Tid & Tomte</h3>
                        <p className="text-muted-foreground">
                          {santa.name} • 24 december kl {selectedTime} • {selectedDuration} minuter
                        </p>
                      </div>

                      <div className="p-4 bg-muted/30 rounded-xl">
                        <h3 className="font-medium text-foreground mb-2">Barn</h3>
                        {children.filter(c => c.name).map((child, i) => (
                          <p key={i} className="text-muted-foreground">
                            {child.name}, {child.age} – {child.gifts}
                          </p>
                        ))}
                      </div>

                      <div className="p-4 bg-muted/30 rounded-xl">
                        <h3 className="font-medium text-foreground mb-2">Adress</h3>
                        <p className="text-muted-foreground">
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
                          <h3 className="font-medium text-foreground">Trygg betalning</h3>
                          <p className="text-sm text-muted-foreground">
                            Beloppet på {totalPrice} kr reserveras nu och frisläpps till tomten först efter genomfört besök. Du kan avboka gratis upp till 24 timmar innan.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  {currentStep > 1 ? (
                    <Button variant="outline" onClick={handleBack}>
                      <ChevronLeft className="w-4 h-4" />
                      Tillbaka
                    </Button>
                  ) : (
                    <div />
                  )}
                  
                  {currentStep < 4 ? (
                    <Button variant="hero" onClick={handleNext} disabled={currentStep === 1 && !selectedTime}>
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

            {/* Sidebar - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-card rounded-2xl p-6 shadow-soft border border-border/50">
                <div className="flex items-center gap-4 pb-4 border-b border-border">
                  <img
                    src={santa.image}
                    alt={santa.name}
                    className="w-16 h-16 rounded-xl object-cover"
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
    </div>
  );
};

export default Booking;

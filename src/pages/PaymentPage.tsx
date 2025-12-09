import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CreditCard, 
  Lock, 
  Shield, 
  Check,
  ChevronLeft
} from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import { mockSantas } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const santa = mockSantas.find((s) => s.id === id) || mockSantas[0];
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  // Mock booking data - in real app this would come from state/context
  const bookingData = {
    duration: 30,
    time: "15:00",
    children: [{ name: "Ella", age: "6 år" }],
    address: "Storgatan 15, 114 55 Stockholm"
  };

  const totalPrice = (bookingData.duration / 15) * santa.pricePerQuarter;

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    navigate(`/bekraftelse/b-${Date.now()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back button */}
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Tillbaka
          </button>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="font-serif text-2xl text-foreground">Betalning</h1>
                  <p className="text-muted-foreground text-sm">Säker betalning med kortreservation</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Card Number */}
                <div className="space-y-2">
                  <Label>Kortnummer</Label>
                  <div className="relative">
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                      className="bg-background pl-12"
                      required
                    />
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                </div>

                {/* Cardholder Name */}
                <div className="space-y-2">
                  <Label>Kortinnehavarens namn</Label>
                  <Input
                    placeholder="Anna Andersson"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="bg-background"
                    required
                  />
                </div>

                {/* Expiry & CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Utgångsdatum</Label>
                    <Input
                      placeholder="MM/ÅÅ"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                      maxLength={5}
                      className="bg-background"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>CVV</Label>
                    <div className="relative">
                      <Input
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                        maxLength={3}
                        className="bg-background"
                        required
                      />
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                {/* Security Info */}
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-foreground text-sm">Trygg betalning</h3>
                      <p className="text-xs text-muted-foreground">
                        Beloppet reserveras nu och frisläpps till tomten först efter genomfört besök. Du kan avboka gratis upp till 24 timmar innan.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  variant="festive" 
                  size="xl" 
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Behandlar betalning...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Reservera {totalPrice} kr
                    </>
                  )}
                </Button>

                {/* Card logos */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <Lock className="w-3 h-3" />
                    256-bit SSL-krypterad
                  </div>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h2 className="font-serif text-xl text-foreground mb-4">Bokningssammanfattning</h2>
                
                {/* Santa Info */}
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

                {/* Booking Details */}
                <div className="py-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Datum</span>
                    <span className="text-foreground">24 december 2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tid</span>
                    <span className="text-foreground">{bookingData.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Längd</span>
                    <span className="text-foreground">{bookingData.duration} minuter</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Antal barn</span>
                    <span className="text-foreground">{bookingData.children.length} st</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tomtebesök ({bookingData.duration} min)</span>
                    <span className="text-foreground">{totalPrice} kr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Serviceavgift</span>
                    <span className="text-foreground">0 kr</span>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 mt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">Totalt</span>
                    <span className="font-serif text-2xl text-foreground">{totalPrice} kr</span>
                  </div>
                </div>
              </div>

              {/* What's included */}
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h3 className="font-medium text-foreground mb-4">Ingår i bokningen</h3>
                <ul className="space-y-3">
                  {[
                    "Verifierad och granskad tomte",
                    "Personligt besök i ert hem",
                    "Presenter överlämnas",
                    "Chatt med tomten innan besök",
                    "Gratis avbokning 24h innan"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
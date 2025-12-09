import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Shield, 
  Check,
  ChevronLeft,
  Smartphone,
  Wallet,
  MapPin,
  Calendar,
  Clock,
  AlertCircle,
  Loader2
} from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import { mockSantas } from "@/lib/mockData";
import { cn } from "@/lib/utils";

type PaymentMethod = "card" | "swish" | "klarna";

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const santa = mockSantas.find((s) => s.id === id);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");

  // Mock booking data - in real app this would come from state/context/database
  const bookingData = {
    duration: 30,
    date: "24 december 2024",
    time: "15:00",
    children: [{ name: "Ella", age: "6 år" }],
    address: "Storgatan 15",
    city: "Stockholm"
  };

  // If no santa found, show error state
  if (!santa) {
    return (
      <div className="min-h-screen bg-primary flex flex-col">
        <SimpleHeader />
        <main className="flex-1 flex items-center justify-center pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-md">
            <div className="bg-card rounded-2xl p-8 shadow-soft text-center">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
              <h1 className="font-serif text-2xl text-foreground mb-2">
                Bokningen hittades inte
              </h1>
              <p className="text-muted-foreground mb-6">
                Vi kunde tyvärr inte hitta den bokning du söker. Den kan ha tagits bort eller så är länken felaktig.
              </p>
              <Link to="/mina-bokningar">
                <Button variant="default" size="lg" className="w-full">
                  Tillbaka till Mina bokningar
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalPrice = (bookingData.duration / 15) * santa.pricePerQuarter;
  const pricePerQuarter = santa.pricePerQuarter;

  const handleSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to confirmation with a mock booking ID
    const mockBookingId = `b-${Date.now()}`;
    navigate(`/bekraftelse/${mockBookingId}`);
  };

  const paymentMethods = [
    {
      id: "card" as PaymentMethod,
      name: "Kortbetalning",
      description: "Visa, Mastercard, Amex",
      icon: CreditCard,
    },
    {
      id: "swish" as PaymentMethod,
      name: "Swish",
      description: "Betala direkt med mobilen",
      icon: Smartphone,
    },
    {
      id: "klarna" as PaymentMethod,
      name: "Klarna",
      description: "Betala senare eller delbetala",
      icon: Wallet,
    },
  ];

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <SimpleHeader />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back button */}
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-background/60 hover:text-background transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Tillbaka
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl text-background mb-2">
              Betala din bokning
            </h1>
            <p className="text-background/70">
              Granska din bokning innan du slutför betalningen.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Column - Booking Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Booking Summary Card */}
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <h2 className="font-serif text-xl text-foreground mb-4">Din bokning</h2>
                
                {/* Santa Info */}
                <div className="flex items-center gap-4 pb-4 border-b border-border">
                  <img
                    src={santa.image}
                    alt={santa.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-serif text-lg text-foreground">{santa.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-accent">
                      <span className="text-yellow-500">★</span>
                      <span>{santa.rating}</span>
                      <span className="text-muted-foreground">({santa.reviews} omdömen)</span>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="py-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">Datum:</span>
                    <span className="text-foreground ml-auto">{bookingData.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">Tid:</span>
                    <span className="text-foreground ml-auto">{bookingData.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">Längd:</span>
                    <span className="text-foreground ml-auto">{bookingData.duration} minuter</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">Plats:</span>
                    <span className="text-foreground ml-auto">{bookingData.city}</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pris per 15 min</span>
                    <span className="text-foreground">{pricePerQuarter} kr</span>
                  </div>
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
                <div className="pt-4 mt-4 border-t-2 border-accent/30">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">Totalt att betala</span>
                    <span className="font-serif text-2xl text-accent">{totalPrice} kr</span>
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
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Payment Section */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl text-foreground">Välj betalmetod</h2>
                    <p className="text-muted-foreground text-sm">Säker betalning med kortreservation</p>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-3 mb-6">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left",
                        selectedMethod === method.id
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/50 hover:bg-muted/50"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        selectedMethod === method.id ? "bg-accent/20" : "bg-muted"
                      )}>
                        <method.icon className={cn(
                          "w-5 h-5",
                          selectedMethod === method.id ? "text-accent" : "text-muted-foreground"
                        )} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{method.name}</div>
                        <div className="text-sm text-muted-foreground">{method.description}</div>
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        selectedMethod === method.id
                          ? "border-accent bg-accent"
                          : "border-muted-foreground"
                      )}>
                        {selectedMethod === method.id && (
                          <Check className="w-3 h-3 text-primary-foreground" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Security Info */}
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl mb-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-foreground text-sm">Trygg betalning</h3>
                      <p className="text-xs text-muted-foreground">
                        Betalningen reserveras och släpps först efter att tomtebesöket har genomförts. 
                        Du kan avboka gratis upp till 24 timmar innan.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  onClick={handleSubmit}
                  variant="festive" 
                  size="xl" 
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Behandlar betalning...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Slutför betalning – {totalPrice} kr
                    </>
                  )}
                </Button>

                {/* Trust text below button */}
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Betalningen reserveras och släpps först efter att tomtebesöket har genomförts.
                </p>

                {/* Security badges */}
                <div className="flex items-center justify-center gap-6 pt-6 mt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-4 h-4 text-accent" />
                    <span>Säker betalning</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CreditCard className="w-4 h-4 text-accent" />
                    <span>Krypterad</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentPage;

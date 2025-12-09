import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Shield, 
  Check,
  ChevronLeft,
  MapPin,
  Calendar,
  Clock,
  AlertCircle,
  Loader2
} from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [booking, setBooking] = useState<any>(null);
  const [children, setChildren] = useState<any[]>([]);

  // Check if payment was cancelled
  useEffect(() => {
    if (searchParams.get("cancelled") === "true") {
      toast.error("Betalningen avbröts. Du kan försöka igen.");
    }
  }, [searchParams]);

  // Fetch booking data
  useEffect(() => {
    const fetchBooking = async () => {
      if (!id || !user) {
        setIsLoading(false);
        return;
      }

      try {
        // Try to find booking by ID first, then by santa_id if creating new
        const bookingId = searchParams.get("bookingId") || id;
        
        const { data: bookingData, error: bookingError } = await supabase
          .from("bookings")
          .select("*")
          .eq("id", bookingId)
          .eq("user_id", user.id)
          .maybeSingle();

        if (bookingError) {
          console.error("Error fetching booking:", bookingError);
          toast.error("Kunde inte hämta bokningen");
          setIsLoading(false);
          return;
        }

        if (bookingData) {
          setBooking(bookingData);

          // Fetch children for this booking
          const { data: childrenData } = await supabase
            .from("booking_children")
            .select("*")
            .eq("booking_id", bookingData.id);

          if (childrenData) {
            setChildren(childrenData);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Ett fel uppstod");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [id, user, searchParams]);

  // If loading, show skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex flex-col">
        <SimpleHeader />
        <main className="flex-1 flex items-center justify-center pt-24 pb-16">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </main>
        <Footer />
      </div>
    );
  }

  // If no booking found, show error state
  if (!booking) {
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
                Vi kunde tyvärr inte hitta den bokning du söker. Du behöver först skapa en bokning.
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

  const handleStripeCheckout = async () => {
    setIsProcessing(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Du måste vara inloggad för att betala");
        navigate("/login");
        return;
      }

      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: { bookingId: booking.id },
      });

      if (error) {
        console.error("Error creating checkout session:", error);
        toast.error("Kunde inte starta betalningen. Försök igen.");
        setIsProcessing(false);
        return;
      }

      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        toast.error("Kunde inte skapa betalningssession");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Ett fel uppstod. Försök igen.");
      setIsProcessing(false);
    }
  };

  // Format date nicely
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("sv-SE", { 
      day: "numeric", 
      month: "long", 
      year: "numeric" 
    });
  };

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
                  {booking.santa_image && (
                    <img
                      src={booking.santa_image}
                      alt={booking.santa_name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-serif text-lg text-foreground">{booking.santa_name}</h3>
                    <p className="text-sm text-muted-foreground">Verifierad tomte</p>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="py-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">Datum:</span>
                    <span className="text-foreground ml-auto">{formatDate(booking.date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">Tid:</span>
                    <span className="text-foreground ml-auto">{booking.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">Längd:</span>
                    <span className="text-foreground ml-auto">{booking.duration} minuter</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">Plats:</span>
                    <span className="text-foreground ml-auto">{booking.city || booking.address}</span>
                  </div>
                </div>

                {/* Children */}
                {children.length > 0 && (
                  <div className="py-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">Barn som deltar:</p>
                    <ul className="space-y-1">
                      {children.map((child, i) => (
                        <li key={i} className="text-sm text-foreground">
                          {child.name}, {child.age}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Total */}
                <div className="pt-4 mt-4 border-t-2 border-accent/30">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">Totalt att betala</span>
                    <span className="font-serif text-2xl text-accent">{booking.total_price} kr</span>
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
                    "Gratis avbokning 48h innan"
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
                    <h2 className="font-serif text-xl text-foreground">Säker betalning</h2>
                    <p className="text-muted-foreground text-sm">Powered by Stripe</p>
                  </div>
                </div>

                {/* Payment info */}
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground text-sm">Kortbetalning</p>
                        <p className="text-xs text-muted-foreground">Visa, Mastercard, Amex</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Info */}
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl mb-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-foreground text-sm">Trygg betalning</h3>
                      <p className="text-xs text-muted-foreground">
                        Betalningen behandlas säkert via Stripe. Du kan avboka gratis upp till 48 timmar innan.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  onClick={handleStripeCheckout}
                  variant="festive" 
                  size="xl" 
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Förbereder betalning...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Betala med kort – {booking.total_price} kr
                    </>
                  )}
                </Button>

                {/* Trust text below button */}
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Genom att slutföra betalningen godkänner du våra{" "}
                  <Link to="/kopvillkor" className="text-accent hover:underline">köpvillkor</Link>.
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

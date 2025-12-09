import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, CreditCard, Gift, Home as HomeIcon, List, Sparkles, CheckCircle2, Star } from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import AnimatedCheckmark from "@/components/AnimatedCheckmark";
import Starfall from "@/components/Starfall";

// Mock booking data - structured for real data integration
interface BookingData {
  id: string;
  santa: {
    id: string;
    name: string;
    image: string;
    verified: boolean;
  };
  customer: {
    name: string;
    email: string;
  };
  date: string;
  time: string;
  duration: number;
  address: string;
  city: string;
  price: number;
  paymentStatus: "reserved" | "paid" | "pending";
  status: "confirmed" | "pending" | "completed";
}

const getBookingById = (bookingId: string): BookingData | null => {
  // Mock data - replace with real API call
  const mockBookings: Record<string, BookingData> = {
    "1": {
      id: "1",
      santa: {
        id: "1",
        name: "Tomte Erik",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        verified: true,
      },
      customer: {
        name: "Anna Andersson",
        email: "anna@example.com",
      },
      date: "24 december 2024",
      time: "15:00",
      duration: 30,
      address: "Storgatan 12",
      city: "Stockholm",
      price: 1300,
      paymentStatus: "reserved",
      status: "confirmed",
    },
  };
  
  return mockBookings[bookingId] || mockBookings["1"];
};

const BookingConfirmation = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const booking = getBookingById(bookingId || "1");

  if (!booking) {
    return (
      <div className="min-h-screen bg-background">
        <SimpleHeader />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h1 className="font-serif text-2xl text-foreground mb-4">Bokningen kunde inte hittas</h1>
            <Link to="/mina-bokningar">
              <Button variant="hero">Visa mina bokningar</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const paymentStatusText = {
    reserved: "Betalning reserverad",
    paid: "Betald",
    pending: "Väntar på betalning",
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Starfall />
      <SimpleHeader />
      
      <main className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <AnimatedCheckmark size="lg" />
            </div>

            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Din tomtebokning är <span className="text-gradient-gold">bekräftad!</span>
            </h1>

            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Tack för att du använder Tomtebudet. En verifierad jultomte kommer hem till er enligt bokningen nedan.
            </p>

            <div className="flex justify-center gap-2 mt-6">
              <Sparkles className="w-5 h-5 text-accent" />
              <Star className="w-6 h-6 text-accent fill-accent" />
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
          </div>

          {/* Booking Summary Card */}
          <div className="bg-card rounded-3xl p-6 md:p-8 shadow-soft border border-border/50 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <h2 className="font-serif text-xl text-foreground">Bokningsdetaljer</h2>
            </div>
            
            <div className="space-y-4">
              {/* Santa Info */}
              <div className="flex items-center gap-4 pb-4 border-b border-border/50">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-accent/30">
                  <img 
                    src={booking.santa.image} 
                    alt={booking.santa.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-serif text-lg text-foreground">{booking.santa.name}</p>
                  {booking.santa.verified && (
                    <span className="inline-flex items-center gap-1 text-sm text-accent">
                      <CheckCircle2 className="w-4 h-4" />
                      Verifierad tomte
                    </span>
                  )}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Datum</p>
                    <p className="font-medium text-foreground">{booking.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tid & varaktighet</p>
                    <p className="font-medium text-foreground">kl {booking.time}, {booking.duration} min</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Plats</p>
                    <p className="font-medium text-foreground">{booking.city}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pris</p>
                    <p className="font-medium text-foreground">{booking.price} kr</p>
                  </div>
                </div>
              </div>

              {/* Payment Status */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Betalningsstatus</span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    {paymentStatusText[booking.paymentStatus]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Preparation Tips */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-5 h-5 text-accent" />
              <h2 className="font-serif text-xl text-foreground">Så här förbereder ni er</h2>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent text-sm font-medium">1</span>
                </div>
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">Ha julklapparna redo</span> – märk dem gärna med barnens namn så tomten lätt kan dela ut dem.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent text-sm font-medium">2</span>
                </div>
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">Förbered en plats</span> – se till att tomten kan komma in ostört och har en fin plats att sitta på.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent text-sm font-medium">3</span>
                </div>
                <p className="text-muted-foreground">
                  <span className="text-foreground font-medium">Informera de vuxna</span> – berätta för alla vuxna i hushållet ungefär vilken tid tomten förväntas anlända.
                </p>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/mina-bokningar">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                <List className="w-5 h-5" />
                Visa mina bokningar
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <HomeIcon className="w-5 h-5" />
                Tillbaka till startsidan
              </Button>
            </Link>
          </div>

          {/* Warm closing message */}
          <p className="text-center text-muted-foreground mt-8">
            ✨ Vi önskar er en riktigt magisk julafton! ✨
          </p>
        </div>
      </main>
    </div>
  );
};

export default BookingConfirmation;

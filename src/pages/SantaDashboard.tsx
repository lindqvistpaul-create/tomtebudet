import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  Bell, 
  Star, 
  CreditCard, 
  MessageCircle, 
  Settings, 
  User, 
  Check, 
  X, 
  ChevronRight,
  ChevronDown,
  MapPin,
  Wallet,
  TrendingUp,
  BadgeCheck,
  Gift,
  FileText,
  Users,
  Sparkles
} from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

// Mock data for santa dashboard - structured to match real database schema
const mockBookings = [
  {
    id: "1",
    customerName: "Familjen Andersson",
    date: "2024-12-24",
    time: "14:00",
    duration: 30,
    address: "Storgatan 15",
    city: "Sundbyberg",
    postal_code: "172 31",
    instructions: "Ring på dörren, vi bor på våning 3. Barnen vet inte att tomten kommer!",
    children: [
      { name: "Emma", age: "5 år", gifts: "Docka och ritblock" },
      { name: "Oscar", age: "7 år", gifts: "Lego och böcker" }
    ],
    totalPrice: 900,
    status: "confirmed",
    paymentStatus: "reserved"
  },
  {
    id: "2",
    customerName: "Familjen Lindqvist",
    date: "2024-12-24",
    time: "16:00",
    duration: 45,
    address: "Kungsgatan 22",
    city: "Stockholm",
    postal_code: "111 35",
    instructions: "Portkod 1234. Kom gärna med en stor säck!",
    children: [
      { name: "Maja", age: "4 år", gifts: "Nallebjörn" },
      { name: "Axel", age: "6 år", gifts: "Dinosaurie" },
      { name: "Elsa", age: "9 år", gifts: "Konstset" }
    ],
    totalPrice: 1350,
    status: "pending",
    paymentStatus: "reserved"
  },
  {
    id: "3",
    customerName: "Familjen Bergström",
    date: "2024-12-24",
    time: "18:30",
    duration: 30,
    address: "Björkvägen 8",
    city: "Solna",
    postal_code: "169 51",
    instructions: "Grinden är olåst, gå rakt fram till dörren.",
    children: [
      { name: "Wilma", age: "3 år", gifts: "Pussel och klossar" }
    ],
    totalPrice: 900,
    status: "confirmed",
    paymentStatus: "reserved"
  }
];

const recentReviews = [
  {
    id: "1",
    author: "Maria S.",
    rating: 5,
    text: "Fantastisk tomte! Barnen älskade honom och han hade verkligen en magisk aura.",
    date: "15 dec 2024"
  },
  {
    id: "2",
    author: "Johan K.",
    rating: 5,
    text: "Så professionell och varm. Kommer definitivt att boka igen nästa år!",
    date: "12 dec 2024"
  },
  {
    id: "3",
    author: "Anna L.",
    rating: 4,
    text: "Bra besök, barnen var glada. Lite sen ankomst men inget problem.",
    date: "10 dec 2024"
  }
];

const notifications = [
  {
    id: "1",
    type: "booking",
    title: "Ny bokning!",
    message: "Familjen Lindqvist vill boka dig 24 dec kl 16:00",
    time: "2 tim sedan",
    unread: true
  },
  {
    id: "2",
    type: "message",
    title: "Nytt meddelande",
    message: "Familjen Andersson: 'Barnen är så exalterade!'",
    time: "5 tim sedan",
    unread: true
  },
  {
    id: "3",
    type: "review",
    title: "Nytt omdöme",
    message: "Maria S. gav dig 5 stjärnor!",
    time: "1 dag sedan",
    unread: false
  }
];

type TabType = "overview" | "calendar" | "notifications" | "reviews" | "earnings" | "settings";

const SantaDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);

  // Use mock data - structure ready for real API data
  const bookings = mockBookings;
  const isVerified = true; // Would come from santa_applications table
  const averageRating = 4.9;
  const totalReviews = 47;

  // Get today's date for "Dagens schema"
  const today = new Date().toISOString().split('T')[0];
  const todaysBookings = bookings.filter(b => b.date === today);
  const upcomingBookings = bookings.filter(b => b.date >= today);

  const tabs = [
    { id: "overview" as TabType, label: "Översikt", icon: User },
    { id: "calendar" as TabType, label: "Kalender", icon: Calendar },
    { id: "notifications" as TabType, label: "Notiser", icon: Bell, badge: 2 },
    { id: "reviews" as TabType, label: "Omdömen", icon: Star },
    { id: "earnings" as TabType, label: "Inkomster", icon: Wallet },
    { id: "settings" as TabType, label: "Inställningar", icon: Settings },
  ];

  const toggleBookingDetails = (bookingId: string) => {
    setExpandedBookingId(expandedBookingId === bookingId ? null : bookingId);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('sv-SE', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
            Bekräftad
          </span>
        );
      case "pending":
        return (
          <span className="px-2 py-1 bg-accent/20 text-accent rounded-full text-xs font-medium">
            Väntar på bekräftelse
          </span>
        );
      default:
        return null;
    }
  };

  // Empty state component
  const EmptyState = () => (
    <div className="bg-card rounded-2xl p-12 shadow-soft text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <Gift className="w-10 h-10 text-primary" />
      </div>
      <h3 className="font-serif text-2xl text-foreground mb-3">
        Du har inga bokningar ännu
      </h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        När en familj bokar dig dyker uppdragen upp här. Se till att din profil 
        är uppdaterad och att du har angett din tillgänglighet för julafton.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/tomte/1">
          <Button variant="hero" className="gap-2">
            <User className="w-4 h-4" />
            Visa min profil
          </Button>
        </Link>
        <Button variant="outline" onClick={() => setActiveTab("calendar")} className="gap-2">
          <Calendar className="w-4 h-4" />
          Hantera tillgänglighet
        </Button>
      </div>
    </div>
  );

  // Booking card component
  const BookingCard = ({ booking }: { booking: typeof mockBookings[0] }) => {
    const isExpanded = expandedBookingId === booking.id;
    
    return (
      <div className="bg-muted/30 rounded-xl overflow-hidden">
        {/* Main booking info */}
        <div className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium text-foreground">{booking.customerName}</h3>
                {getStatusBadge(booking.status)}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(booking.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {booking.time} ({booking.duration} min)
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {booking.city}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {booking.children.length} {booking.children.length === 1 ? 'barn' : 'barn'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg text-foreground">{booking.totalPrice} kr</span>
              {booking.status === "pending" ? (
                <div className="flex gap-2">
                  <Button variant="hero" size="sm">
                    <Check className="w-4 h-4" />
                    Acceptera
                  </Button>
                  <Button variant="outline" size="sm">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => toggleBookingDetails(booking.id)}
                  className="gap-1"
                >
                  Visa detaljer
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform",
                    isExpanded && "rotate-180"
                  )} />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Expanded details */}
        {isExpanded && (
          <div className="border-t border-border/50 p-4 bg-background/50 space-y-4">
            {/* Address */}
            <div>
              <h4 className="font-medium text-foreground mb-1 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Adress
              </h4>
              <p className="text-muted-foreground ml-6">
                {booking.address}, {booking.postal_code} {booking.city}
              </p>
            </div>

            {/* Children */}
            <div>
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Gift className="w-4 h-4 text-primary" />
                Barn
              </h4>
              <div className="ml-6 space-y-2">
                {booking.children.map((child, index) => (
                  <div key={index} className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">{child.name}</span>
                      <span className="text-sm text-muted-foreground">({child.age})</span>
                    </div>
                    {child.gifts && (
                      <p className="text-sm text-muted-foreground">
                        <span className="text-accent">Önskar:</span> {child.gifts}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            {booking.instructions && (
              <div>
                <h4 className="font-medium text-foreground mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Instruktioner
                </h4>
                <p className="text-muted-foreground ml-6 bg-primary/5 rounded-lg p-3 border border-primary/10">
                  "{booking.instructions}"
                </p>
              </div>
            )}

            {/* Payment status */}
            <div className="ml-6 flex items-center gap-2 text-sm">
              <CreditCard className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">
                Betalning reserverad hos Tomtebudet
              </span>
            </div>

            {/* Action buttons */}
            <div className="ml-6 flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="gap-2">
                <MessageCircle className="w-4 h-4" />
                Kontakta familjen
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground">
                Tomtens <span className="text-gradient-gold">dashboard</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Här ser du dina bokningar, ditt schema och din profil.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/tomte/1">
                <Button variant="outline" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  Visa min offentliga profil
                </Button>
              </Link>
              {isVerified && (
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <BadgeCheck className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Verifierad tomte</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <nav className="bg-card rounded-2xl p-4 shadow-soft sticky top-28">
                <ul className="space-y-1">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all",
                          activeTab === tab.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted text-foreground"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <tab.icon className="w-5 h-5" />
                          <span className="font-medium">{tab.label}</span>
                        </div>
                        {tab.badge && (
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium",
                            activeTab === tab.id
                              ? "bg-primary-foreground text-primary"
                              : "bg-secondary text-secondary-foreground"
                          )}>
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Profile status card */}
                <div className="mt-6 p-4 bg-muted/30 rounded-xl">
                  <h4 className="font-medium text-foreground mb-3 text-sm">Profilstatus</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">BankID</span>
                      {isVerified ? (
                        <span className="text-primary flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          Verifierad
                        </span>
                      ) : (
                        <span className="text-muted-foreground">Ej verifierad</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Betyg</span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        {averageRating} ({totalReviews})
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => setActiveTab("settings")}
                  >
                    Redigera profil
                  </Button>
                </div>
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-4 space-y-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <>
                  {/* Stats Grid */}
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-card rounded-2xl p-5 shadow-soft">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-muted-foreground text-sm">Bokningar i dec</span>
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <p className="font-serif text-3xl text-foreground">{upcomingBookings.length}</p>
                      <p className="text-xs text-primary mt-1">+3 sedan förra månaden</p>
                    </div>
                    
                    <div className="bg-card rounded-2xl p-5 shadow-soft">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-muted-foreground text-sm">Betyg</span>
                        <Star className="w-5 h-5 text-accent fill-accent" />
                      </div>
                      <p className="font-serif text-3xl text-foreground">{averageRating}</p>
                      <p className="text-xs text-muted-foreground mt-1">Baserat på {totalReviews} omdömen</p>
                    </div>
                    
                    <div className="bg-card rounded-2xl p-5 shadow-soft">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-muted-foreground text-sm">Intjänat i dec</span>
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                      <p className="font-serif text-3xl text-foreground">14 850 kr</p>
                      <p className="text-xs text-primary mt-1">+22% vs förra året</p>
                    </div>
                    
                    <div className="bg-card rounded-2xl p-5 shadow-soft">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-muted-foreground text-sm">Tillgängligt</span>
                        <Wallet className="w-5 h-5 text-accent" />
                      </div>
                      <p className="font-serif text-3xl text-foreground">8 200 kr</p>
                      <Button variant="outline" size="sm" className="mt-2 w-full">
                        Ta ut
                      </Button>
                    </div>
                  </div>

                  {/* Today's Schedule (if any) */}
                  {todaysBookings.length > 0 && (
                    <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-accent" />
                        <h2 className="font-serif text-2xl text-foreground">Dagens schema</h2>
                      </div>
                      <div className="space-y-3">
                        {todaysBookings
                          .sort((a, b) => a.time.localeCompare(b.time))
                          .map((booking) => (
                            <div 
                              key={booking.id}
                              className="flex items-center gap-4 p-4 bg-background rounded-xl"
                            >
                              <div className="font-serif text-2xl text-accent w-16">
                                {booking.time}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-foreground">{booking.customerName}</p>
                                <p className="text-sm text-muted-foreground">{booking.city} • {booking.duration} min</p>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => toggleBookingDetails(booking.id)}>
                                Detaljer
                              </Button>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Upcoming Bookings */}
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-serif text-2xl text-foreground">Kommande uppdrag</h2>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("calendar")}>
                        Visa kalender
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>

                    {upcomingBookings.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingBookings.map((booking) => (
                          <BookingCard key={booking.id} booking={booking} />
                        ))}
                      </div>
                    ) : (
                      <EmptyState />
                    )}
                  </div>

                  {/* Recent Reviews */}
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-serif text-2xl text-foreground">Senaste omdömen</h2>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("reviews")}>
                        Visa alla
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {recentReviews.slice(0, 2).map((review) => (
                        <div key={review.id} className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-foreground">{review.author}</span>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i}
                                  className={cn(
                                    "w-4 h-4",
                                    i < review.rating ? "text-accent fill-accent" : "text-muted"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground">{review.text}</p>
                          <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Calendar Tab */}
              {activeTab === "calendar" && (
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <h2 className="font-serif text-2xl text-foreground mb-6">Kalender & tillgänglighet</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* December Calendar Mock */}
                    <div>
                      <h3 className="font-medium text-foreground mb-4">December 2024</h3>
                      <div className="grid grid-cols-7 gap-2">
                        {["Må", "Ti", "On", "To", "Fr", "Lö", "Sö"].map((day) => (
                          <div key={day} className="text-center text-sm text-muted-foreground py-2">
                            {day}
                          </div>
                        ))}
                        {[...Array(31)].map((_, i) => {
                          const day = i + 1;
                          const hasBooking = [14, 15, 20, 24].includes(day);
                          const isToday = day === 9;
                          return (
                            <button
                              key={i}
                              className={cn(
                                "aspect-square rounded-lg flex items-center justify-center text-sm transition-colors relative",
                                isToday && "ring-2 ring-primary",
                                hasBooking && "bg-primary text-primary-foreground",
                                !hasBooking && !isToday && "hover:bg-muted"
                              )}
                            >
                              {day}
                              {hasBooking && (
                                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-accent" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Availability Settings */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-foreground">Tillgängliga tider 24 december</h3>
                      <p className="text-sm text-muted-foreground">
                        Ange vilka tider du kan ta emot bokningar på julafton.
                      </p>
                      
                      <div className="space-y-2">
                        {["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((time) => {
                          const booked = ["14:00", "16:00"].includes(time);
                          return (
                            <div
                              key={time}
                              className={cn(
                                "flex items-center justify-between p-3 rounded-lg",
                                booked ? "bg-primary/10" : "bg-muted/30"
                              )}
                            >
                              <span className="font-medium text-foreground">{time}</span>
                              {booked ? (
                                <span className="text-sm text-primary">Bokad</span>
                              ) : (
                                <Button variant="outline" size="sm">Lägg till</Button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <h2 className="font-serif text-2xl text-foreground mb-6">Notiser</h2>
                  
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "flex items-start gap-4 p-4 rounded-xl transition-colors",
                          notification.unread ? "bg-primary/5 border border-primary/20" : "bg-muted/30"
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                          notification.type === "booking" && "bg-primary/10",
                          notification.type === "message" && "bg-accent/10",
                          notification.type === "review" && "bg-accent/10"
                        )}>
                          {notification.type === "booking" && <Calendar className="w-5 h-5 text-primary" />}
                          {notification.type === "message" && <MessageCircle className="w-5 h-5 text-accent" />}
                          {notification.type === "review" && <Star className="w-5 h-5 text-accent fill-accent" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-foreground">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                        {notification.unread && (
                          <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl text-foreground">Omdömen</h2>
                    <div className="flex items-center gap-2">
                      <Star className="w-6 h-6 text-accent fill-accent" />
                      <span className="font-serif text-2xl text-foreground">{averageRating}</span>
                      <span className="text-muted-foreground">({totalReviews} omdömen)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {recentReviews.map((review) => (
                      <div key={review.id} className="border-b border-border/50 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground">{review.author}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={cn(
                                  "w-4 h-4",
                                  i < review.rating ? "text-accent fill-accent" : "text-muted"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.text}</p>
                        <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Earnings Tab */}
              {activeTab === "earnings" && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-card rounded-2xl p-6 shadow-soft">
                      <h3 className="text-muted-foreground text-sm mb-2">Intjänat denna månad</h3>
                      <p className="font-serif text-3xl text-foreground">14 850 kr</p>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-soft">
                      <h3 className="text-muted-foreground text-sm mb-2">Utbetalat</h3>
                      <p className="font-serif text-3xl text-foreground">6 650 kr</p>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-soft">
                      <h3 className="text-muted-foreground text-sm mb-2">Tillgängligt för uttag</h3>
                      <p className="font-serif text-3xl text-accent">8 200 kr</p>
                      <Button variant="hero" size="sm" className="mt-3 w-full">
                        Ta ut pengar
                      </Button>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <h3 className="font-serif text-xl text-foreground mb-4">Transaktionshistorik</h3>
                    <div className="space-y-3">
                      {[
                        { date: "15 dec", desc: "Bokning - Familjen Svensson", amount: "+1 350 kr" },
                        { date: "14 dec", desc: "Uttag till bankkonto", amount: "-3 000 kr" },
                        { date: "12 dec", desc: "Bokning - Familjen Johansson", amount: "+900 kr" },
                        { date: "10 dec", desc: "Bokning - Familjen Pettersson", amount: "+1 800 kr" },
                      ].map((tx, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{tx.desc}</p>
                            <p className="text-sm text-muted-foreground">{tx.date}</p>
                          </div>
                          <span className={cn(
                            "font-medium",
                            tx.amount.startsWith("+") ? "text-primary" : "text-foreground"
                          )}>
                            {tx.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <h3 className="font-serif text-xl text-foreground mb-6">Profilinställningar</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Visningsnamn
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                          defaultValue="Tomte Erik"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Pris per 15 min
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"
                          defaultValue="450"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Beskrivning
                      </label>
                      <textarea
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground min-h-[120px]"
                        defaultValue="Erfaren tomte med över 10 års erfarenhet av att sprida julglädje..."
                      />
                    </div>
                    <Button variant="hero" className="mt-6">
                      Spara ändringar
                    </Button>
                  </div>

                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <h3 className="font-serif text-xl text-foreground mb-4">Utbetalningsinställningar</h3>
                    <div className="p-4 bg-muted/30 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Nordea ****1234</p>
                          <p className="text-sm text-muted-foreground">Kopplat bankkonto</p>
                        </div>
                        <Button variant="outline" size="sm">Ändra</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SantaDashboard;

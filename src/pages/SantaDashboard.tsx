import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  MapPin,
  Wallet,
  TrendingUp,
  BadgeCheck
} from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

// Mock data for santa dashboard
const upcomingBookings = [
  {
    id: "1",
    customerName: "Familjen Andersson",
    date: "24 december 2024",
    time: "14:00",
    duration: 30,
    address: "Storgatan 15, Stockholm",
    children: 2,
    totalPrice: 900,
    status: "confirmed"
  },
  {
    id: "2",
    customerName: "Familjen Lindqvist",
    date: "24 december 2024",
    time: "16:00",
    duration: 45,
    address: "Kungsgatan 22, Stockholm",
    children: 3,
    totalPrice: 1350,
    status: "pending"
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
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const tabs = [
    { id: "overview" as TabType, label: "Översikt", icon: User },
    { id: "calendar" as TabType, label: "Kalender", icon: Calendar },
    { id: "notifications" as TabType, label: "Notiser", icon: Bell, badge: 2 },
    { id: "reviews" as TabType, label: "Omdömen", icon: Star },
    { id: "earnings" as TabType, label: "Inkomster", icon: Wallet },
    { id: "settings" as TabType, label: "Inställningar", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground">
                Min <span className="text-gradient-gold">tomtesida</span>
              </h1>
              <p className="text-muted-foreground mt-1">Välkommen tillbaka, Tomte Erik!</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <BadgeCheck className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Verifierad tomte</span>
              </div>
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
                      <p className="font-serif text-3xl text-foreground">12</p>
                      <p className="text-xs text-primary mt-1">+3 sedan förra månaden</p>
                    </div>
                    
                    <div className="bg-card rounded-2xl p-5 shadow-soft">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-muted-foreground text-sm">Betyg</span>
                        <Star className="w-5 h-5 text-accent fill-accent" />
                      </div>
                      <p className="font-serif text-3xl text-foreground">4.9</p>
                      <p className="text-xs text-muted-foreground mt-1">Baserat på 47 omdömen</p>
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

                  {/* Upcoming Bookings */}
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-serif text-2xl text-foreground">Kommande bokningar</h2>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("calendar")}>
                        Visa alla
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {upcomingBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-muted/30 rounded-xl gap-4"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium text-foreground">{booking.customerName}</h3>
                              {booking.status === "pending" && (
                                <span className="px-2 py-0.5 bg-accent/20 text-accent rounded-full text-xs font-medium">
                                  Väntar på bekräftelse
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {booking.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {booking.time} ({booking.duration} min)
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {booking.address}
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
                              <Button variant="outline" size="sm">
                                <MessageCircle className="w-4 h-4" />
                                Chatta
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
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
                          notification.type === "booking" && "bg-primary/10 text-primary",
                          notification.type === "message" && "bg-accent/10 text-accent",
                          notification.type === "review" && "bg-accent/10 text-accent"
                        )}>
                          {notification.type === "booking" && <Calendar className="w-5 h-5" />}
                          {notification.type === "message" && <MessageCircle className="w-5 h-5" />}
                          {notification.type === "review" && <Star className="w-5 h-5" />}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-foreground">{notification.title}</h3>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-muted-foreground text-sm mt-1">{notification.message}</p>
                        </div>
                        
                        {notification.unread && (
                          <div className="w-2 h-2 rounded-full bg-secondary flex-shrink-0 mt-2" />
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
                    <h2 className="font-serif text-2xl text-foreground">Alla omdömen</h2>
                    <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
                      <Star className="w-5 h-5 text-accent fill-accent" />
                      <span className="font-serif text-xl text-foreground">4.9</span>
                      <span className="text-muted-foreground text-sm">(47 omdömen)</span>
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
                  {/* Earnings Overview */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-card rounded-2xl p-6 shadow-soft">
                      <h3 className="text-muted-foreground text-sm mb-2">Totalt intjänat</h3>
                      <p className="font-serif text-3xl text-foreground">14 850 kr</p>
                      <p className="text-xs text-muted-foreground mt-1">December 2024</p>
                    </div>
                    
                    <div className="bg-card rounded-2xl p-6 shadow-soft">
                      <h3 className="text-muted-foreground text-sm mb-2">Reserverat</h3>
                      <p className="font-serif text-3xl text-foreground">6 650 kr</p>
                      <p className="text-xs text-muted-foreground mt-1">Väntar på genomförda besök</p>
                    </div>
                    
                    <div className="bg-card rounded-2xl p-6 shadow-soft">
                      <h3 className="text-muted-foreground text-sm mb-2">Tillgängligt att ta ut</h3>
                      <p className="font-serif text-3xl text-foreground">8 200 kr</p>
                      <Button variant="hero" size="sm" className="mt-2 w-full">
                        <CreditCard className="w-4 h-4" />
                        Ta ut till bankkonto
                      </Button>
                    </div>
                  </div>

                  {/* Transaction History */}
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <h2 className="font-serif text-2xl text-foreground mb-6">Transaktionshistorik</h2>
                    
                    <div className="space-y-3">
                      {[
                        { date: "15 dec", desc: "Bokning - Familjen Svensson", amount: 900, type: "income" },
                        { date: "14 dec", desc: "Bokning - Familjen Ek", amount: 1350, type: "income" },
                        { date: "12 dec", desc: "Utbetalning till bankkonto", amount: -5000, type: "withdrawal" },
                        { date: "10 dec", desc: "Bokning - Familjen Berg", amount: 900, type: "income" },
                      ].map((transaction, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                          <div>
                            <p className="font-medium text-foreground">{transaction.desc}</p>
                            <p className="text-sm text-muted-foreground">{transaction.date}</p>
                          </div>
                          <span className={cn(
                            "font-serif text-lg",
                            transaction.type === "income" ? "text-primary" : "text-muted-foreground"
                          )}>
                            {transaction.type === "income" ? "+" : ""}{transaction.amount} kr
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
                  {/* Profile Settings */}
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <h2 className="font-serif text-2xl text-foreground mb-6">Profilinställningar</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Pris per 15 min</label>
                          <Input defaultValue="450" className="bg-background" />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Bio</label>
                          <Textarea 
                            defaultValue="Jag har arbetat som tomte i över 10 år och älskar att skapa magiska ögonblick för barn. Min specialitet är att skapa en lugn, varm stämning där varje barn känner sig sedd."
                            className="bg-background resize-none"
                            rows={4}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Erfarenhet</label>
                          <Input defaultValue="10+ års erfarenhet" className="bg-background" />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Max avstånd (km)</label>
                          <Input defaultValue="25" type="number" className="bg-background" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-border">
                      <Button variant="hero">
                        Spara ändringar
                      </Button>
                    </div>
                  </div>

                  {/* Photos */}
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <h2 className="font-serif text-2xl text-foreground mb-6">Profilbilder</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Porträttbild</label>
                        <div className="aspect-square bg-muted rounded-xl flex items-center justify-center overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                            alt="Porträtt"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button variant="outline" className="w-full mt-3">Byt bild</Button>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">I tomtedräkt</label>
                        <div className="aspect-square bg-muted rounded-xl flex items-center justify-center overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1545996124-0501ebae84d0?w=400&h=400&fit=crop"
                            alt="I tomtedräkt"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button variant="outline" className="w-full mt-3">Byt bild</Button>
                      </div>
                    </div>
                  </div>

                  {/* Payment Settings */}
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <h2 className="font-serif text-2xl text-foreground mb-6">Betalningsuppgifter</h2>
                    
                    <div className="p-4 bg-muted/30 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">Bankkonto ****4521</p>
                          <p className="text-sm text-muted-foreground">Swedbank</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Ändra</Button>
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
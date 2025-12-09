import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  MessageCircle, 
  Edit2, 
  CheckCircle, 
  XCircle, 
  Send,
  User,
  Heart,
  Settings,
  Bell,
  Gift,
  Star,
  ChevronRight,
  Mail,
  Phone,
  Save,
  LogOut
} from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import { mockBookings } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const statusConfig = {
  upcoming: {
    label: "Kommande",
    color: "bg-accent/10 text-accent",
    icon: Calendar,
  },
  completed: {
    label: "Genomförd",
    color: "bg-primary/10 text-primary",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Avbokad",
    color: "bg-destructive/10 text-destructive",
    icon: XCircle,
  },
};

type TabType = "bookings" | "favorites" | "settings";

const UserDashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("settings");
  const [activeBookingTab, setActiveBookingTab] = useState<"upcoming" | "completed">("upcoming");
  const [chatMessage, setChatMessage] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<string | null>(mockBookings[0]?.id || null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  // Load user data
  useEffect(() => {
    if (user) {
      setUserData({
        name: user.user_metadata?.full_name || "",
        email: user.email || "",
        phone: ""
      });
      
      // Fetch profile data
      const fetchProfile = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (data) {
          setUserData({
            name: data.full_name || user.user_metadata?.full_name || "",
            email: data.email || user.email || "",
            phone: data.phone || ""
          });
        }
      };
      
      fetchProfile();
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: userData.name,
          phone: userData.phone
        })
        .eq('user_id', user.id);

      if (error) throw error;
      
      setIsEditingProfile(false);
      toast.success("Dina uppgifter har sparats!");
    } catch (error) {
      toast.error("Kunde inte spara uppgifterna");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const filteredBookings = mockBookings.filter((booking) => {
    if (activeBookingTab === "upcoming") return booking.status === "upcoming";
    return booking.status === "completed" || booking.status === "cancelled";
  });

  const currentBooking = mockBookings.find((b) => b.id === selectedBooking);

  const tabs = [
    { id: "bookings" as TabType, label: "Mina bokningar", icon: Calendar },
    { id: "favorites" as TabType, label: "Favoriter", icon: Heart },
    { id: "settings" as TabType, label: "Inställningar", icon: Settings },
  ];

  const favoriteSantas = [
    {
      id: "1",
      name: "Tomte Erik",
      location: "Södermalm, Stockholm",
      rating: 4.9,
      reviews: 47,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
    },
    {
      id: "2",
      name: "Tomte Göran",
      location: "Vasastan, Stockholm",
      rating: 4.8,
      reviews: 32,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground">
                Välkommen, <span className="text-gradient-gold">{userData.name.split(' ')[0] || 'användare'}!</span>
              </h1>
              <p className="text-muted-foreground mt-1">Hantera dina bokningar och upplevelser</p>
            </div>
            <Link to="/sok">
              <Button variant="hero">
                <Gift className="w-5 h-5" />
                Boka ny tomte
              </Button>
            </Link>
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
                          "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                          activeTab === tab.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted text-foreground"
                        )}
                      >
                        <tab.icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    </li>
                  ))}
                  <li className="pt-2 border-t border-border mt-2">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-destructive/10 text-destructive"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logga ut</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-4">
              {/* Bookings Tab */}
              {activeTab === "bookings" && (
                <div className="space-y-6">
                  <div className="flex gap-2">
                    <Button
                      variant={activeBookingTab === "upcoming" ? "default" : "outline"}
                      onClick={() => setActiveBookingTab("upcoming")}
                    >
                      Kommande
                    </Button>
                    <Button
                      variant={activeBookingTab === "completed" ? "default" : "outline"}
                      onClick={() => setActiveBookingTab("completed")}
                    >
                      Tidigare
                    </Button>
                  </div>

                  {filteredBookings.length === 0 ? (
                    <div className="bg-card rounded-2xl p-12 text-center shadow-soft">
                      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h2 className="font-serif text-2xl text-foreground mb-2">Inga bokningar</h2>
                      <p className="text-muted-foreground mb-6">
                        {activeBookingTab === "upcoming" 
                          ? "Du har inga kommande bokningar ännu."
                          : "Du har inga tidigare bokningar."}
                      </p>
                      <Link to="/sok">
                        <Button variant="hero">
                          Boka en tomte
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid lg:grid-cols-5 gap-6">
                      <div className="lg:col-span-2 space-y-4">
                        {filteredBookings.map((booking) => {
                          const status = statusConfig[booking.status];
                          return (
                            <button
                              key={booking.id}
                              onClick={() => setSelectedBooking(booking.id)}
                              className={cn(
                                "w-full bg-card rounded-2xl p-5 shadow-soft text-left transition-all hover:shadow-lg",
                                selectedBooking === booking.id && "ring-2 ring-primary"
                              )}
                            >
                              <div className="flex items-start gap-4">
                                <img
                                  src={booking.santaImage}
                                  alt={booking.santaName}
                                  className="w-14 h-14 rounded-xl object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-serif text-lg text-foreground truncate">
                                      {booking.santaName}
                                    </h3>
                                    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", status.color)}>
                                      {status.label}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{booking.date}</span>
                                    <span className="mx-1">•</span>
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{booking.time}</span>
                                  </div>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {currentBooking && (
                        <div className="lg:col-span-3 space-y-6">
                          <div className="bg-card rounded-2xl p-6 shadow-soft">
                            <div className="flex items-start justify-between mb-6">
                              <div className="flex items-center gap-4">
                                <img
                                  src={currentBooking.santaImage}
                                  alt={currentBooking.santaName}
                                  className="w-16 h-16 rounded-xl object-cover"
                                />
                                <div>
                                  <h2 className="font-serif text-2xl text-foreground">
                                    {currentBooking.santaName}
                                  </h2>
                                  <span className={cn(
                                    "px-2 py-1 rounded-full text-xs font-medium",
                                    statusConfig[currentBooking.status].color
                                  )}>
                                    {statusConfig[currentBooking.status].label}
                                  </span>
                                </div>
                              </div>
                              {currentBooking.status === "upcoming" && (
                                <Button variant="outline" size="sm">
                                  <Edit2 className="w-4 h-4" />
                                  Ändra
                                </Button>
                              )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <h3 className="font-medium text-foreground mb-2">Datum & tid</h3>
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span>{currentBooking.date} kl {currentBooking.time}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{currentBooking.duration} minuters besök</span>
                                  </div>
                                </div>

                                <div>
                                  <h3 className="font-medium text-foreground mb-2">Adress</h3>
                                  <div className="flex items-start gap-2 text-muted-foreground">
                                    <MapPin className="w-4 h-4 mt-0.5" />
                                    <span>{currentBooking.address}</span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h3 className="font-medium text-foreground mb-2">Barn</h3>
                                <div className="space-y-2">
                                  {currentBooking.children.map((child, i) => (
                                    <div key={i} className="p-3 bg-muted/30 rounded-lg">
                                      <p className="font-medium text-foreground">
                                        {child.name}, {child.age}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        Presenter: {child.gifts}
                                      </p>
                                      {child.specialInfo && (
                                        <p className="text-sm text-muted-foreground">
                                          Info: {child.specialInfo}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                              <span className="text-muted-foreground">Totalt belopp</span>
                              <span className="font-serif text-2xl text-foreground">{currentBooking.totalPrice} kr</span>
                            </div>
                          </div>

                          {currentBooking.status === "upcoming" && (
                            <div className="bg-card rounded-2xl p-6 shadow-soft">
                              <div className="flex items-center gap-2 mb-4">
                                <MessageCircle className="w-5 h-5 text-primary" />
                                <h3 className="font-serif text-xl text-foreground">Chatta med tomten</h3>
                              </div>

                              <div className="bg-muted/30 rounded-xl p-4 h-48 mb-4 overflow-y-auto">
                                <p className="text-center text-muted-foreground text-sm">
                                  Inga meddelanden ännu. Skriv till tomten om du har frågor!
                                </p>
                              </div>

                              <div className="flex gap-2">
                                <Textarea
                                  placeholder="Skriv ett meddelande..."
                                  value={chatMessage}
                                  onChange={(e) => setChatMessage(e.target.value)}
                                  className="bg-background resize-none"
                                  rows={2}
                                />
                                <Button variant="hero" size="icon" className="h-auto">
                                  <Send className="w-5 h-5" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === "favorites" && (
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <h2 className="font-serif text-2xl text-foreground mb-6">Dina favorittomtar</h2>
                  
                  {favoriteSantas.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-serif text-xl text-foreground mb-2">Inga favoriter ännu</h3>
                      <p className="text-muted-foreground mb-6">
                        Spara dina favorittomtar för snabb åtkomst.
                      </p>
                      <Link to="/sok">
                        <Button variant="hero">
                          Utforska tomtar
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {favoriteSantas.map((santa) => (
                        <div key={santa.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                          <img
                            src={santa.image}
                            alt={santa.name}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-serif text-lg text-foreground">{santa.name}</h3>
                            <p className="text-sm text-muted-foreground">{santa.location}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-4 h-4 text-accent fill-accent" />
                              <span className="text-sm text-foreground">{santa.rating}</span>
                              <span className="text-sm text-muted-foreground">({santa.reviews})</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Link to={`/tomte/${santa.id}`}>
                              <Button variant="outline" size="sm">
                                Visa profil
                                <ChevronRight className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button variant="ghost" size="sm">
                              <Heart className="w-4 h-4 fill-secondary text-secondary" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  {/* Quick Links */}
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <h2 className="font-serif text-2xl text-foreground mb-4">Genvägar</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Link 
                        to="/mina-bokningar"
                        className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">Mina bokningar</p>
                          <p className="text-sm text-muted-foreground">Se alla kommande och tidigare bokningar</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                      <Link 
                        to="/sok"
                        className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                          <Gift className="w-6 h-6 text-accent" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground group-hover:text-accent transition-colors">Boka ny tomte</p>
                          <p className="text-sm text-muted-foreground">Sök bland våra verifierade tomtar</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                      </Link>
                    </div>
                  </div>

                  {/* Profile Settings */}
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-serif text-2xl text-foreground">Kontaktuppgifter</h2>
                      {!isEditingProfile ? (
                        <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)}>
                          <Edit2 className="w-4 h-4" />
                          Redigera
                        </Button>
                      ) : (
                        <Button 
                          variant="hero" 
                          size="sm" 
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          ) : (
                            <Save className="w-4 h-4" />
                          )}
                          Spara
                        </Button>
                      )}
                    </div>
                    
                    {isEditingProfile ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Namn</Label>
                          <Input
                            id="name"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">E-postadress</Label>
                          <Input
                            id="email"
                            type="email"
                            value={userData.email}
                            disabled
                            className="bg-background opacity-50"
                          />
                          <p className="text-xs text-muted-foreground">E-postadressen kan inte ändras</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefonnummer</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={userData.phone}
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                            className="bg-background"
                            placeholder="070-123 45 67"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                          <User className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Namn</p>
                            <p className="font-medium text-foreground">{userData.name || "Ej angivet"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                          <Mail className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">E-post</p>
                            <p className="font-medium text-foreground">{userData.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                          <Phone className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Telefon</p>
                            <p className="font-medium text-foreground">{userData.phone || "Ej angivet"}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Other Settings */}
                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <h2 className="font-serif text-2xl text-foreground mb-6">Övriga inställningar</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-foreground">Notiser</p>
                            <p className="text-sm text-muted-foreground">E-post och push-notiser</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Hantera</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-foreground">Sparade adresser</p>
                            <p className="text-sm text-muted-foreground">Hem och andra leveransadresser</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Hantera</Button>
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

export default UserDashboard;

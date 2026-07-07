import { useState, useEffect, useCallback } from "react";
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
  Sparkles,
  Loader2
} from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import PullToRefresh from "@/components/PullToRefresh";
import { SkeletonList, SkeletonCard } from "@/components/ui/skeleton-card";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BookingChild {
  id: string;
  name: string;
  age: string;
  gifts: string | null;
  special_info: string | null;
}

interface Booking {
  id: string;
  date: string;
  time: string;
  duration: number;
  address: string;
  city: string | null;
  postal_code: string | null;
  instructions: string | null;
  total_price: number;
  status: string;
  santa_name: string;
  santa_image: string | null;
  user_id: string;
  children?: BookingChild[];
}

type TabType = "overview" | "calendar" | "notifications" | "reviews" | "earnings" | "settings";

const SantaDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [expandedBookingId, setExpandedBookingId] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingBookingId, setUpdatingBookingId] = useState<string | null>(null);

  // Profile status from santa_applications table
  const [isVerified, setIsVerified] = useState(false);

  // Load verification status from the santa's application
  useEffect(() => {
    if (!user) return;

    const fetchApplication = async () => {
      const { data, error } = await supabase
        .from('santa_applications')
        .select('bankid_verified, status')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching application:', error);
        return;
      }

      setIsVerified(Boolean(data?.bankid_verified && data?.status === 'approved'));
    };

    fetchApplication();
  }, [user]);

  // Fetch bookings assigned to this Santa
  const fetchBookings = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('santa_user_id', user.id)
        .order('date', { ascending: true })
        .order('time', { ascending: true });

      if (bookingsError) throw bookingsError;

      // Fetch children for each booking
      const bookingsWithChildren = await Promise.all(
        (bookingsData || []).map(async (booking) => {
          const { data: childrenData } = await supabase
            .from('booking_children')
            .select('*')
            .eq('booking_id', booking.id);
          
          return {
            ...booking,
            children: childrenData || []
          };
        })
      );

      setBookings(bookingsWithChildren);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Kunde inte hämta bokningar');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleRefresh = async () => {
    await fetchBookings();
  };

  // Get today's date for "Dagens schema"
  const today = new Date().toISOString().split('T')[0];
  const todaysBookings = bookings.filter(b => b.date === today);
  const upcomingBookings = bookings.filter(b => b.date >= today && b.status !== 'declined');
  const pendingBookings = bookings.filter(b => b.status === 'pending');

  const tabs = [
    { id: "overview" as TabType, label: "Översikt", icon: User },
    { id: "calendar" as TabType, label: "Kalender", icon: Calendar },
    { id: "notifications" as TabType, label: "Notiser", icon: Bell, badge: pendingBookings.length > 0 ? pendingBookings.length : undefined },
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

  const handleAcceptBooking = async (bookingId: string) => {
    setUpdatingBookingId(bookingId);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'confirmed' })
        .eq('id', bookingId);

      if (error) throw error;

      // Update local state
      setBookings(prev => prev.map(b => 
        b.id === bookingId ? { ...b, status: 'confirmed' } : b
      ));

      toast.success('Bokning accepterad!', {
        description: 'Familjen får nu en bekräftelse.'
      });
    } catch (error) {
      console.error('Error accepting booking:', error);
      toast.error('Kunde inte acceptera bokningen');
    } finally {
      setUpdatingBookingId(null);
    }
  };

  const handleDeclineBooking = async (bookingId: string) => {
    setUpdatingBookingId(bookingId);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'declined' })
        .eq('id', bookingId);

      if (error) throw error;

      // Update local state
      setBookings(prev => prev.map(b => 
        b.id === bookingId ? { ...b, status: 'declined' } : b
      ));

      toast.success('Bokning nekad', {
        description: 'Familjen meddelas om att hitta en annan tomte.'
      });
    } catch (error) {
      console.error('Error declining booking:', error);
      toast.error('Kunde inte neka bokningen');
    } finally {
      setUpdatingBookingId(null);
    }
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
      case "declined":
        return (
          <span className="px-2 py-1 bg-destructive/20 text-destructive rounded-full text-xs font-medium">
            Nekad
          </span>
        );
      case "completed":
        return (
          <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
            Genomförd
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
            {status}
          </span>
        );
    }
  };

  // Empty state component - PRELAUNCH version
  const EmptyState = () => (
    <div className="bg-card rounded-2xl p-12 shadow-soft text-center">
      <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
        <Sparkles className="w-10 h-10 text-accent" />
      </div>
      <h3 className="font-serif text-2xl text-foreground mb-3">
        Status: <span className="text-gradient-gold">Förbereds för julen 2026</span>
      </h3>
      <p className="text-muted-foreground max-w-lg mx-auto mb-6 leading-relaxed">
        Din tomteprofil är registrerad. Under 2025–2026 kommer vi att:
      </p>
      <ul className="text-muted-foreground max-w-md mx-auto mb-6 text-left space-y-2">
        <li className="flex items-start gap-2">
          <span className="text-accent">–</span>
          <span>verifiera tomtar</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-accent">–</span>
          <span>testa plattformen</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-accent">–</span>
          <span>förbereda marknadsföring</span>
        </li>
      </ul>
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6 max-w-md mx-auto">
        <p className="text-sm text-primary font-medium">
          📧 Du får mejl från oss när det är dags att gå live och börja ta emot bokningar.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/bli-tomte">
          <Button variant="hero" className="gap-2">
            <User className="w-4 h-4" />
            Redigera min profil
          </Button>
        </Link>
        <Button variant="outline" onClick={() => setActiveTab("settings")} className="gap-2">
          <Settings className="w-4 h-4" />
          Inställningar
        </Button>
      </div>
    </div>
  );

  // Booking card component
  const BookingCard = ({ booking }: { booking: Booking }) => {
    const isExpanded = expandedBookingId === booking.id;
    const isUpdating = updatingBookingId === booking.id;
    const isPending = booking.status === 'pending';
    const isDeclined = booking.status === 'declined';
    
    return (
      <div className={cn(
        "bg-muted/30 rounded-xl overflow-hidden transition-opacity",
        isDeclined && "opacity-60"
      )}>
        {/* Main booking info */}
        <div className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium text-foreground">Bokning #{booking.id.slice(0, 8)}</h3>
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
                {booking.city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {booking.city}
                  </span>
                )}
                {booking.children && booking.children.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {booking.children.length} {booking.children.length === 1 ? 'barn' : 'barn'}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="font-serif text-lg text-foreground">{booking.total_price} kr</span>
              {isPending ? (
                <div className="flex gap-2">
                  <Button 
                    variant="hero" 
                    size="sm"
                    onClick={() => handleAcceptBooking(booking.id)}
                    disabled={isUpdating}
                    className="gap-1"
                  >
                    {isUpdating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4" />
                    )}
                    Acceptera
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeclineBooking(booking.id)}
                    disabled={isUpdating}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : !isDeclined ? (
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
              ) : null}
            </div>
          </div>
        </div>

        {/* Expanded details */}
        {isExpanded && !isDeclined && (
          <div className="border-t border-border/50 p-4 bg-background/50 space-y-4">
            {/* Address */}
            <div>
              <h4 className="font-medium text-foreground mb-1 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Adress
              </h4>
              <p className="text-muted-foreground ml-6">
                {booking.address}
                {booking.postal_code && `, ${booking.postal_code}`}
                {booking.city && ` ${booking.city}`}
              </p>
            </div>

            {/* Children */}
            {booking.children && booking.children.length > 0 && (
              <div>
                <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-primary" />
                  Barn
                </h4>
                <div className="ml-6 space-y-2">
                  {booking.children.map((child) => (
                    <div key={child.id} className="bg-muted/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">{child.name}</span>
                        <span className="text-sm text-muted-foreground">({child.age})</span>
                      </div>
                      {child.gifts && (
                        <p className="text-sm text-muted-foreground">
                          <span className="text-accent">Önskar:</span> {child.gifts}
                        </p>
                      )}
                      {child.special_info && (
                        <p className="text-sm text-muted-foreground mt-1">
                          <span className="text-primary">Info:</span> {child.special_info}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

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
      
      <PullToRefresh onRefresh={handleRefresh}>
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground">
                Tomtens <span className="text-gradient-gold">dashboard</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Din profil är registrerad och blir synlig för familjer inför julen 2026.
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
                              : "bg-accent text-accent-foreground"
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
                      <span className="text-muted-foreground">Inga omdömen ännu</span>
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
              {/* Loading state */}
              {loading && (
                <div className="bg-card rounded-2xl p-12 shadow-soft flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              )}

              {/* Overview Tab */}
              {!loading && activeTab === "overview" && (
                <>
                  {/* Stats Grid */}
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="bg-card rounded-2xl p-5 shadow-soft">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-muted-foreground text-sm">Bokningar</span>
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <p className="font-serif text-3xl text-foreground">{upcomingBookings.length}</p>
                      <p className="text-xs text-muted-foreground mt-1">Kommande uppdrag</p>
                    </div>
                    
                    <div className="bg-card rounded-2xl p-5 shadow-soft">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-muted-foreground text-sm">Betyg</span>
                        <Star className="w-5 h-5 text-accent fill-accent" />
                      </div>
                      <p className="font-serif text-3xl text-foreground">–</p>
                      <p className="text-xs text-muted-foreground mt-1">Inga omdömen ännu</p>
                    </div>
                    
                    <div className="bg-card rounded-2xl p-5 shadow-soft">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-muted-foreground text-sm">Intjänat</span>
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                      <p className="font-serif text-3xl text-foreground">
                        {upcomingBookings.reduce((sum, b) => sum + b.total_price, 0)} kr
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Från bekräftade bokningar</p>
                    </div>
                    
                    <div className="bg-card rounded-2xl p-5 shadow-soft">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-muted-foreground text-sm">Väntande</span>
                        <Bell className="w-5 h-5 text-accent" />
                      </div>
                      <p className="font-serif text-3xl text-foreground">{pendingBookings.length}</p>
                      <p className="text-xs text-accent mt-1">Kräver åtgärd</p>
                    </div>
                  </div>

                  {/* Pending bookings alert */}
                  {pendingBookings.length > 0 && (
                    <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Bell className="w-5 h-5 text-accent" />
                        <h2 className="font-serif text-2xl text-foreground">
                          {pendingBookings.length} {pendingBookings.length === 1 ? 'bokning väntar' : 'bokningar väntar'} på svar
                        </h2>
                      </div>
                      <div className="space-y-3">
                        {pendingBookings.map((booking) => (
                          <BookingCard key={booking.id} booking={booking} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Today's Schedule (if any) */}
                  {todaysBookings.length > 0 && (
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-primary" />
                        <h2 className="font-serif text-2xl text-foreground">Dagens schema</h2>
                      </div>
                      <div className="space-y-3">
                        {todaysBookings
                          .filter(b => b.status !== 'declined')
                          .sort((a, b) => a.time.localeCompare(b.time))
                          .map((booking) => (
                            <div 
                              key={booking.id}
                              className="flex items-center gap-4 p-4 bg-background rounded-xl"
                            >
                              <div className="font-serif text-2xl text-primary w-16">
                                {booking.time}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-foreground">Bokning #{booking.id.slice(0, 8)}</p>
                                <p className="text-sm text-muted-foreground">{booking.city || 'Ej angivet'} • {booking.duration} min</p>
                              </div>
                              {getStatusBadge(booking.status)}
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

                    {upcomingBookings.filter(b => b.status !== 'pending').length > 0 ? (
                      <div className="space-y-4">
                        {upcomingBookings
                          .filter(b => b.status !== 'pending')
                          .map((booking) => (
                            <BookingCard key={booking.id} booking={booking} />
                          ))}
                      </div>
                    ) : pendingBookings.length === 0 ? (
                      <EmptyState />
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        Du har inga bekräftade bokningar ännu. Acceptera väntande bokningar ovan.
                      </p>
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

                    <div className="text-center py-8">
                      <Star className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">
                        Inga omdömen ännu. Omdömen visas här efter dina första besök.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Calendar Tab */}
              {!loading && activeTab === "calendar" && (
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
                          const dayStr = `2024-12-${day.toString().padStart(2, '0')}`;
                          const hasBooking = bookings.some(b => b.date === dayStr && b.status !== 'declined');
                          const isToday = day === new Date().getDate() && new Date().getMonth() === 11;
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
                          const booked = bookings.some(
                            b => b.date === '2024-12-24' && b.time === time && b.status !== 'declined'
                          );
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
              {!loading && activeTab === "notifications" && (
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <h2 className="font-serif text-2xl text-foreground mb-6">Notiser</h2>

                  <div className="text-center py-8">
                    <Bell className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      Inga notiser. Här ser du nya bokningar, meddelanden och omdömen.
                    </p>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {!loading && activeTab === "reviews" && (
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-2xl text-foreground">Omdömen</h2>
                  </div>

                  <div className="text-center py-8">
                    <Star className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      Inga omdömen ännu. Omdömen visas här efter dina första besök.
                    </p>
                  </div>
                </div>
              )}

              {/* Earnings Tab */}
              {!loading && activeTab === "earnings" && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-card rounded-2xl p-6 shadow-soft">
                      <h3 className="text-muted-foreground text-sm mb-2">Intjänat denna månad</h3>
                      <p className="font-serif text-3xl text-foreground">
                        {bookings.filter(b => b.status === 'confirmed' || b.status === 'completed')
                          .reduce((sum, b) => sum + b.total_price, 0)} kr
                      </p>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-soft">
                      <h3 className="text-muted-foreground text-sm mb-2">Utbetalat</h3>
                      <p className="font-serif text-3xl text-foreground">0 kr</p>
                    </div>
                    <div className="bg-card rounded-2xl p-6 shadow-soft">
                      <h3 className="text-muted-foreground text-sm mb-2">Tillgängligt för uttag</h3>
                      <p className="font-serif text-3xl text-accent">
                        {bookings.filter(b => b.status === 'completed')
                          .reduce((sum, b) => sum + b.total_price, 0)} kr
                      </p>
                      <Button variant="hero" size="sm" className="mt-3 w-full" disabled>
                        Ta ut pengar
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2 text-center">Kommer snart</p>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-6 shadow-soft">
                    <h3 className="font-serif text-xl text-foreground mb-4">Transaktionshistorik</h3>
                    {bookings.filter(b => b.status === 'confirmed' || b.status === 'completed').length > 0 ? (
                      <div className="space-y-3">
                        {bookings
                          .filter(b => b.status === 'confirmed' || b.status === 'completed')
                          .map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                              <div>
                                <p className="font-medium text-foreground">Bokning #{booking.id.slice(0, 8)}</p>
                                <p className="text-sm text-muted-foreground">{formatDate(booking.date)}</p>
                              </div>
                              <span className="font-medium text-primary">+{booking.total_price} kr</span>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        Inga transaktioner ännu. Genomförda bokningar visas här.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {!loading && activeTab === "settings" && (
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
                    <div className="mt-6 flex items-center gap-3">
                      <Button variant="hero" disabled>
                        Spara ändringar
                      </Button>
                      <span className="text-xs text-muted-foreground">Kommer snart</span>
                    </div>
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
      </PullToRefresh>

      <Footer />
    </div>
  );
};

export default SantaDashboard;

import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  MessageCircle, 
  CheckCircle, 
  XCircle, 
  ChevronRight,
  Gift,
  Sparkles,
  CreditCard,
  Search,
  User,
  Phone,
  AlertCircle
} from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import Footer from "@/components/Footer";
import PullToRefresh from "@/components/PullToRefresh";
import { SkeletonList } from "@/components/ui/skeleton-card";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO, isBefore, startOfDay } from "date-fns";
import { sv } from "date-fns/locale";

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
  door_code: string | null;
  instructions: string | null;
  status: string;
  total_price: number;
  santa_id: string;
  santa_name: string;
  santa_image: string | null;
  created_at: string;
  children?: BookingChild[];
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Calendar }> = {
  upcoming: {
    label: "Bokad",
    color: "bg-accent/10 text-accent border border-accent/20",
    icon: Calendar,
  },
  confirmed: {
    label: "Bekräftad",
    color: "bg-primary/10 text-primary border border-primary/20",
    icon: CheckCircle,
  },
  completed: {
    label: "Genomförd",
    color: "bg-primary/10 text-primary border border-primary/20",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Avbokad",
    color: "bg-destructive/10 text-destructive border border-destructive/20",
    icon: XCircle,
  },
};

const MyBookings = () => {
  const { user } = useCurrentUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = useCallback(async () => {
    if (!user) return;

    try {
      // Fetch bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (bookingsError) throw bookingsError;

      // Fetch children for each booking
      const bookingsWithChildren: Booking[] = await Promise.all(
        (bookingsData || []).map(async (booking) => {
          const { data: childrenData } = await supabase
            .from('booking_children')
            .select('*')
            .eq('booking_id', booking.id);

          return {
            ...booking,
            children: childrenData || [],
          };
        })
      );

      setBookings(bookingsWithChildren);
      
      // Select first booking if available
      if (bookingsWithChildren.length > 0) {
        const upcomingBookings = bookingsWithChildren.filter(
          b => !isBefore(parseISO(b.date), startOfDay(new Date())) && b.status !== 'cancelled'
        );
        setSelectedBooking(upcomingBookings[0] || bookingsWithChildren[0]);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const handleRefresh = async () => {
    await fetchBookings();
  };

  const upcomingBookings = bookings.filter(
    b => !isBefore(parseISO(b.date), startOfDay(new Date())) && b.status !== 'cancelled' && b.status !== 'completed'
  );

  const pastBookings = bookings.filter(
    b => isBefore(parseISO(b.date), startOfDay(new Date())) || b.status === 'completed' || b.status === 'cancelled'
  );

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), "d MMMM yyyy", { locale: sv });
    } catch {
      return dateStr;
    }
  };

  const formatShortDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), "d MMM", { locale: sv });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <SimpleHeader />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <div className="h-4 w-24 bg-muted rounded animate-pulse mb-2" />
              <div className="h-10 w-64 bg-muted rounded animate-pulse mb-3" />
              <div className="h-5 w-96 max-w-full bg-muted rounded animate-pulse" />
            </div>
            <div className="h-10 w-64 bg-muted rounded-xl animate-pulse mb-6" />
            <SkeletonList count={3} variant="booking" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      
      <PullToRefresh onRefresh={handleRefresh} className="min-h-screen">
        <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-accent text-sm font-medium">Ditt konto</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
              Mina <span className="text-gradient-gold">bokningar</span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Här ser du alla dina kommande och tidigare tomtebesök. Klicka på en bokning för att se detaljer.
            </p>
          </div>

          {bookings.length === 0 ? (
            /* Empty State */
            <div className="bg-card rounded-3xl p-8 md:p-12 text-center shadow-soft max-w-lg mx-auto">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Gift className="w-10 h-10 text-accent" />
              </div>
              <h2 className="font-serif text-2xl text-foreground mb-3">
                Du har inga bokningar ännu
              </h2>
              <p className="text-muted-foreground mb-8">
                Boka en jultomte och skapa magi på julafton. Våra tomtar är BankID-verifierade och redo att sprida julglädje.
              </p>
              <Link to="/sok">
                <Button variant="hero" size="lg" className="gap-2">
                  <Search className="w-4 h-4" />
                  Hitta tomte
                </Button>
              </Link>
            </div>
          ) : (
            /* Bookings Content */
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-muted/50 p-1 rounded-xl">
                <TabsTrigger 
                  value="upcoming" 
                  className="rounded-lg px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Kommande ({upcomingBookings.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="past"
                  className="rounded-lg px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Tidigare ({pastBookings.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-6">
                {upcomingBookings.length === 0 ? (
                  <div className="bg-card rounded-2xl p-8 text-center shadow-soft">
                    <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-serif text-xl text-foreground mb-2">Inga kommande bokningar</h3>
                    <p className="text-muted-foreground mb-6">
                      Du har inga bokningar schemalagda just nu.
                    </p>
                    <Link to="/sok">
                      <Button variant="hero">Boka en tomte</Button>
                    </Link>
                  </div>
                ) : (
                  <BookingsList 
                    bookings={upcomingBookings} 
                    selectedBooking={selectedBooking}
                    onSelectBooking={setSelectedBooking}
                    formatShortDate={formatShortDate}
                    formatDate={formatDate}
                  />
                )}
              </TabsContent>

              <TabsContent value="past" className="mt-6">
                {pastBookings.length === 0 ? (
                  <div className="bg-card rounded-2xl p-8 text-center shadow-soft">
                    <CheckCircle className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-serif text-xl text-foreground mb-2">Inga tidigare bokningar</h3>
                    <p className="text-muted-foreground">
                      Dina genomförda och avbokade bokningar visas här.
                    </p>
                  </div>
                ) : (
                  <BookingsList 
                    bookings={pastBookings} 
                    selectedBooking={selectedBooking}
                    onSelectBooking={setSelectedBooking}
                    formatShortDate={formatShortDate}
                    formatDate={formatDate}
                    isPast
                  />
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>

      <Footer />
      </PullToRefresh>
    </div>
  );
};

interface BookingsListProps {
  bookings: Booking[];
  selectedBooking: Booking | null;
  onSelectBooking: (booking: Booking) => void;
  formatShortDate: (date: string) => string;
  formatDate: (date: string) => string;
  isPast?: boolean;
}

const BookingsList = ({ 
  bookings, 
  selectedBooking, 
  onSelectBooking, 
  formatShortDate,
  formatDate,
  isPast = false 
}: BookingsListProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (booking: Booking) => {
    if (expandedId === booking.id) {
      setExpandedId(null);
    } else {
      setExpandedId(booking.id);
      onSelectBooking(booking);
    }
  };

  return (
    <div className="space-y-4">
      {bookings.map((booking) => {
        const status = statusConfig[booking.status] || statusConfig.upcoming;
        const StatusIcon = status.icon;
        const isExpanded = expandedId === booking.id;

        return (
          <div 
            key={booking.id}
            className="bg-card rounded-2xl shadow-soft overflow-hidden transition-all"
          >
            {/* Booking Card Header */}
            <button
              onClick={() => toggleExpand(booking)}
              className="w-full p-5 text-left hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Santa Image */}
                <div className="relative flex-shrink-0">
                  {booking.santa_image ? (
                    <img
                      src={booking.santa_image}
                      alt={booking.santa_name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                  )}
                </div>

                {/* Booking Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-lg text-foreground truncate">
                      {booking.santa_name}
                    </h3>
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap", status.color)}>
                      {status.label}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>{formatShortDate(booking.date)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{booking.city || booking.address.split(',')[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Duration & Arrow */}
                <div className="hidden sm:flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-foreground">{booking.duration} min</p>
                    <p className="text-sm text-muted-foreground">{booking.total_price} kr</p>
                  </div>
                  <ChevronRight className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform",
                    isExpanded && "rotate-90"
                  )} />
                </div>
              </div>
            </button>

            {/* Expanded Details */}
            {isExpanded && (
              <div className="px-5 pb-5 pt-0 border-t border-border">
                <div className="pt-5 grid md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-5">
                    {/* Date & Time */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        Datum & tid
                      </h4>
                      <p className="text-muted-foreground">
                        {formatDate(booking.date)} kl {booking.time}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {booking.duration} minuters besök
                      </p>
                    </div>

                    {/* Address */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Adress
                      </h4>
                      <p className="text-muted-foreground">{booking.address}</p>
                      {booking.city && booking.postal_code && (
                        <p className="text-muted-foreground">{booking.postal_code} {booking.city}</p>
                      )}
                      {booking.door_code && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Portkod: {booking.door_code}
                        </p>
                      )}
                    </div>

                    {/* Instructions */}
                    {booking.instructions && (
                      <div>
                        <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-primary" />
                          Instruktioner till tomten
                        </h4>
                        <p className="text-muted-foreground text-sm bg-muted/30 rounded-lg p-3">
                          {booking.instructions}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-5">
                    {/* Children */}
                    {booking.children && booking.children.length > 0 && (
                      <div>
                        <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                          <Gift className="w-4 h-4 text-primary" />
                          Barn ({booking.children.length})
                        </h4>
                        <div className="space-y-2">
                          {booking.children.map((child) => (
                            <div key={child.id} className="bg-muted/30 rounded-lg p-3">
                              <p className="font-medium text-foreground">
                                {child.name}, {child.age}
                              </p>
                              {child.gifts && (
                                <p className="text-sm text-muted-foreground">
                                  🎁 {child.gifts}
                                </p>
                              )}
                              {child.special_info && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  ℹ️ {child.special_info}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Payment */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-primary" />
                        Betalning
                      </h4>
                      <div className="flex items-center justify-between bg-primary/5 rounded-lg p-3 border border-primary/10">
                        <span className="text-muted-foreground">Totalt</span>
                        <span className="font-serif text-xl text-foreground">{booking.total_price} kr</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-primary" />
                        Betalning hålls säkert tills besöket är genomfört
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-5 border-t border-border flex flex-wrap gap-3">
                  <Link to={`/tomte/${booking.santa_id}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <User className="w-4 h-4" />
                      Visa tomtens profil
                    </Button>
                  </Link>
                  
                  {!isPast && booking.status !== 'cancelled' && (
                    <>
                      <Button variant="outline" size="sm" className="gap-2" disabled>
                        <MessageCircle className="w-4 h-4" />
                        Kontakta tomten
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive" disabled>
                        <XCircle className="w-4 h-4" />
                        Avboka bokning
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyBookings;
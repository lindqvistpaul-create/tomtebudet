import { useEffect, useState } from "react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { Search, Filter, Eye, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";

interface Booking {
  id: string;
  date: string;
  time: string;
  santa_name: string;
  santa_id: string;
  status: string;
  total_price: number;
  address: string;
  city: string | null;
  postal_code: string | null;
  door_code: string | null;
  instructions: string | null;
  duration: number;
  user_id: string;
  customer_name?: string;
  customer_email?: string;
  children?: Array<{
    id: string;
    name: string;
    age: string;
    gifts: string | null;
    special_info: string | null;
  }>;
}

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  upcoming: { label: "Bokad", variant: "default" },
  completed: { label: "Genomförd", variant: "secondary" },
  cancelled: { label: "Avbokad", variant: "destructive" },
  refund_pending: { label: "Refund pågår", variant: "outline" },
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data: bookingsData, error } = await supabase
        .from("bookings")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;

      // Fetch profiles for customers
      const userIds = [...new Set(bookingsData?.map(b => b.user_id) || [])];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name, email")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]));

      const enrichedBookings = bookingsData?.map(booking => ({
        ...booking,
        customer_name: profileMap.get(booking.user_id)?.full_name || "Okänd",
        customer_email: profileMap.get(booking.user_id)?.email || "",
      })) || [];

      setBookings(enrichedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingDetails = async (booking: Booking) => {
    // Fetch children for this booking
    const { data: children } = await supabase
      .from("booking_children")
      .select("*")
      .eq("booking_id", booking.id);

    setSelectedBooking({
      ...booking,
      children: children || [],
    });
    setSheetOpen(true);
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.santa_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl text-snow">Alla bokningar</h1>
        <p className="text-snow/60 mt-1">Hantera och granska alla bokningar i systemet</p>
      </div>

      {/* Filters */}
      <Card className="bg-card border-snow/10">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Sök på boknings-ID, tomte eller kund..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrera status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla statusar</SelectItem>
                <SelectItem value="upcoming">Bokad</SelectItem>
                <SelectItem value="completed">Genomförd</SelectItem>
                <SelectItem value="cancelled">Avbokad</SelectItem>
                <SelectItem value="refund_pending">Refund pågår</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card className="bg-card border-snow/10">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-snow/10">
                <TableHead className="text-muted-foreground">Boknings-ID</TableHead>
                <TableHead className="text-muted-foreground">Datum & tid</TableHead>
                <TableHead className="text-muted-foreground">Tomte</TableHead>
                <TableHead className="text-muted-foreground">Kund</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Pris</TableHead>
                <TableHead className="text-muted-foreground text-right">Åtgärder</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Laddar bokningar...
                  </TableCell>
                </TableRow>
              ) : filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Inga bokningar hittades
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="border-snow/10">
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {booking.id.slice(0, 8)}...
                    </TableCell>
                    <TableCell>
                      <div className="text-foreground">
                        {format(new Date(booking.date), "d MMM yyyy", { locale: sv })}
                      </div>
                      <div className="text-sm text-muted-foreground">{booking.time}</div>
                    </TableCell>
                    <TableCell className="text-foreground">{booking.santa_name}</TableCell>
                    <TableCell>
                      <div className="text-foreground">{booking.customer_name}</div>
                      <div className="text-sm text-muted-foreground">{booking.customer_email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusLabels[booking.status]?.variant || "default"}>
                        {statusLabels[booking.status]?.label || booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-foreground font-medium">
                      {booking.total_price.toLocaleString("sv-SE")} kr
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => fetchBookingDetails(booking)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Booking Details Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg bg-card border-snow/10">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">Bokningsdetaljer</SheetTitle>
          </SheetHeader>
          
          {selectedBooking && (
            <div className="mt-6 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Boknings-ID</span>
                  <span className="font-mono text-sm text-foreground">{selectedBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={statusLabels[selectedBooking.status]?.variant}>
                    {statusLabels[selectedBooking.status]?.label}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Datum & tid</span>
                  <span className="text-foreground">
                    {format(new Date(selectedBooking.date), "d MMMM yyyy", { locale: sv })} kl {selectedBooking.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Längd</span>
                  <span className="text-foreground">{selectedBooking.duration} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pris</span>
                  <span className="text-foreground font-medium">{selectedBooking.total_price.toLocaleString("sv-SE")} kr</span>
                </div>
              </div>

              <hr className="border-snow/10" />

              {/* Customer & Santa */}
              <div className="space-y-4">
                <h3 className="font-serif text-foreground">Kund</h3>
                <div className="text-foreground">{selectedBooking.customer_name}</div>
                <div className="text-sm text-muted-foreground">{selectedBooking.customer_email}</div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-foreground">Tomte</h3>
                <div className="text-foreground">{selectedBooking.santa_name}</div>
              </div>

              <hr className="border-snow/10" />

              {/* Address */}
              <div className="space-y-4">
                <h3 className="font-serif text-foreground">Adress</h3>
                <div className="text-foreground">
                  {selectedBooking.address}
                  {selectedBooking.postal_code && `, ${selectedBooking.postal_code}`}
                  {selectedBooking.city && ` ${selectedBooking.city}`}
                </div>
                {selectedBooking.door_code && (
                  <div className="text-sm text-muted-foreground">
                    Portkod: {selectedBooking.door_code}
                  </div>
                )}
              </div>

              {/* Instructions */}
              {selectedBooking.instructions && (
                <div className="space-y-2">
                  <h3 className="font-serif text-foreground">Instruktioner</h3>
                  <p className="text-muted-foreground text-sm">{selectedBooking.instructions}</p>
                </div>
              )}

              <hr className="border-snow/10" />

              {/* Children */}
              <div className="space-y-4">
                <h3 className="font-serif text-foreground">Barn</h3>
                {selectedBooking.children && selectedBooking.children.length > 0 ? (
                  <div className="space-y-3">
                    {selectedBooking.children.map((child) => (
                      <div key={child.id} className="p-3 rounded-lg bg-snow/5">
                        <div className="font-medium text-foreground">{child.name}</div>
                        <div className="text-sm text-muted-foreground">{child.age} år</div>
                        {child.gifts && (
                          <div className="text-sm text-muted-foreground mt-1">
                            Önskelista: {child.gifts}
                          </div>
                        )}
                        {child.special_info && (
                          <div className="text-sm text-muted-foreground">
                            Info: {child.special_info}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">Inga barn registrerade</p>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminBookings;

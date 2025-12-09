import { useEffect, useState } from "react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { Search, Eye, Flag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

interface Customer {
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
  booking_count: number;
  last_booking_date: string | null;
  flagged?: boolean;
  bookings?: Array<{
    id: string;
    date: string;
    time: string;
    status: string;
    santa_name: string;
    total_price: number;
  }>;
}

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  upcoming: { label: "Bokad", variant: "default" },
  completed: { label: "Genomförd", variant: "secondary" },
  cancelled: { label: "Avbokad", variant: "destructive" },
};

const AdminCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      // Get all customer roles
      const { data: customerRoles } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("role", "customer");

      const userIds = customerRoles?.map(r => r.user_id) || [];

      // Get profiles
      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .in("user_id", userIds);

      // Get bookings
      const { data: bookings } = await supabase
        .from("bookings")
        .select("user_id, date")
        .in("user_id", userIds);

      // Calculate booking counts and last booking date
      const bookingMap = new Map<string, { count: number; lastDate: string | null }>();
      bookings?.forEach(b => {
        const current = bookingMap.get(b.user_id) || { count: 0, lastDate: null };
        current.count++;
        if (!current.lastDate || b.date > current.lastDate) {
          current.lastDate = b.date;
        }
        bookingMap.set(b.user_id, current);
      });

      const enrichedCustomers: Customer[] = profiles?.map(profile => ({
        ...profile,
        booking_count: bookingMap.get(profile.user_id)?.count || 0,
        last_booking_date: bookingMap.get(profile.user_id)?.lastDate || null,
        flagged: false, // Placeholder for future flagging feature
      })) || [];

      // Sort by booking count
      enrichedCustomers.sort((a, b) => b.booking_count - a.booking_count);

      setCustomers(enrichedCustomers);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerDetails = async (customer: Customer) => {
    // Fetch bookings for this customer
    const { data: bookings } = await supabase
      .from("bookings")
      .select("id, date, time, status, santa_name, total_price")
      .eq("user_id", customer.user_id)
      .order("date", { ascending: false });

    setSelectedCustomer({
      ...customer,
      bookings: bookings || [],
    });
    setSheetOpen(true);
  };

  const filteredCustomers = customers.filter(customer => {
    return (
      customer.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl text-snow">Alla kunder</h1>
        <p className="text-snow/60 mt-1">Hantera kundkonton och bokningshistorik</p>
      </div>

      {/* Search */}
      <Card className="bg-card border-snow/10">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Sök på namn eller e-post..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card className="bg-card border-snow/10">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-snow/10">
                <TableHead className="text-muted-foreground">Namn</TableHead>
                <TableHead className="text-muted-foreground">E-post</TableHead>
                <TableHead className="text-muted-foreground">Bokningar</TableHead>
                <TableHead className="text-muted-foreground">Senaste bokning</TableHead>
                <TableHead className="text-muted-foreground">Flaggor</TableHead>
                <TableHead className="text-muted-foreground text-right">Åtgärder</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Laddar kunder...
                  </TableCell>
                </TableRow>
              ) : filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Inga kunder hittades
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.user_id} className="border-snow/10">
                    <TableCell className="text-foreground font-medium">
                      {customer.full_name || "Namn saknas"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{customer.email || "-"}</TableCell>
                    <TableCell className="text-foreground">{customer.booking_count}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {customer.last_booking_date 
                        ? format(new Date(customer.last_booking_date), "d MMM yyyy", { locale: sv })
                        : "-"
                      }
                    </TableCell>
                    <TableCell>
                      {customer.flagged ? (
                        <Badge variant="destructive">
                          <Flag className="w-3 h-3 mr-1" />
                          Flaggad
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => fetchCustomerDetails(customer)}
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

      {/* Customer Details Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg bg-card border-snow/10 overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">Kunddetaljer</SheetTitle>
          </SheetHeader>
          
          {selectedCustomer && (
            <div className="mt-6 space-y-6">
              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Namn</span>
                  <span className="text-foreground">{selectedCustomer.full_name || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">E-post</span>
                  <span className="text-foreground">{selectedCustomer.email || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Telefon</span>
                  <span className="text-foreground">{selectedCustomer.phone || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registrerad</span>
                  <span className="text-foreground">
                    {format(new Date(selectedCustomer.created_at), "d MMMM yyyy", { locale: sv })}
                  </span>
                </div>
              </div>

              <hr className="border-snow/10" />

              {/* Bookings */}
              <div className="space-y-4">
                <h3 className="font-serif text-foreground">Bokningar ({selectedCustomer.bookings?.length || 0})</h3>
                {selectedCustomer.bookings && selectedCustomer.bookings.length > 0 ? (
                  <div className="space-y-3">
                    {selectedCustomer.bookings.map((booking) => (
                      <div key={booking.id} className="p-3 rounded-lg bg-snow/5">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-foreground">
                              {format(new Date(booking.date), "d MMMM yyyy", { locale: sv })}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              kl {booking.time} • {booking.santa_name}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={statusLabels[booking.status]?.variant || "outline"}>
                              {statusLabels[booking.status]?.label || booking.status}
                            </Badge>
                            <div className="text-sm text-foreground mt-1">
                              {booking.total_price.toLocaleString("sv-SE")} kr
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">Inga bokningar</p>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminCustomers;

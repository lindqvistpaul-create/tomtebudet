import { useEffect, useState } from "react";
import { format, differenceInHours } from "date-fns";
import { sv } from "date-fns/locale";
import { Search, AlertTriangle, CheckCircle, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
import { toast } from "sonner";

interface CancelledBooking {
  id: string;
  date: string;
  time: string;
  santa_name: string;
  total_price: number;
  status: string;
  cancelled_by?: "customer" | "santa";
  cancelled_at?: string;
  late_cancellation: boolean;
  compensation_amount: number;
  compensation_status: "pending" | "processed" | "waived";
  handled: boolean;
  customer_name?: string;
  customer_email?: string;
}

// Dummy data for now - will be replaced with real data
const generateDummyCancellations = (): CancelledBooking[] => {
  return [
    {
      id: "cancel-1",
      date: "2024-12-22",
      time: "14:00",
      santa_name: "Tomte Kansen",
      total_price: 2400,
      status: "cancelled",
      cancelled_by: "customer",
      cancelled_at: "2024-12-21T10:00:00Z",
      late_cancellation: true,
      compensation_amount: 960, // 40% of 2400
      compensation_status: "pending",
      handled: false,
      customer_name: "Anna Andersson",
      customer_email: "anna@example.com",
    },
    {
      id: "cancel-2",
      date: "2024-12-23",
      time: "16:00",
      santa_name: "Julens Tomte",
      total_price: 1800,
      status: "cancelled",
      cancelled_by: "santa",
      cancelled_at: "2024-12-20T08:00:00Z",
      late_cancellation: false,
      compensation_amount: 0,
      compensation_status: "processed",
      handled: true,
      customer_name: "Erik Eriksson",
      customer_email: "erik@example.com",
    },
    {
      id: "dispute-1",
      date: "2024-12-20",
      time: "15:00",
      santa_name: "Glansen Tomte",
      total_price: 3000,
      status: "disputed",
      cancelled_by: "customer",
      cancelled_at: "2024-12-19T20:00:00Z",
      late_cancellation: true,
      compensation_amount: 1200,
      compensation_status: "pending",
      handled: false,
      customer_name: "Maria Johansson",
      customer_email: "maria@example.com",
    },
  ];
};

const AdminCancellations = () => {
  const [cancellations, setCancellations] = useState<CancelledBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedCancellation, setSelectedCancellation] = useState<CancelledBooking | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    // For now, use dummy data
    // Later, this will fetch from bookings where status = 'cancelled' or 'disputed'
    setTimeout(() => {
      setCancellations(generateDummyCancellations());
      setLoading(false);
    }, 500);
  }, []);

  const markAsHandled = (id: string) => {
    setCancellations(prev => 
      prev.map(c => c.id === id ? { ...c, handled: true, compensation_status: "processed" as const } : c)
    );
    toast.success("Avbokningen har markerats som hanterad");
    if (selectedCancellation?.id === id) {
      setSelectedCancellation(prev => prev ? { ...prev, handled: true, compensation_status: "processed" as const } : null);
    }
  };

  const waiveCompensation = (id: string) => {
    setCancellations(prev => 
      prev.map(c => c.id === id ? { ...c, compensation_status: "waived" as const, compensation_amount: 0 } : c)
    );
    toast.success("Ersättningen har efterskänkts");
    if (selectedCancellation?.id === id) {
      setSelectedCancellation(prev => prev ? { ...prev, compensation_status: "waived" as const, compensation_amount: 0 } : null);
    }
  };

  const filteredCancellations = cancellations.filter(c => {
    const matchesSearch = 
      c.santa_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || 
      (typeFilter === "late" && c.late_cancellation) ||
      (typeFilter === "pending" && !c.handled) ||
      (typeFilter === "handled" && c.handled);
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl text-snow">Avbokningar & dispyter</h1>
        <p className="text-snow/60 mt-1">Hantera avbokningar och eventuella ersättningar</p>
      </div>

      {/* Under construction warning */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/40">
        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm font-medium text-amber-600">
          Denna sida är inte färdigbyggd ännu – åtgärder sparas inte.
        </p>
      </div>

      {/* Info Card */}
      <Card className="bg-accent/10 border-accent/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground">Avbokningspolicy</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Avbokningar som görs mindre än 48 timmar innan bokad tid debiteras med 40% av totalpriset 
                som ersättning till tomten för förlorad inkomst och reserverad tid.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla</SelectItem>
                <SelectItem value="late">Sen avbokning (40%)</SelectItem>
                <SelectItem value="pending">Ej hanterade</SelectItem>
                <SelectItem value="handled">Hanterade</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cancellations Table */}
      <Card className="bg-card border-snow/10">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-snow/10">
                <TableHead className="text-muted-foreground">Bokning</TableHead>
                <TableHead className="text-muted-foreground">Datum</TableHead>
                <TableHead className="text-muted-foreground">Avbokad av</TableHead>
                <TableHead className="text-muted-foreground">Sen avbokning</TableHead>
                <TableHead className="text-muted-foreground">Ersättning</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Åtgärder</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Laddar avbokningar...
                  </TableCell>
                </TableRow>
              ) : filteredCancellations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Inga avbokningar hittades
                  </TableCell>
                </TableRow>
              ) : (
                filteredCancellations.map((cancellation) => (
                  <TableRow key={cancellation.id} className="border-snow/10">
                    <TableCell>
                      <div className="text-foreground font-medium">{cancellation.santa_name}</div>
                      <div className="text-sm text-muted-foreground">{cancellation.customer_name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-foreground">
                        {format(new Date(cancellation.date), "d MMM yyyy", { locale: sv })}
                      </div>
                      <div className="text-sm text-muted-foreground">{cancellation.time}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 text-muted-foreground" />
                        <span className="text-foreground capitalize">
                          {cancellation.cancelled_by === "customer" ? "Kund" : "Tomte"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {cancellation.late_cancellation ? (
                        <Badge variant="destructive">
                          <Clock className="w-3 h-3 mr-1" />
                          Ja (40%)
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">Nej</span>
                      )}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {cancellation.compensation_amount > 0 
                        ? `${cancellation.compensation_amount.toLocaleString("sv-SE")} kr`
                        : "-"
                      }
                    </TableCell>
                    <TableCell>
                      {cancellation.handled ? (
                        <Badge variant="secondary">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Hanterad
                        </Badge>
                      ) : (
                        <Badge variant="outline">Väntar</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedCancellation(cancellation);
                          setSheetOpen(true);
                        }}
                      >
                        Detaljer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Cancellation Details Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg bg-card border-snow/10 overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">Avbokningsdetaljer</SheetTitle>
          </SheetHeader>
          
          {selectedCancellation && (
            <div className="mt-6 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Boknings-ID</span>
                  <span className="font-mono text-sm text-foreground">{selectedCancellation.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bokningsdatum</span>
                  <span className="text-foreground">
                    {format(new Date(selectedCancellation.date), "d MMMM yyyy", { locale: sv })} kl {selectedCancellation.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ursprungligt pris</span>
                  <span className="text-foreground">{selectedCancellation.total_price.toLocaleString("sv-SE")} kr</span>
                </div>
              </div>

              <hr className="border-snow/10" />

              {/* Parties */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-foreground mb-2">Kund</h3>
                  <div className="text-foreground">{selectedCancellation.customer_name}</div>
                  <div className="text-sm text-muted-foreground">{selectedCancellation.customer_email}</div>
                </div>
                <div>
                  <h3 className="font-serif text-foreground mb-2">Tomte</h3>
                  <div className="text-foreground">{selectedCancellation.santa_name}</div>
                </div>
              </div>

              <hr className="border-snow/10" />

              {/* Cancellation Details */}
              <div className="space-y-4">
                <h3 className="font-serif text-foreground">Avbokning</h3>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avbokad av</span>
                  <span className="text-foreground capitalize">
                    {selectedCancellation.cancelled_by === "customer" ? "Kund" : "Tomte"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avbokad</span>
                  <span className="text-foreground">
                    {selectedCancellation.cancelled_at && 
                      format(new Date(selectedCancellation.cancelled_at), "d MMM yyyy HH:mm", { locale: sv })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Sen avbokning (&lt;48h)</span>
                  {selectedCancellation.late_cancellation ? (
                    <Badge variant="destructive">Ja</Badge>
                  ) : (
                    <span className="text-foreground">Nej</span>
                  )}
                </div>
              </div>

              <hr className="border-snow/10" />

              {/* Compensation */}
              <div className="space-y-4">
                <h3 className="font-serif text-foreground">Ersättning</h3>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Belopp (40%)</span>
                  <span className="text-foreground font-medium">
                    {selectedCancellation.compensation_amount > 0 
                      ? `${selectedCancellation.compensation_amount.toLocaleString("sv-SE")} kr`
                      : "-"
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <Badge 
                    variant={
                      selectedCancellation.compensation_status === "processed" ? "secondary" :
                      selectedCancellation.compensation_status === "waived" ? "outline" : "default"
                    }
                  >
                    {selectedCancellation.compensation_status === "processed" && "Utbetald"}
                    {selectedCancellation.compensation_status === "waived" && "Efterskänkt"}
                    {selectedCancellation.compensation_status === "pending" && "Väntar"}
                  </Badge>
                </div>
              </div>

              <hr className="border-snow/10" />

              {/* Actions */}
              {!selectedCancellation.handled && (
                <div className="space-y-3">
                  <h3 className="font-serif text-foreground">Åtgärder</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      disabled
                      onClick={() => markAsHandled(selectedCancellation.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Markera som hanterad
                    </Button>
                    {selectedCancellation.compensation_amount > 0 &&
                     selectedCancellation.compensation_status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                        onClick={() => waiveCompensation(selectedCancellation.id)}
                      >
                        Efterskänk ersättning
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-amber-600">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>Denna sida är inte färdigbyggd ännu – åtgärder sparas inte.</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminCancellations;

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { Search, Eye, Check, X, Ban, Star } from "lucide-react";
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
import { resolvePublicPhotoUrl } from "@/lib/santaPhotos";
import { toast } from "sonner";
import { resolveStorageUrl } from "./AdminSantaReview";

interface Santa {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  status: string;
  bio: string | null;
  experience: string | null;
  price_per_quarter: number | null;
  portrait_photo_url: string | null;
  costume_photo_url: string | null;
  id_document_url: string | null;
  bankid_verified: boolean;
  submitted_at: string | null;
  reviewed_at: string | null;
  booking_count: number;
  rating?: number;
}

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  draft: { label: "Ej inskickad", variant: "outline" },
  pending: { label: "Under granskning", variant: "secondary" },
  approved: { label: "Verifierad", variant: "default" },
  rejected: { label: "Avslagen", variant: "destructive" },
  suspended: { label: "Avstängd", variant: "destructive" },
};

const AdminSantas = () => {
  const [santas, setSantas] = useState<Santa[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSanta, setSelectedSanta] = useState<Santa | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [signedUrls, setSignedUrls] = useState<{
    portrait: string | null;
    costume: string | null;
    idDocument: string | null;
  }>({ portrait: null, costume: null, idDocument: null });

  useEffect(() => {
    fetchSantas();
  }, []);

  // Portrait/costume live in the public santa-photos bucket; the ID document
  // stays in the private bucket and needs a signed URL.
  useEffect(() => {
    if (!selectedSanta) {
      setSignedUrls({ portrait: null, costume: null, idDocument: null });
      return;
    }
    (async () => {
      const portrait = resolvePublicPhotoUrl(selectedSanta.portrait_photo_url);
      const costume = resolvePublicPhotoUrl(selectedSanta.costume_photo_url);
      const idDocument = await resolveStorageUrl(selectedSanta.id_document_url);
      setSignedUrls({ portrait, costume, idDocument });
    })();
  }, [selectedSanta]);

  const fetchSantas = async () => {
    try {
      const { data: applications, error } = await supabase
        .from("santa_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch profiles
      const userIds = applications?.map(a => a.user_id) || [];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name, email, phone")
        .in("user_id", userIds);

      // Fetch booking counts
      const { data: bookingCounts } = await supabase
        .from("bookings")
        .select("santa_user_id");

      const countMap = new Map<string, number>();
      bookingCounts?.forEach(b => {
        if (b.santa_user_id) {
          countMap.set(b.santa_user_id, (countMap.get(b.santa_user_id) || 0) + 1);
        }
      });

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]));

      const enrichedSantas: Santa[] = applications?.map(app => ({
        ...app,
        full_name: profileMap.get(app.user_id)?.full_name || null,
        email: profileMap.get(app.user_id)?.email || null,
        phone: profileMap.get(app.user_id)?.phone || null,
        booking_count: countMap.get(app.user_id) || 0,
        rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10, // Dummy rating
      })) || [];

      setSantas(enrichedSantas);
    } catch (error) {
      console.error("Error fetching santas:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateSantaStatus = async (santaId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("santa_applications")
        .update({ 
          status: newStatus,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", santaId);

      if (error) throw error;

      toast.success(`Tomtens status uppdaterad till "${statusLabels[newStatus]?.label}"`);
      fetchSantas();
      
      if (selectedSanta) {
        setSelectedSanta({ ...selectedSanta, status: newStatus });
      }
    } catch (error) {
      console.error("Error updating santa status:", error);
      toast.error("Kunde inte uppdatera status");
    }
  };

  const filteredSantas = santas.filter(santa => {
    const matchesSearch = 
      santa.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      santa.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || santa.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl text-snow">Alla tomtar</h1>
        <p className="text-snow/60 mt-1">Hantera tomtansökningar och verifieringar</p>
      </div>

      {/* Filters */}
      <Card className="bg-card border-snow/10">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Sök på namn eller e-post..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrera status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla statusar</SelectItem>
                <SelectItem value="draft">Ej inskickad</SelectItem>
                <SelectItem value="pending">Under granskning</SelectItem>
                <SelectItem value="approved">Verifierad</SelectItem>
                <SelectItem value="rejected">Avslagen</SelectItem>
                <SelectItem value="suspended">Avstängd</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Santas Table */}
      <Card className="bg-card border-snow/10">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-snow/10">
                <TableHead className="text-muted-foreground">Namn</TableHead>
                <TableHead className="text-muted-foreground">E-post</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Bokningar</TableHead>
                <TableHead className="text-muted-foreground">Betyg</TableHead>
                <TableHead className="text-muted-foreground text-right">Åtgärder</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Laddar tomtar...
                  </TableCell>
                </TableRow>
              ) : filteredSantas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Inga tomtar hittades
                  </TableCell>
                </TableRow>
              ) : (
                filteredSantas.map((santa) => (
                  <TableRow key={santa.id} className="border-snow/10">
                    <TableCell className="text-foreground font-medium">
                      {santa.full_name || "Namn saknas"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{santa.email || "-"}</TableCell>
                    <TableCell>
                      <Badge variant={statusLabels[santa.status]?.variant || "outline"}>
                        {statusLabels[santa.status]?.label || santa.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground">{santa.booking_count}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="text-foreground">{santa.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedSanta(santa);
                          setSheetOpen(true);
                        }}
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

      {/* Santa Details Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg bg-card border-snow/10 overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-serif text-foreground">Tomtedetaljer</SheetTitle>
          </SheetHeader>
          
          {selectedSanta && (
            <div className="mt-6 space-y-6">
              {/* Profile Photos */}
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-lg bg-snow/5 flex items-center justify-center overflow-hidden">
                  {signedUrls.portrait ? (
                    <img
                      src={signedUrls.portrait}
                      alt="Porträtt"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      {selectedSanta.portrait_photo_url ? "Laddar bild..." : "Inget porträtt"}
                    </span>
                  )}
                </div>
                <div className="aspect-square rounded-lg bg-snow/5 flex items-center justify-center overflow-hidden">
                  {signedUrls.costume ? (
                    <img
                      src={signedUrls.costume}
                      alt="Tomtedräkt"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      {selectedSanta.costume_photo_url ? "Laddar bild..." : "Ingen dräktbild"}
                    </span>
                  )}
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Namn</span>
                  <span className="text-foreground">{selectedSanta.full_name || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stad/område</span>
                  <span className="text-foreground">{selectedSanta.city || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">E-post</span>
                  <span className="text-foreground">{selectedSanta.email || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Telefon</span>
                  <span className="text-foreground">{selectedSanta.phone || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={statusLabels[selectedSanta.status]?.variant}>
                    {statusLabels[selectedSanta.status]?.label}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">BankID-verifierad</span>
                  <span className="text-foreground">{selectedSanta.bankid_verified ? "Ja" : "Nej"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pris per kvart</span>
                  <span className="text-foreground">
                    {selectedSanta.price_per_quarter ? `${selectedSanta.price_per_quarter} kr` : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bokningar</span>
                  <span className="text-foreground">{selectedSanta.booking_count}</span>
                </div>
              </div>

              <hr className="border-snow/10" />

              {/* Bio */}
              <div className="space-y-2">
                <h3 className="font-serif text-foreground">Presentation</h3>
                <p className="text-muted-foreground text-sm">
                  {selectedSanta.bio || "Ingen presentation"}
                </p>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <h3 className="font-serif text-foreground">Erfarenhet</h3>
                <p className="text-muted-foreground text-sm">
                  {selectedSanta.experience || "Ingen erfarenhet angiven"}
                </p>
              </div>

              {/* ID Document */}
              <div className="space-y-2">
                <h3 className="font-serif text-foreground">ID-dokument</h3>
                {signedUrls.idDocument ? (
                  <a
                    href={signedUrls.idDocument}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline text-sm"
                  >
                    Visa dokument
                  </a>
                ) : selectedSanta.id_document_url ? (
                  <p className="text-muted-foreground text-sm">Laddar dokument...</p>
                ) : (
                  <p className="text-muted-foreground text-sm">Inget dokument uppladdats</p>
                )}
              </div>

              <hr className="border-snow/10" />

              {/* Action Buttons */}
              <div className="space-y-3">
                <h3 className="font-serif text-foreground">Åtgärder</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSanta.status !== "approved" && (
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => updateSantaStatus(selectedSanta.id, "approved")}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Godkänn
                    </Button>
                  )}
                  {selectedSanta.status !== "rejected" && selectedSanta.status !== "approved" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => updateSantaStatus(selectedSanta.id, "rejected")}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Avslå
                    </Button>
                  )}
                  {selectedSanta.status === "approved" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => updateSantaStatus(selectedSanta.id, "suspended")}
                    >
                      <Ban className="w-4 h-4 mr-1" />
                      Stäng av
                    </Button>
                  )}
                  {selectedSanta.status === "suspended" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateSantaStatus(selectedSanta.id, "approved")}
                    >
                      Återaktivera
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminSantas;

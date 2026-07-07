import { useEffect, useState } from "react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { Search, Eye, Check, X, FileText, UserCheck, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { resolvePublicPhotoUrl } from "@/lib/santaPhotos";
import { toast } from "sonner";

interface SantaApplication {
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
  created_at: string;
  submitted_at: string | null;
  reviewed_at: string | null;
  review_notes: string | null;
  available_times: string[] | null;
}

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  draft: { label: "Ej inskickad", variant: "outline" },
  pending: { label: "Väntar på granskning", variant: "secondary" },
  approved: { label: "Godkänd", variant: "default" },
  rejected: { label: "Avslagen", variant: "destructive" },
};

// Bucket 'santa-uploads' is PRIVATE and only holds ID documents: stored
// values are storage paths (legacy rows may contain full public URLs).
// Resolve to a temporary signed URL. Portrait/costume photos live in the
// PUBLIC 'santa-photos' bucket – use resolvePublicPhotoUrl for those.
export async function resolveStorageUrl(value: string | null): Promise<string | null> {
  if (!value) return null;
  let path = value;
  if (value.startsWith("http")) {
    const marker = "/santa-uploads/";
    const idx = value.indexOf(marker);
    if (idx === -1) return null;
    path = value.slice(idx + marker.length);
  }
  const { data } = await supabase.storage
    .from("santa-uploads")
    .createSignedUrl(path, 600);
  return data?.signedUrl ?? null;
}

const AdminSantaReview = () => {
  const [applications, setApplications] = useState<SantaApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [selectedApplication, setSelectedApplication] = useState<SantaApplication | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [processing, setProcessing] = useState(false);
  const [signedUrls, setSignedUrls] = useState<{
    portrait: string | null;
    costume: string | null;
    idDocument: string | null;
  }>({ portrait: null, costume: null, idDocument: null });

  // Stats
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  // Portrait/costume are public (santa-photos); the ID document stays in the
  // private bucket and needs a signed URL.
  useEffect(() => {
    if (!selectedApplication) {
      setSignedUrls({ portrait: null, costume: null, idDocument: null });
      return;
    }
    (async () => {
      const portrait = resolvePublicPhotoUrl(selectedApplication.portrait_photo_url);
      const costume = resolvePublicPhotoUrl(selectedApplication.costume_photo_url);
      const idDocument = await resolveStorageUrl(selectedApplication.id_document_url);
      setSignedUrls({ portrait, costume, idDocument });
    })();
  }, [selectedApplication]);

  const fetchApplications = async () => {
    try {
      const { data: apps, error } = await supabase
        .from("santa_applications")
        .select("*")
        .order("submitted_at", { ascending: false });

      if (error) throw error;

      // Fetch profiles
      const userIds = apps?.map(a => a.user_id) || [];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name, email, phone")
        .in("user_id", userIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]));

      const enrichedApps: SantaApplication[] = apps?.map(app => ({
        ...app,
        full_name: profileMap.get(app.user_id)?.full_name || null,
        email: profileMap.get(app.user_id)?.email || null,
        phone: profileMap.get(app.user_id)?.phone || null,
      })) || [];

      setApplications(enrichedApps);

      // Calculate stats
      const pending = enrichedApps.filter(a => a.status === "pending").length;
      const approved = enrichedApps.filter(a => a.status === "approved").length;
      const rejected = enrichedApps.filter(a => a.status === "rejected").length;
      setStats({ pending, approved, rejected });
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Kunde inte hämta ansökningar");
    } finally {
      setLoading(false);
    }
  };

  const approveApplication = async (application: SantaApplication) => {
    setProcessing(true);
    try {
      // Update status
      const { error: updateError } = await supabase
        .from("santa_applications")
        .update({ 
          status: "approved",
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", application.id);

      if (updateError) throw updateError;

      // Send approval email
      try {
        await supabase.functions.invoke("send-santa-approved-email", {
          body: {
            email: application.email,
            santaName: application.full_name || "Tomte",
          },
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Don't fail the approval if email fails
      }

      toast.success("Tomteprofilen har godkänts!");
      setDialogOpen(false);
      setSelectedApplication(null);
      fetchApplications();
    } catch (error) {
      console.error("Error approving application:", error);
      toast.error("Kunde inte godkänna ansökan");
    } finally {
      setProcessing(false);
    }
  };

  const rejectApplication = async () => {
    if (!selectedApplication) return;
    
    setProcessing(true);
    try {
      const { error } = await supabase
        .from("santa_applications")
        .update({ 
          status: "rejected",
          reviewed_at: new Date().toISOString(),
          review_notes: rejectReason || null,
        })
        .eq("id", selectedApplication.id);

      if (error) throw error;

      toast.success("Ansökan har avslagits");
      setRejectDialogOpen(false);
      setDialogOpen(false);
      setSelectedApplication(null);
      setRejectReason("");
      fetchApplications();
    } catch (error) {
      console.error("Error rejecting application:", error);
      toast.error("Kunde inte avslå ansökan");
    } finally {
      setProcessing(false);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const openReviewDialog = (app: SantaApplication) => {
    setSelectedApplication(app);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl text-snow">Tomtegranskning</h1>
        <p className="text-snow/60 mt-1">Granska och godkänn tomteansökningar</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-snow/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Väntar på granskning</p>
                <p className="text-3xl font-serif font-bold text-accent">{stats.pending}</p>
              </div>
              <div className="p-3 rounded-lg bg-accent/10">
                <Clock className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-snow/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Godkända tomtar</p>
                <p className="text-3xl font-serif font-bold text-green-500">{stats.approved}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <UserCheck className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-snow/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avvisade ansökningar</p>
                <p className="text-3xl font-serif font-bold text-destructive">{stats.rejected}</p>
              </div>
              <div className="p-3 rounded-lg bg-destructive/10">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
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
                <SelectItem value="all">Alla ansökningar</SelectItem>
                <SelectItem value="pending">Väntar på granskning</SelectItem>
                <SelectItem value="approved">Godkända</SelectItem>
                <SelectItem value="rejected">Avvisade</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card className="bg-card border-snow/10">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-snow/10">
                <TableHead className="text-muted-foreground">Namn</TableHead>
                <TableHead className="text-muted-foreground">E-post</TableHead>
                <TableHead className="text-muted-foreground">Registrerad</TableHead>
                <TableHead className="text-muted-foreground">ID-dokument</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Åtgärder</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Laddar ansökningar...
                  </TableCell>
                </TableRow>
              ) : filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {statusFilter === "pending" 
                      ? "Inga ansökningar väntar på granskning" 
                      : "Inga ansökningar hittades"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((app) => (
                  <TableRow key={app.id} className="border-snow/10">
                    <TableCell className="text-foreground font-medium">
                      {app.full_name || "Namn saknas"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{app.email || "-"}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {app.created_at 
                        ? format(new Date(app.created_at), "d MMM yyyy", { locale: sv })
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {app.id_document_url ? (
                        <Badge variant="default" className="bg-green-600">
                          <FileText className="w-3 h-3 mr-1" />
                          Uppladdat
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Saknas
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusLabels[app.status]?.variant || "outline"}>
                        {statusLabels[app.status]?.label || app.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openReviewDialog(app)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Visa profil
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-snow/10">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-foreground">
              Granska ansökan
            </DialogTitle>
            <DialogDescription>
              Granska tomtens profil och dokument innan godkännande
            </DialogDescription>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="space-y-6 mt-4">
              {/* Profile Photos */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Porträttbild</Label>
                  <div className="aspect-square rounded-lg bg-snow/5 flex items-center justify-center overflow-hidden border border-snow/10">
                    {signedUrls.portrait ? (
                      <img
                        src={signedUrls.portrait}
                        alt="Porträtt"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        {selectedApplication.portrait_photo_url ? "Laddar bild..." : "Inget porträtt"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Tomtedräkt</Label>
                  <div className="aspect-square rounded-lg bg-snow/5 flex items-center justify-center overflow-hidden border border-snow/10">
                    {signedUrls.costume ? (
                      <img
                        src={signedUrls.costume}
                        alt="Tomtedräkt"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        {selectedApplication.costume_photo_url ? "Laddar bild..." : "Ingen dräktbild"}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Namn</Label>
                  <p className="text-foreground font-medium">{selectedApplication.full_name || "-"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Stad/område</Label>
                  <p className="text-foreground">{selectedApplication.city || "-"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">E-post</Label>
                  <p className="text-foreground">{selectedApplication.email || "-"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Telefon</Label>
                  <p className="text-foreground">{selectedApplication.phone || "-"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Pris per kvart</Label>
                  <p className="text-foreground">
                    {selectedApplication.price_per_quarter 
                      ? `${selectedApplication.price_per_quarter} kr` 
                      : "-"}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div>
                <Label className="text-muted-foreground">Presentation</Label>
                <p className="text-foreground mt-1 whitespace-pre-wrap">
                  {selectedApplication.bio || "Ingen presentation"}
                </p>
              </div>

              {/* Experience */}
              <div>
                <Label className="text-muted-foreground">Erfarenhet</Label>
                <p className="text-foreground mt-1 whitespace-pre-wrap">
                  {selectedApplication.experience || "Ingen erfarenhet angiven"}
                </p>
              </div>

              {/* ID Document */}
              <div>
                <Label className="text-muted-foreground">ID-dokument</Label>
                {signedUrls.idDocument ? (
                  <div className="mt-2">
                    <a
                      href={signedUrls.idDocument}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent hover:underline"
                    >
                      <FileText className="w-4 h-4" />
                      Öppna dokument i ny flik
                    </a>
                  </div>
                ) : selectedApplication.id_document_url ? (
                  <p className="text-muted-foreground mt-1">Laddar dokument...</p>
                ) : (
                  <p className="text-muted-foreground mt-1">Inget dokument uppladdats</p>
                )}
              </div>

              {/* BankID Status */}
              <div>
                <Label className="text-muted-foreground">BankID-verifiering</Label>
                <p className="text-foreground mt-1">
                  {selectedApplication.bankid_verified ? (
                    <Badge variant="default" className="bg-green-600">Verifierad</Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">Ej verifierad</Badge>
                  )}
                </p>
              </div>

              {/* Review Notes (if rejected) */}
              {selectedApplication.status === "rejected" && selectedApplication.review_notes && (
                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <Label className="text-destructive">Avslagsorsak</Label>
                  <p className="text-foreground mt-1">{selectedApplication.review_notes}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="mt-6 gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Stäng
            </Button>
            {selectedApplication?.status === "pending" && (
              <>
                <Button
                  variant="destructive"
                  onClick={() => setRejectDialogOpen(true)}
                  disabled={processing}
                >
                  <X className="w-4 h-4 mr-1" />
                  Avslå
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => selectedApplication && approveApplication(selectedApplication)}
                  disabled={processing}
                >
                  <Check className="w-4 h-4 mr-1" />
                  {processing ? "Godkänner..." : "Godkänn tomte"}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Reason Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="bg-card border-snow/10">
          <DialogHeader>
            <DialogTitle className="font-serif text-foreground">Avslå ansökan</DialogTitle>
            <DialogDescription>
              Ange varför ansökan avslås (valfritt men rekommenderat)
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="reject-reason">Avslagsorsak</Label>
              <Textarea
                id="reject-reason"
                placeholder="T.ex. Ofullständig profil, olämpliga bilder, saknar erfarenhet..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="mt-2"
                rows={4}
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Avbryt
            </Button>
            <Button
              variant="destructive"
              onClick={rejectApplication}
              disabled={processing}
            >
              {processing ? "Avslår..." : "Bekräfta avslag"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSantaReview;

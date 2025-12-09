import { useEffect, useState } from "react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { Download, Check, Mail, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FamilyInterestEntry {
  id: string;
  email: string;
  name: string | null;
  location: string | null;
  children_info: string | null;
  created_at: string;
  notified_at: string | null;
}

const AdminFamilyInterest = () => {
  const [entries, setEntries] = useState<FamilyInterestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from("family_interest")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error("Error fetching entries:", error);
      toast.error("Kunde inte hämta intresselistan");
    } finally {
      setLoading(false);
    }
  };

  const markAsNotified = async (id: string) => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from("family_interest")
        .update({ notified_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;

      toast.success("Markerad som notifierad");
      fetchEntries();
    } catch (error) {
      console.error("Error updating entry:", error);
      toast.error("Kunde inte uppdatera");
    } finally {
      setUpdatingId(null);
    }
  };

  const exportCSV = () => {
    const headers = ["email", "name", "location", "created_at"];
    const csvContent = [
      headers.join(","),
      ...entries.map((entry) =>
        [
          `"${entry.email}"`,
          `"${entry.name || ""}"`,
          `"${entry.location || ""}"`,
          `"${entry.created_at}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `familjeintresse_${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV exporterad!");
  };

  const notifiedCount = entries.filter((e) => e.notified_at).length;
  const pendingCount = entries.filter((e) => !e.notified_at).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-snow">Familjeintresse</h1>
          <p className="text-snow/60 mt-1">Familjer som vill bli notifierade när bokningen öppnar</p>
        </div>
        <Button onClick={exportCSV} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Exportera CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-snow/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Totalt anmälda</p>
                <p className="text-3xl font-serif font-bold text-accent">{entries.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-accent/10">
                <Users className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-snow/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ej notifierade</p>
                <p className="text-3xl font-serif font-bold text-foreground">{pendingCount}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <Mail className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-snow/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Notifierade</p>
                <p className="text-3xl font-serif font-bold text-green-500">{notifiedCount}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10">
                <Check className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="bg-card border-snow/10">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-snow/10">
                <TableHead className="text-muted-foreground">E-post</TableHead>
                <TableHead className="text-muted-foreground">Namn</TableHead>
                <TableHead className="text-muted-foreground">Ort/område</TableHead>
                <TableHead className="text-muted-foreground">Skapad</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Åtgärder</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Laddar...
                  </TableCell>
                </TableRow>
              ) : entries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Inga anmälningar ännu
                  </TableCell>
                </TableRow>
              ) : (
                entries.map((entry) => (
                  <TableRow key={entry.id} className="border-snow/10">
                    <TableCell className="text-foreground font-medium">{entry.email}</TableCell>
                    <TableCell className="text-muted-foreground">{entry.name || "-"}</TableCell>
                    <TableCell className="text-muted-foreground">{entry.location || "-"}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(entry.created_at), "d MMM yyyy HH:mm", { locale: sv })}
                    </TableCell>
                    <TableCell>
                      {entry.notified_at ? (
                        <Badge variant="default" className="bg-green-600">
                          <Check className="w-3 h-3 mr-1" />
                          Notifierad
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground">
                          Ej notifierad
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {!entry.notified_at && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsNotified(entry.id)}
                          disabled={updatingId === entry.id}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          {updatingId === entry.id ? "..." : "Markera notifierad"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFamilyInterest;

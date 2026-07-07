import { useState } from "react";
import { Save, Info, AlertTriangle, Shield, CreditCard, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const AdminSettings = () => {
  const [priceSettings, setPriceSettings] = useState({
    minPricePerQuarter: 200,
    maxPricePerQuarter: 800,
    platformFeePercent: 15,
  });

  const [cancellationPolicy, setCancellationPolicy] = useState({
    freeWindowHours: 48,
    lateCancellationPercent: 40,
    policyText: `Avbokningar som görs mer än 48 timmar innan bokad tid är kostnadsfria.

Avbokningar som görs mindre än 48 timmar innan bokad tid debiteras med 40% av totalpriset som ersättning till tomten för:
• Förlorad inkomst
• Reserverad tid som inte kan fyllas
• Förberedelser som redan gjorts

Denna policy gäller för att säkerställa att våra tomtar får skälig kompensation för sent avbokade uppdrag.`,
  });

  const handleSavePricing = () => {
    // Placeholder for saving pricing settings
    toast.success("Prisinställningar sparade (demo)");
  };

  const handleSavePolicy = () => {
    // Placeholder for saving policy
    toast.success("Avbokningspolicy sparad (demo)");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl text-snow">Inställningar</h1>
        <p className="text-snow/60 mt-1">Hantera plattformsinställningar och policyer</p>
      </div>

      {/* Under construction warning */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/40">
        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm font-medium text-amber-600">
          Denna sida är inte färdigbyggd ännu – åtgärder sparas inte.
        </p>
      </div>

      {/* System Info */}
      <Card className="bg-card border-snow/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-accent" />
            <CardTitle className="font-serif text-foreground">Systeminformation</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-snow/5">
              <div className="text-sm text-muted-foreground">Version</div>
              <div className="font-medium text-foreground">Tomtebudet v1.0.0</div>
            </div>
            <div className="p-4 rounded-lg bg-snow/5">
              <div className="text-sm text-muted-foreground">Miljö</div>
              <div className="font-medium text-foreground">Produktion</div>
            </div>
            <div className="p-4 rounded-lg bg-snow/5">
              <div className="text-sm text-muted-foreground">Support</div>
              <div className="font-medium text-foreground">support@tomtebudet.se</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Settings */}
      <Card className="bg-card border-snow/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-accent" />
            <CardTitle className="font-serif text-foreground">Prisinställningar</CardTitle>
          </div>
          <CardDescription>Ställ in standardpriser och avgifter för plattformen</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="minPrice">Lägsta pris per kvart (kr)</Label>
              <Input
                id="minPrice"
                type="number"
                value={priceSettings.minPricePerQuarter}
                onChange={(e) => setPriceSettings(prev => ({ 
                  ...prev, 
                  minPricePerQuarter: parseInt(e.target.value) || 0 
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxPrice">Högsta pris per kvart (kr)</Label>
              <Input
                id="maxPrice"
                type="number"
                value={priceSettings.maxPricePerQuarter}
                onChange={(e) => setPriceSettings(prev => ({ 
                  ...prev, 
                  maxPricePerQuarter: parseInt(e.target.value) || 0 
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platformFee">Plattformsavgift (%)</Label>
              <Input
                id="platformFee"
                type="number"
                value={priceSettings.platformFeePercent}
                onChange={(e) => setPriceSettings(prev => ({ 
                  ...prev, 
                  platformFeePercent: parseInt(e.target.value) || 0 
                }))}
              />
            </div>
          </div>
          <Button onClick={handleSavePricing} disabled>
            <Save className="w-4 h-4 mr-2" />
            Spara prisinställningar
          </Button>
        </CardContent>
      </Card>

      {/* Cancellation Policy */}
      <Card className="bg-card border-snow/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            <CardTitle className="font-serif text-foreground">Avbokningspolicy</CardTitle>
          </div>
          <CardDescription>Hantera villkor för avbokningar och ersättningar</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="freeWindow">Gratisavbokning fram till (timmar före)</Label>
              <Input
                id="freeWindow"
                type="number"
                value={cancellationPolicy.freeWindowHours}
                onChange={(e) => setCancellationPolicy(prev => ({ 
                  ...prev, 
                  freeWindowHours: parseInt(e.target.value) || 0 
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lateFee">Sen avbokningsavgift (%)</Label>
              <Input
                id="lateFee"
                type="number"
                value={cancellationPolicy.lateCancellationPercent}
                onChange={(e) => setCancellationPolicy(prev => ({ 
                  ...prev, 
                  lateCancellationPercent: parseInt(e.target.value) || 0 
                }))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="policyText">Policytext (visas för kunder)</Label>
            <Textarea
              id="policyText"
              rows={8}
              value={cancellationPolicy.policyText}
              onChange={(e) => setCancellationPolicy(prev => ({ 
                ...prev, 
                policyText: e.target.value 
              }))}
            />
          </div>

          <Button onClick={handleSavePolicy} disabled>
            <Save className="w-4 h-4 mr-2" />
            Spara avbokningspolicy
          </Button>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="bg-berry/10 border-berry/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-berry flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground">Säkerhetsinformation</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Adminpanelen är endast åtkomlig för användare med admin-roll. 
                Alla ändringar loggas för spårbarhet. Kontakta teknisk support om du 
                behöver ändra behörigheter eller har säkerhetsfrågor.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Fingerprint, 
  FileCheck, 
  Camera, 
  Settings, 
  Clock, 
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Upload,
  Shield,
  Wallet,
  Calendar,
  Star,
  Sparkles,
  Gift,
  Loader2
} from "lucide-react";
import SimpleHeader from "@/components/SimpleHeader";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const steps = [
  { id: 1, title: "Introduktion", icon: Gift },
  { id: 2, title: "BankID", icon: Fingerprint },
  { id: 3, title: "ID-handling", icon: FileCheck },
  { id: 4, title: "Foton", icon: Camera },
  { id: 5, title: "Profil", icon: Settings },
  { id: 6, title: "Granskning", icon: Clock },
  { id: 7, title: "Klar", icon: CheckCircle },
];

const availableTimes = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

const BecomeSantaOnboarding = () => {
  const navigate = useNavigate();
  const { user, role, loading: authLoading } = useCurrentUser();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  
  // BankID state
  const [bankIdVerifying, setBankIdVerifying] = useState(false);
  const [bankIdVerified, setBankIdVerified] = useState(false);
  
  // File upload states
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [idDocumentUrl, setIdDocumentUrl] = useState<string | null>(null);
  const [portraitPhoto, setPortraitPhoto] = useState<File | null>(null);
  const [portraitPhotoUrl, setPortraitPhotoUrl] = useState<string | null>(null);
  const [costumePhoto, setCostumePhoto] = useState<File | null>(null);
  const [costumePhotoUrl, setCostumePhotoUrl] = useState<string | null>(null);
  
  // Profile state
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [profile, setProfile] = useState({
    pricePerQuarter: "",
    bio: "",
    experience: "",
  });

  // File input refs
  const idInputRef = useRef<HTMLInputElement>(null);
  const portraitInputRef = useRef<HTMLInputElement>(null);
  const costumeInputRef = useRef<HTMLInputElement>(null);

  // Load existing application on mount
  useEffect(() => {
    if (user && !authLoading) {
      loadExistingApplication();
    }
  }, [user, authLoading]);

  const loadExistingApplication = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('santa_applications')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error loading application:', error);
        return;
      }
      
      if (data) {
        setApplicationId(data.id);
        setBankIdVerified(data.bankid_verified);
        setIdDocumentUrl(data.id_document_url);
        setPortraitPhotoUrl(data.portrait_photo_url);
        setCostumePhotoUrl(data.costume_photo_url);
        setSelectedTimes(data.available_times || []);
        setProfile({
          pricePerQuarter: data.price_per_quarter?.toString() || "",
          bio: data.bio || "",
          experience: data.experience || "",
        });
        
        // Determine which step to resume from
        if (data.status === 'pending_review' || data.status === 'approved') {
          setCurrentStep(7);
        } else if (data.price_per_quarter && data.available_times?.length > 0) {
          setCurrentStep(6);
        } else if (data.portrait_photo_url && data.costume_photo_url) {
          setCurrentStep(5);
        } else if (data.id_document_url) {
          setCurrentStep(4);
        } else if (data.bankid_verified) {
          setCurrentStep(3);
        }
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const createOrUpdateApplication = async (updates: Record<string, unknown>) => {
    if (!user) return null;
    
    try {
      if (applicationId) {
        const { data, error } = await supabase
          .from('santa_applications')
          .update(updates)
          .eq('id', applicationId)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        const { data, error } = await supabase
          .from('santa_applications')
          .insert({ user_id: user.id, ...updates })
          .select()
          .single();
        
        if (error) throw error;
        setApplicationId(data.id);
        return data;
      }
    } catch (err) {
      console.error('Error saving application:', err);
      toast.error('Kunde inte spara ansökan');
      return null;
    }
  };

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    if (!user) return null;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${folder}/${Date.now()}.${fileExt}`;
    
    try {
      const { error: uploadError } = await supabase.storage
        .from('santa-uploads')
        .upload(fileName, file, { upsert: true });
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('santa-uploads')
        .getPublicUrl(fileName);
      
      return publicUrl;
    } catch (err) {
      console.error('Upload error:', err);
      toast.error('Kunde inte ladda upp filen');
      return null;
    }
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleTime = (time: string) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((t) => t !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  const simulateBankId = async () => {
    setBankIdVerifying(true);
    
    // Simulate BankID verification (in production, this would call a real BankID service)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = await createOrUpdateApplication({
      bankid_verified: true,
      bankid_verified_at: new Date().toISOString(),
    });
    
    if (result) {
      setBankIdVerified(true);
      toast.success('BankID-verifiering lyckades!');
    }
    
    setBankIdVerifying(false);
  };

  const handleIdUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIdDocument(file);
    setLoading(true);
    
    const url = await uploadFile(file, 'id-documents');
    if (url) {
      setIdDocumentUrl(url);
      await createOrUpdateApplication({ id_document_url: url });
      toast.success('ID-handling uppladdad');
    }
    
    setLoading(false);
  };

  const handlePortraitUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setPortraitPhoto(file);
    setLoading(true);
    
    const url = await uploadFile(file, 'portraits');
    if (url) {
      setPortraitPhotoUrl(url);
      await createOrUpdateApplication({ portrait_photo_url: url });
      toast.success('Porträttbild uppladdad');
    }
    
    setLoading(false);
  };

  const handleCostumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setCostumePhoto(file);
    setLoading(true);
    
    const url = await uploadFile(file, 'costumes');
    if (url) {
      setCostumePhotoUrl(url);
      await createOrUpdateApplication({ costume_photo_url: url });
      toast.success('Tomtebild uppladdad');
    }
    
    setLoading(false);
  };

  const handleSubmitProfile = async () => {
    setLoading(true);
    
    const result = await createOrUpdateApplication({
      price_per_quarter: parseInt(profile.pricePerQuarter),
      bio: profile.bio,
      experience: profile.experience,
      available_times: selectedTimes,
      status: 'pending_review',
      submitted_at: new Date().toISOString(),
    });
    
    if (result) {
      toast.success('Din ansökan har skickats in!');
      
      // Notify admin about new santa registration
      try {
        await supabase.functions.invoke('notify-admin-new-santa', {
          body: { user_id: user?.id }
        });
        console.log('Admin notification sent');
      } catch (notifyError) {
        console.error('Failed to send admin notification:', notifyError);
        // Don't block the user flow if notification fails
      }
      
      handleNext();
    }
    
    setLoading(false);
  };

  // Redirect to auth if not logged in
  if (!authLoading && !user) {
    return (
      <div className="min-h-screen bg-background">
        <SimpleHeader />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <div className="bg-card rounded-3xl p-8 shadow-soft">
              <Gift className="w-16 h-16 text-accent mx-auto mb-6" />
              <h1 className="font-serif text-2xl text-foreground mb-4">
                Bli jultomte hos Tomtebudet – <span className="text-gradient-gold">inför julen 2026</span>
              </h1>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Tomtebudet lanseras till julen 2026. Redan nu kan du som vill jobba som jultomte 
                skapa ett konto, bygga din profil och bli en del av vårt nätverk.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                När plattformen öppnar för bokningar kommer familjer kunna hitta och boka dig direkt 
                – tryggt, verifierat och organiserat.
              </p>
              <Button 
                variant="hero" 
                size="lg" 
                onClick={() => navigate('/auth?mode=signup&role=santa&returnTo=/bli-tomte')}
              >
                Skapa tomtekonto
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Har du redan ett konto?{" "}
                <button 
                  onClick={() => navigate('/auth?mode=login&returnTo=/bli-tomte')}
                  className="text-primary hover:underline"
                >
                  Logga in
                </button>
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={idInputRef}
        onChange={handleIdUpload}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={portraitInputRef}
        onChange={handlePortraitUpload}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={costumeInputRef}
        onChange={handleCostumeUpload}
        accept="image/*"
        className="hidden"
      />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Steps - Only show for steps 1-6 */}
          {currentStep < 7 && (
            <div className="mb-8 overflow-x-auto">
              <div className="flex items-center justify-between min-w-max md:min-w-0">
                {steps.slice(0, 6).map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors",
                          currentStep >= step.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <step.icon className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <span
                        className={cn(
                          "text-xs mt-2 font-medium hidden md:block",
                          currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < 5 && (
                      <div
                        className={cn(
                          "h-0.5 w-8 md:w-12 lg:w-20 mx-2",
                          currentStep > step.id ? "bg-primary" : "bg-muted"
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step Content */}
          <div className="bg-card rounded-3xl p-6 md:p-10 shadow-soft">
            {/* Step 1: Introduction */}
            {currentStep === 1 && (
              <div className="text-center max-w-2xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                  <Gift className="w-10 h-10 text-accent" />
                </div>
                
                <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                  Bli jultomte hos Tomtebudet – <span className="text-gradient-gold">inför julen 2026</span>
                </h1>
                
                <p className="text-muted-foreground text-lg mb-4">
                  Tomtebudet lanseras till julen 2026. Redan nu kan du som vill jobba som jultomte 
                  skapa ett konto, bygga din profil och bli en del av vårt nätverk.
                </p>
                <p className="text-muted-foreground text-lg mb-8">
                  När plattformen öppnar för bokningar kommer familjer kunna hitta och boka dig direkt 
                  – tryggt, verifierat och organiserat.
                </p>

                {/* Benefits */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-muted/30 rounded-xl p-5">
                    <Wallet className="w-8 h-8 text-accent mx-auto mb-3" />
                    <h3 className="font-medium text-foreground mb-1">Tjäna bra</h3>
                    <p className="text-sm text-muted-foreground">
                      Snittintäkt 8 500 kr per julafton
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-5">
                    <Calendar className="w-8 h-8 text-accent mx-auto mb-3" />
                    <h3 className="font-medium text-foreground mb-1">Flexibla tider</h3>
                    <p className="text-sm text-muted-foreground">
                      Du väljer när du vill arbeta
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-5">
                    <Star className="w-8 h-8 text-accent mx-auto mb-3" />
                    <h3 className="font-medium text-foreground mb-1">Skapa magi</h3>
                    <p className="text-sm text-muted-foreground">
                      Ge familjer oförglömliga minnen
                    </p>
                  </div>
                </div>

                {/* Requirements */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-left mb-8">
                  <h3 className="font-medium text-foreground mb-3">Vad som krävs</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      BankID för identitetsverifiering
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Giltig ID-handling
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Egen tomtedräkt
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Kärlek till barn och jul
                    </li>
                  </ul>
                </div>

                <Button variant="hero" size="xl" onClick={handleNext}>
                  Kom igång
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* Step 2: BankID */}
            {currentStep === 2 && (
              <div className="text-center max-w-lg mx-auto">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Fingerprint className="w-10 h-10 text-primary" />
                </div>
                
                <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                  Logga in med BankID
                </h2>
                
                <p className="text-muted-foreground mb-8">
                  För din och familjernas trygghet verifierar vi alla tomtar med BankID.
                  Din identitet behandlas säkert och konfidentiellt.
                </p>

                {!bankIdVerified ? (
                  <div className="space-y-6">
                    <div className="bg-muted/30 rounded-2xl p-8">
                      <div className="w-32 h-32 mx-auto mb-4 bg-background rounded-xl flex items-center justify-center border-2 border-dashed border-border">
                        {bankIdVerifying ? (
                          <Loader2 className="w-16 h-16 text-primary animate-spin" />
                        ) : (
                          <Fingerprint className="w-16 h-16 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {bankIdVerifying ? "Väntar på BankID..." : "Klicka nedan för att öppna BankID"}
                      </p>
                    </div>

                    <Button 
                      variant="hero" 
                      size="xl" 
                      className="w-full"
                      onClick={simulateBankId}
                      disabled={bankIdVerifying}
                    >
                      {bankIdVerifying ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Verifierar...
                        </>
                      ) : (
                        <>
                          <Fingerprint className="w-5 h-5" />
                          Öppna BankID
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-primary/10 rounded-2xl p-8">
                      <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-primary-foreground" />
                      </div>
                      <h3 className="font-medium text-foreground text-lg">Verifierad!</h3>
                      <p className="text-sm text-muted-foreground">
                        Din identitet har bekräftats med BankID
                      </p>
                    </div>

                    <Button variant="hero" size="xl" onClick={handleNext}>
                      Fortsätt
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                )}

                {/* Trust indicators */}
                <div className="flex items-center justify-center gap-2 mt-8 text-muted-foreground text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Säker verifiering • Krypterad anslutning</span>
                </div>
              </div>
            )}

            {/* Step 3: ID Upload */}
            {currentStep === 3 && (
              <div className="max-w-lg mx-auto">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <FileCheck className="w-10 h-10 text-primary" />
                  </div>
                  
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                    Ladda upp ID-handling
                  </h2>
                  
                  <p className="text-muted-foreground">
                    Ladda upp en tydlig bild på ditt körkort, pass eller nationellt ID-kort.
                  </p>
                </div>

                <div 
                  className={cn(
                    "border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer mb-6",
                    idDocumentUrl 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50 hover:bg-muted/30"
                  )}
                  onClick={() => idInputRef.current?.click()}
                >
                  {loading ? (
                    <div className="py-4">
                      <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">Laddar upp...</p>
                    </div>
                  ) : idDocumentUrl ? (
                    <div>
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-primary" />
                      </div>
                      <p className="font-medium text-foreground">ID-handling uppladdad</p>
                      <p className="text-sm text-muted-foreground mt-1">Klicka för att byta fil</p>
                    </div>
                  ) : (
                    <div>
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="font-medium text-foreground mb-1">Klicka för att ladda upp</p>
                      <p className="text-sm text-muted-foreground">eller dra och släpp filen här</p>
                      <p className="text-xs text-muted-foreground mt-2">JPG, PNG • Max 10 MB</p>
                    </div>
                  )}
                </div>

                {/* Security note */}
                <div className="bg-muted/30 rounded-xl p-4 flex items-start gap-3 mb-8">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Tryggt och säkert</p>
                    <p className="text-xs text-muted-foreground">
                      Din ID-handling används endast för verifiering och raderas efter granskning.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={handleBack} className="flex-1">
                    <ChevronLeft className="w-4 h-4" />
                    Tillbaka
                  </Button>
                  <Button 
                    variant="hero" 
                    onClick={handleNext} 
                    disabled={!idDocumentUrl || loading}
                    className="flex-1"
                  >
                    Fortsätt
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Photos */}
            {currentStep === 4 && (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Camera className="w-10 h-10 text-primary" />
                  </div>
                  
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                    Ladda upp foton
                  </h2>
                  
                  <p className="text-muted-foreground">
                    Familjer vill se vem du är! Ladda upp ett porträtt och en bild i tomtedräkt.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Portrait */}
                  <div 
                    className={cn(
                      "border-2 border-dashed rounded-2xl p-6 text-center transition-colors cursor-pointer",
                      portraitPhotoUrl 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50 hover:bg-muted/30"
                    )}
                    onClick={() => portraitInputRef.current?.click()}
                  >
                    {portraitPhotoUrl ? (
                      <div>
                        <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                          <img 
                            src={portraitPhotoUrl} 
                            alt="Portrait"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="font-medium text-foreground">Porträtt uppladdat</p>
                        <p className="text-sm text-primary mt-1">Klicka för att byta</p>
                      </div>
                    ) : (
                      <div>
                        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                          <Camera className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-foreground mb-1">Porträttbild</p>
                        <p className="text-sm text-muted-foreground">Utan tomtedräkt</p>
                      </div>
                    )}
                  </div>

                  {/* Costume */}
                  <div 
                    className={cn(
                      "border-2 border-dashed rounded-2xl p-6 text-center transition-colors cursor-pointer",
                      costumePhotoUrl 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50 hover:bg-muted/30"
                    )}
                    onClick={() => costumeInputRef.current?.click()}
                  >
                    {costumePhotoUrl ? (
                      <div>
                        <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                          <img 
                            src={costumePhotoUrl} 
                            alt="Santa costume"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="font-medium text-foreground">Tomtebild uppladdad</p>
                        <p className="text-sm text-primary mt-1">Klicka för att byta</p>
                      </div>
                    ) : (
                      <div>
                        <div className="w-24 h-24 rounded-full bg-tomte-red/10 flex items-center justify-center mx-auto mb-4">
                          <span className="text-4xl">🎅</span>
                        </div>
                        <p className="font-medium text-foreground mb-1">I tomtedräkt</p>
                        <p className="text-sm text-muted-foreground">Visa din outfit</p>
                      </div>
                    )}
                  </div>
                </div>

                {loading && (
                  <div className="flex items-center justify-center gap-2 mb-4 text-primary">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Laddar upp foto...</span>
                  </div>
                )}

                <p className="text-sm text-muted-foreground text-center mb-8">
                  Tips: Välj bilder med bra ljus och en neutral bakgrund för bäst resultat.
                </p>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={handleBack} className="flex-1">
                    <ChevronLeft className="w-4 h-4" />
                    Tillbaka
                  </Button>
                  <Button 
                    variant="hero" 
                    onClick={handleNext} 
                    disabled={!portraitPhotoUrl || !costumePhotoUrl || loading}
                    className="flex-1"
                  >
                    Fortsätt
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Profile Settings */}
            {currentStep === 5 && (
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Settings className="w-10 h-10 text-primary" />
                  </div>
                  
                  <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                    Skapa din profil
                  </h2>
                  
                  <p className="text-muted-foreground">
                    Sätt ditt pris och berätta om dig själv för familjerna.
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Price */}
                  <div className="space-y-2">
                    <Label className="text-foreground">Pris per 15 minuter (kr)</Label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="t.ex. 650"
                        value={profile.pricePerQuarter}
                        onChange={(e) => setProfile({ ...profile, pricePerQuarter: e.target.value })}
                        className="bg-background pl-4 pr-12 h-12"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">kr</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Rekommenderat: 550–750 kr. Snittet i din region är 625 kr.
                    </p>
                  </div>

                  {/* Available times */}
                  <div className="space-y-3">
                    <Label className="text-foreground">Tillgängliga tider på julafton</Label>
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => toggleTime(time)}
                          className={cn(
                            "py-3 px-2 rounded-lg border-2 text-center text-sm transition-all",
                            selectedTimes.includes(time)
                              ? "border-primary bg-primary/5 text-foreground"
                              : "border-border hover:border-primary/50 text-muted-foreground"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Välj de tider du kan ta emot bokningar.
                    </p>
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label className="text-foreground">Presentation</Label>
                    <Textarea
                      placeholder="Berätta om dig själv och varför du vill bli tomte. Vad gör dina besök speciella?"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="bg-background resize-none min-h-[120px]"
                    />
                    <p className="text-sm text-muted-foreground">
                      Tips: Beskriv din erfarenhet och vad som driver dig.
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <Label className="text-foreground">Erfarenhet som tomte</Label>
                    <Input
                      placeholder="t.ex. 5 år som tomte"
                      value={profile.experience}
                      onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                      className="bg-background h-12"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button variant="outline" onClick={handleBack} className="flex-1">
                    <ChevronLeft className="w-4 h-4" />
                    Tillbaka
                  </Button>
                  <Button 
                    variant="hero" 
                    onClick={handleSubmitProfile}
                    disabled={!profile.pricePerQuarter || selectedTimes.length === 0 || loading}
                    className="flex-1"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Skickar...
                      </>
                    ) : (
                      <>
                        Skicka in
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 6: Review */}
            {currentStep === 6 && (
              <div className="text-center max-w-lg mx-auto">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-10 h-10 text-accent" />
                </div>
                
                <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                  Din ansökan granskas
                </h2>
                
                <p className="text-muted-foreground text-lg mb-8">
                  Tack för din ansökan! Vårt team går igenom dina uppgifter inom 24–48 timmar.
                </p>

                {/* Process steps */}
                <div className="bg-muted/30 rounded-2xl p-6 text-left mb-8">
                  <h3 className="font-medium text-foreground mb-4">Vad händer nu?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-foreground">ID-verifiering</p>
                        <p className="text-sm text-muted-foreground">Vi kontrollerar din ID-handling</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Bildgranskning</p>
                        <p className="text-sm text-muted-foreground">Vi ser över dina foton</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Profilgodkännande</p>
                        <p className="text-sm text-muted-foreground">Din profil publiceras och du kan börja ta emot bokningar</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8">
                  <p className="text-sm text-muted-foreground">
                    Du får ett mail när din profil är godkänd. Håll utkik i inkorgen!
                  </p>
                </div>

                <Button variant="hero" size="xl" onClick={handleNext}>
                  Förstått, visa bekräftelse
                </Button>
              </div>
            )}

            {/* Step 7: Done */}
            {currentStep === 7 && (
              <div className="text-center max-w-lg mx-auto py-8">
                {/* Celebration */}
                <div className="flex justify-center gap-2 mb-6">
                  <Sparkles className="w-6 h-6 text-accent animate-twinkle" />
                  <Sparkles className="w-8 h-8 text-accent animate-twinkle" style={{ animationDelay: "0.3s" }} />
                  <Sparkles className="w-6 h-6 text-accent animate-twinkle" style={{ animationDelay: "0.6s" }} />
                </div>

                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-accent" />
                </div>
                
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
                  Välkommen till <span className="text-gradient-gold">Tomtebudet!</span>
                </h2>
                
                <p className="text-muted-foreground text-lg mb-8">
                  Din ansökan är inskickad. Snart kan du börja sprida julglädje 
                  och skapa magiska ögonblick för familjer i ditt område.
                </p>

                {/* Summary card */}
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 mb-8 text-left border border-primary/20">
                  <h3 className="font-medium text-foreground mb-4 text-center">Din profil</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pris per 15 min</span>
                      <span className="font-medium text-foreground">{profile.pricePerQuarter || "650"} kr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tillgängliga tider</span>
                      <span className="font-medium text-foreground">{selectedTimes.length || "5"} tider</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span className="font-medium text-accent">Under granskning</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Button variant="hero" size="xl" onClick={() => navigate("/tomte-dashboard")}>
                    Gå till din dashboard
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mt-8">
                  🎄 Vi önskar dig en riktigt fin jul och ser fram emot att ha dig med oss!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BecomeSantaOnboarding;
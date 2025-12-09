import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, Mail, Sparkles, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Ange din e-postadress");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/aterstall-losenord`,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setSent(true);
        toast.success("Återställningslänk skickad!");
      }
    } catch (err) {
      toast.error("Ett fel uppstod. Försök igen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Link to="/" className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Gift className="w-8 h-8 text-accent" />
          <span className="font-serif text-2xl text-background">
            Tomte<span className="text-accent">budet</span>
          </span>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-background rounded-3xl p-8 md:p-10 shadow-2xl">
            {sent ? (
              /* Success State */
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h1 className="font-serif text-2xl text-foreground mb-4">
                  Kolla din inkorg
                </h1>
                <p className="text-muted-foreground mb-6">
                  Vi har skickat en återställningslänk till <strong className="text-foreground">{email}</strong>. 
                  Klicka på länken i mailet för att återställa ditt lösenord.
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  Fick du inget mail? Kolla din skräppost eller försök igen.
                </p>
                <div className="flex flex-col gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setSent(false)}
                    className="w-full"
                  >
                    Skicka igen
                  </Button>
                  <Link to="/login" className="w-full">
                    <Button variant="hero" className="w-full">
                      Tillbaka till inloggning
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              /* Form State */
              <>
                <div className="text-center mb-8">
                  <div className="flex justify-center gap-1 mb-4">
                    <Sparkles className="w-5 h-5 text-accent animate-twinkle" />
                    <Sparkles className="w-6 h-6 text-accent animate-twinkle" style={{ animationDelay: "0.2s" }} />
                    <Sparkles className="w-5 h-5 text-accent animate-twinkle" style={{ animationDelay: "0.4s" }} />
                  </div>
                  <h1 className="font-serif text-3xl text-foreground mb-2">
                    Glömt lösenord?
                  </h1>
                  <p className="text-muted-foreground">
                    Ange din e-postadress så skickar vi en länk för att återställa ditt lösenord.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">E-postadress</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="din@email.se"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12 h-14 bg-muted/30 border-border text-foreground placeholder:text-muted-foreground"
                        required
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="xl" 
                    className="w-full h-14 text-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Skickar...
                      </div>
                    ) : (
                      "Skicka återställningslänk"
                    )}
                  </Button>
                </form>

                <div className="mt-8">
                  <Link 
                    to="/login" 
                    className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Tillbaka till inloggning
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Back to home */}
          <div className="text-center mt-8">
            <Link to="/" className="text-background/70 hover:text-background transition-colors">
              ← Tillbaka till startsidan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
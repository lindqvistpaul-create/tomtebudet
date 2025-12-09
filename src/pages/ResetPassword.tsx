import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, Lock, Sparkles, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if we have a valid session from the reset link
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // If no session after coming from reset link, show error
      if (!session) {
        // Check URL for error parameters
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const errorDescription = hashParams.get('error_description');
        
        if (errorDescription) {
          setError(errorDescription);
        }
      }
    };

    checkSession();

    // Listen for auth state changes (when user clicks the reset link)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        // User clicked the reset link, they can now set a new password
        setError(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Lösenorden matchar inte");
      return;
    }

    if (password.length < 6) {
      toast.error("Lösenordet måste vara minst 6 tecken");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        toast.error(error.message);
      } else {
        setSuccess(true);
        toast.success("Lösenordet har uppdaterats!");
        
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 3000);
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
            {error ? (
              /* Error State */
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
                <h1 className="font-serif text-2xl text-foreground mb-4">
                  Länken har gått ut
                </h1>
                <p className="text-muted-foreground mb-8">
                  {error === "Email link is invalid or has expired" 
                    ? "Återställningslänken är ogiltig eller har gått ut. Begär en ny länk för att återställa ditt lösenord."
                    : error
                  }
                </p>
                <Link to="/glomt-losenord">
                  <Button variant="hero" className="w-full">
                    Begär ny länk
                  </Button>
                </Link>
              </div>
            ) : success ? (
              /* Success State */
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h1 className="font-serif text-2xl text-foreground mb-4">
                  Lösenordet uppdaterat!
                </h1>
                <p className="text-muted-foreground mb-8">
                  Ditt lösenord har ändrats. Du kan nu logga in med ditt nya lösenord.
                </p>
                <Link to="/login">
                  <Button variant="hero" className="w-full">
                    Gå till inloggning
                  </Button>
                </Link>
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
                    Nytt lösenord
                  </h1>
                  <p className="text-muted-foreground">
                    Ange ditt nya lösenord nedan.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">Nytt lösenord</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-12 h-14 bg-muted/30 border-border text-foreground placeholder:text-muted-foreground"
                        required
                        minLength={6}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Minst 6 tecken</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-foreground">Bekräfta lösenord</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Sparar...
                      </div>
                    ) : (
                      "Spara nytt lösenord"
                    )}
                  </Button>
                </form>
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

export default ResetPassword;
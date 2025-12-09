import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { Gift, Mail, Lock, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(returnTo);
    }
  }, [user, navigate, returnTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(
          error.message === "Invalid login credentials" 
            ? "Fel e-post eller lösenord" 
            : error.message
        );
      } else {
        toast.success("Välkommen tillbaka!");
        navigate(returnTo);
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

      {/* Login Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-background rounded-3xl p-8 md:p-10 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center gap-1 mb-4">
                <Sparkles className="w-5 h-5 text-accent animate-twinkle" />
                <Sparkles className="w-6 h-6 text-accent animate-twinkle" style={{ animationDelay: "0.2s" }} />
                <Sparkles className="w-5 h-5 text-accent animate-twinkle" style={{ animationDelay: "0.4s" }} />
              </div>
              <h1 className="font-serif text-3xl text-foreground mb-2">
                Logga in på Tomtebudet
              </h1>
              <p className="text-muted-foreground">
                Välkommen tillbaka! Logga in för att fortsätta.
              </p>
            </div>

            {/* Form */}
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

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Lösenord</Label>
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
                    Loggar in...
                  </div>
                ) : (
                  "Logga in"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-4 text-muted-foreground">eller</span>
              </div>
            </div>

            {/* Sign up link */}
            <div className="text-center">
              <p className="text-muted-foreground">
                Har du inget konto?{" "}
                <Link 
                  to="/signup" 
                  className="text-primary font-semibold hover:underline"
                >
                  Skapa ett konto
                </Link>
              </p>
            </div>
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

export default Login;
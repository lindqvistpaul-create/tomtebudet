import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, UserRole } from "@/hooks/useAuth";
import { 
  Gift, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  Loader2,
  Users,
  Star,
  ChevronLeft,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { validatePassword } from "@/lib/passwordValidation";
import { PasswordStrengthIndicator } from "@/components/PasswordStrengthIndicator";

const Signup = () => {
  const [searchParams] = useSearchParams();
  const defaultRole = (searchParams.get("role") as UserRole) || null;
  const returnTo = searchParams.get("returnTo");
  
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(defaultRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(returnTo || "/");
    }
  }, [user, navigate, returnTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      toast.error("Välj vilken typ av konto du vill skapa");
      return;
    }

    if (!fullName.trim()) {
      toast.error("Vänligen ange ditt namn");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Lösenorden matchar inte");
      return;
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.errors[0] || "Lösenordet är för svagt");
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(email, password, fullName, selectedRole);
      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("Denna e-postadress är redan registrerad. Logga in istället.");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success(
          selectedRole === "santa" 
            ? "Välkommen! Nu kan du slutföra din tomteprofil." 
            : "Välkommen till Tomtebudet!"
        );
        
        // Redirect based on role
        if (selectedRole === "santa") {
          navigate("/bli-tomte");
        } else {
          navigate(returnTo || "/mina-bokningar");
        }
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

      {/* Signup Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          <div className="bg-background rounded-3xl p-8 md:p-10 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center gap-1 mb-4">
                <Sparkles className="w-5 h-5 text-accent animate-twinkle" />
                <Sparkles className="w-6 h-6 text-accent animate-twinkle" style={{ animationDelay: "0.2s" }} />
                <Sparkles className="w-5 h-5 text-accent animate-twinkle" style={{ animationDelay: "0.4s" }} />
              </div>
              <h1 className="font-serif text-3xl text-foreground mb-2">
                Skapa konto
              </h1>
              <p className="text-muted-foreground">
                {selectedRole 
                  ? selectedRole === "santa" 
                    ? "Registrera dig för att erbjuda dina tomtetjänster"
                    : "Registrera dig för att boka en tomte"
                  : "Välj hur du vill använda Tomtebudet"
                }
              </p>
            </div>

            {/* Role Selection */}
            {!selectedRole ? (
              <div className="space-y-4">
                {/* Customer Card */}
                <button
                  type="button"
                  onClick={() => setSelectedRole("customer")}
                  className="w-full p-6 rounded-2xl border-2 border-border bg-muted/20 hover:border-primary hover:bg-primary/5 transition-all text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Users className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-foreground mb-1">
                        Jag är familj som vill boka tomte
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Hitta och boka en verifierad tomte för julafton
                      </p>
                    </div>
                  </div>
                </button>

                {/* Santa Card */}
                <button
                  type="button"
                  onClick={() => setSelectedRole("santa")}
                  className="w-full p-6 rounded-2xl border-2 border-border bg-muted/20 hover:border-accent hover:bg-accent/5 transition-all text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <Star className="w-7 h-7 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-foreground mb-1">
                        Jag vill bli jultomte
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Sprid julglädje och tjäna extra pengar i jul
                      </p>
                    </div>
                  </div>
                </button>

                {/* Login link */}
                <div className="text-center pt-4">
                  <p className="text-muted-foreground">
                    Har du redan ett konto?{" "}
                    <Link 
                      to="/login" 
                      className="text-primary font-semibold hover:underline"
                    >
                      Logga in
                    </Link>
                  </p>
                </div>
              </div>
            ) : (
              /* Registration Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Selected Role Indicator */}
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-sm">Byt kontotyp</span>
                </button>

                <div className={cn(
                  "p-4 rounded-xl border-2 flex items-center gap-3",
                  selectedRole === "santa" 
                    ? "border-accent/30 bg-accent/5" 
                    : "border-primary/30 bg-primary/5"
                )}>
                  <CheckCircle className={cn(
                    "w-5 h-5",
                    selectedRole === "santa" ? "text-accent" : "text-primary"
                  )} />
                  <span className="font-medium text-foreground">
                    {selectedRole === "santa" ? "Tomtekonto" : "Familjekonto"}
                  </span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground">Namn</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder={selectedRole === "santa" ? "Kalle Jansen" : "Anna Andersson"}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-12 h-14 bg-muted/30 border-border text-foreground placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                </div>

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
                      minLength={8}
                    />
                  </div>
                  <PasswordStrengthIndicator password={password} />
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
                      Skapar konto...
                    </div>
                  ) : (
                    "Skapa konto"
                  )}
                </Button>

                {/* Login link */}
                <div className="text-center pt-2">
                  <p className="text-muted-foreground">
                    Har du redan ett konto?{" "}
                    <Link 
                      to="/login" 
                      className="text-primary font-semibold hover:underline"
                    >
                      Logga in
                    </Link>
                  </p>
                </div>
              </form>
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

export default Signup;
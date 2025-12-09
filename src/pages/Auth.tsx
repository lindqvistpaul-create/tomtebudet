import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, UserRole } from "@/hooks/useAuth";
import { Gift, Mail, Lock, User, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { validatePassword } from "@/lib/passwordValidation";
import { PasswordStrengthIndicator } from "@/components/PasswordStrengthIndicator";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const defaultRole = (searchParams.get("role") as UserRole) || "customer";
  const returnTo = searchParams.get("returnTo") || "/";
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultRole);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Inloggning misslyckades",
            description: error.message === "Invalid login credentials" 
              ? "Fel e-post eller lösenord" 
              : error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Välkommen tillbaka!",
            description: "Du är nu inloggad.",
          });
          navigate(returnTo);
        }
      } else {
        if (!fullName.trim()) {
          toast({
            title: "Namn saknas",
            description: "Vänligen ange ditt namn.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        // Validate password strength
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
          toast({
            title: "Lösenordet är för svagt",
            description: passwordValidation.errors[0] || "Välj ett starkare lösenord",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        const { error } = await signUp(email, password, fullName, selectedRole);
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Kontot finns redan",
              description: "Denna e-postadress är redan registrerad. Logga in istället.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Registrering misslyckades",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: selectedRole === "santa" 
              ? "Välkommen till Tomtebudet!" 
              : "Välkommen till Tomtebudet!",
            description: selectedRole === "santa"
              ? "Ditt tomtekonto har skapats. Nu kan du slutföra din profil."
              : "Ditt konto har skapats och du är nu inloggad.",
          });
          navigate(selectedRole === "santa" ? "/bli-tomte" : returnTo);
        }
      }
    } catch (err) {
      toast({
        title: "Ett fel uppstod",
        description: "Vänligen försök igen.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isSantaSignup = selectedRole === "santa";

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Simple Header */}
      <header className="p-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Gift className="w-7 h-7 text-accent" />
          <span className="font-serif text-xl text-snow">
            Tomte<span className="text-gradient-gold">budet</span>
          </span>
        </Link>
      </header>

      {/* Auth Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-3xl p-8 shadow-soft">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center gap-1 mb-4">
                <Sparkles className="w-5 h-5 text-accent" />
                <Sparkles className="w-6 h-6 text-accent" />
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                {isLogin ? "Välkommen tillbaka!" : isSantaSignup ? "Bli tomte" : "Skapa konto"}
              </h1>
              <p className="text-muted-foreground">
                {isLogin 
                  ? "Logga in för att se dina bokningar" 
                  : isSantaSignup
                    ? "Registrera dig för att erbjuda dina tomtetjänster"
                    : "Registrera dig för att boka en tomte"}
              </p>
            </div>

            {/* Role Toggle (only for signup) */}
            {!isLogin && (
              <div className="flex gap-2 mb-6 p-1 bg-muted rounded-xl">
                <button
                  type="button"
                  onClick={() => setSelectedRole("customer")}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                    selectedRole === "customer"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Boka tomte
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("santa")}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                    selectedRole === "santa"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Bli tomte
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Namn</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder={isSantaSignup ? "Kalle Jansen" : "Anna Andersson"}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 h-12 bg-background"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-postadress</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="din@email.se"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-background"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Lösenord</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 bg-background"
                    required
                    minLength={8}
                  />
                </div>
                {!isLogin && (
                  <PasswordStrengthIndicator password={password} />
                )}
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="xl" 
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Vänta...
                  </div>
                ) : (
                  isLogin ? "Logga in" : isSantaSignup ? "Registrera som tomte" : "Skapa konto"
                )}
              </Button>
            </form>

            {/* Toggle */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {isLogin ? "Har du inget konto?" : "Har du redan ett konto?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline font-medium"
                >
                  {isLogin ? "Skapa konto" : "Logga in"}
                </button>
              </p>
            </div>
          </div>

          {/* Back to home */}
          <div className="text-center mt-6">
            <Link to="/" className="text-snow/60 hover:text-snow transition-colors text-sm">
              ← Tillbaka till startsidan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
  requiredRole, 
  redirectTo = "/login" 
}: ProtectedRouteProps) => {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <p className="text-snow/60">Laddar...</p>
        </div>
      </div>
    );
  }

  // Not logged in - redirect to login with return URL
  if (!user) {
    const returnTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`${redirectTo}?returnTo=${returnTo}`} replace />;
  }

  // Check role requirement
  if (requiredRole && role !== requiredRole) {
    // Customer trying to access santa pages
    if (requiredRole === "santa" && role === "customer") {
      return (
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
          <div className="bg-card rounded-3xl p-8 max-w-md text-center shadow-soft">
            <h1 className="font-serif text-2xl text-foreground mb-4">
              Endast för tomtar
            </h1>
            <p className="text-muted-foreground mb-6">
              Den här sidan är bara tillgänglig för registrerade tomtar.
            </p>
            <a 
              href="/signup?role=santa" 
              className="text-primary hover:underline"
            >
              Vill du bli tomte? Registrera dig här →
            </a>
          </div>
        </div>
      );
    }
    
    // Santa trying to access customer-only pages (rare case)
    if (requiredRole === "customer" && role === "santa") {
      return <Navigate to="/tomte-dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;

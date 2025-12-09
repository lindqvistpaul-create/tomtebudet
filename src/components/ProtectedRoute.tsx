import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import AuthRequiredNotice from "@/components/AuthRequiredNotice";
import RoleNotAllowedNotice from "@/components/RoleNotAllowedNotice";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  redirectOnRoleMismatch?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  requiredRole,
  redirectOnRoleMismatch = false,
}: ProtectedRouteProps) => {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <p className="text-background/60">Laddar...</p>
        </div>
      </div>
    );
  }

  // Not logged in - show auth required notice
  if (!user) {
    const returnTo = location.pathname + location.search;
    return <AuthRequiredNotice returnTo={returnTo} />;
  }

  // Check role requirement
  if (requiredRole && role !== requiredRole) {
    // Option to redirect instead of showing notice
    if (redirectOnRoleMismatch) {
      if (role === "santa") {
        return <Navigate to="/tomte-dashboard" replace />;
      }
      return <Navigate to="/" replace />;
    }

    // Show role not allowed notice
    return (
      <RoleNotAllowedNotice 
        userRole={role as "customer" | "santa"} 
        requiredRole={requiredRole} 
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
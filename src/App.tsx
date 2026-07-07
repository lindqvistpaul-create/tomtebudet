import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { AuthProvider } from "@/hooks/useAuth";
import { usePageTracking } from "@/hooks/usePageTracking";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import PrelaunchInfo from "./pages/PrelaunchInfo";
import FamilyInterest from "./pages/FamilyInterest";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

// Non-critical routes are lazy-loaded to keep the initial bundle small
const SearchSantas = lazy(() => import("./pages/SearchSantas"));
const SantaProfile = lazy(() => import("./pages/SantaProfile"));
const BecomeSantaOnboarding = lazy(() => import("./pages/BecomeSantaOnboarding"));
const SantaDashboard = lazy(() => import("./pages/SantaDashboard"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorksPage"));
const PrivacySecurityPage = lazy(() => import("./pages/PrivacySecurityPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminOverview = lazy(() => import("./pages/admin/AdminOverview"));
const AdminBookings = lazy(() => import("./pages/admin/AdminBookings"));
const AdminSantas = lazy(() => import("./pages/admin/AdminSantas"));
const AdminSantaReview = lazy(() => import("./pages/admin/AdminSantaReview"));
const AdminFamilyInterest = lazy(() => import("./pages/admin/AdminFamilyInterest"));
const AdminCustomers = lazy(() => import("./pages/admin/AdminCustomers"));
const AdminCancellations = lazy(() => import("./pages/admin/AdminCancellations"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

const queryClient = new QueryClient();

// Component that handles page tracking
function PageTracker() {
  usePageTracking();
  return null;
}

// Minimal centered spinner shown while a lazy-loaded route loads
const RouteFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageTracker />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/sa-funkar-det" element={<HowItWorksPage />} />
            <Route path="/integritet-sakerhet" element={<PrivacySecurityPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/kopvillkor" element={<TermsPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/glomt-losenord" element={<ForgotPassword />} />
            <Route path="/aterstall-losenord" element={<ResetPassword />} />
            <Route path="/intresse-familj" element={<FamilyInterest />} />
            
            {/* Public santa profiles – live since Sept 1 */}
            <Route path="/sok" element={<SearchSantas />} />
            <Route path="/tomte/:id" element={<SantaProfile />} />

            {/* PRELAUNCH: Booking routes redirect to info page until Nov/Dec */}
            <Route path="/boka/:id" element={<PrelaunchInfo />} />
            <Route path="/betala/:id" element={<PrelaunchInfo />} />
            <Route path="/bekraftelse/:bookingId" element={<PrelaunchInfo />} />
            <Route path="/mina-bokningar" element={<PrelaunchInfo />} />
            
            {/* Protected routes - user account still works */}
            <Route path="/mitt-konto" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
            
            {/* Santa-only routes */}
            <Route path="/tomte-dashboard" element={
              <ProtectedRoute requiredRole="santa">
                <SantaDashboard />
              </ProtectedRoute>
            } />
            {/* Santa onboarding - public, handles own auth */}
            <Route path="/bli-tomte" element={<BecomeSantaOnboarding />} />
            
            {/* Admin-only routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminOverview />} />
              <Route path="granskning" element={<AdminSantaReview />} />
              <Route path="familjeintresse" element={<AdminFamilyInterest />} />
              <Route path="bokningar" element={<AdminBookings />} />
              <Route path="tomtar" element={<AdminSantas />} />
              <Route path="kunder" element={<AdminCustomers />} />
              <Route path="avbokningar" element={<AdminCancellations />} />
              <Route path="installningar" element={<AdminSettings />} />
            </Route>
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

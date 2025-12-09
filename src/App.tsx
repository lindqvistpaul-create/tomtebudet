import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import SearchSantas from "./pages/SearchSantas";
import SantaProfile from "./pages/SantaProfile";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./pages/MyBookings";
import BecomeSantaOnboarding from "./pages/BecomeSantaOnboarding";
import LogoShowcase from "./pages/LogoShowcase";
import SantaDashboard from "./pages/SantaDashboard";
import UserDashboard from "./pages/UserDashboard";
import PaymentPage from "./pages/PaymentPage";
import WizardDemo from "./pages/WizardDemo";
import IconShowcase from "./pages/IconShowcase";
import HowItWorksPage from "./pages/HowItWorksPage";
import PrivacySecurityPage from "./pages/PrivacySecurityPage";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/sa-funkar-det" element={<HowItWorksPage />} />
            <Route path="/integritet-sakerhet" element={<PrivacySecurityPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/glomt-losenord" element={<ForgotPassword />} />
            <Route path="/aterstall-losenord" element={<ResetPassword />} />
            <Route path="/sok" element={<SearchSantas />} />
            <Route path="/tomte/:id" element={<SantaProfile />} />
            <Route path="/wizard" element={<WizardDemo />} />
            <Route path="/ikoner" element={<IconShowcase />} />
            <Route path="/logotyp" element={<LogoShowcase />} />
            
            {/* Protected routes - any logged in user */}
            <Route path="/mitt-konto" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/boka/:id" element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            } />
            <Route path="/betala/:id" element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            } />
            <Route path="/bekraftelse/:bookingId" element={
              <ProtectedRoute>
                <BookingConfirmation />
              </ProtectedRoute>
            } />
            <Route path="/mina-bokningar" element={
              <ProtectedRoute>
                <MyBookings />
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
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

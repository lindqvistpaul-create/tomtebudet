import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sok" element={<SearchSantas />} />
          <Route path="/tomte/:id" element={<SantaProfile />} />
          <Route path="/boka/:id" element={<Booking />} />
          <Route path="/bekraftelse/:bookingId" element={<BookingConfirmation />} />
          <Route path="/mina-bokningar" element={<MyBookings />} />
          <Route path="/mitt-konto" element={<UserDashboard />} />
          <Route path="/bli-tomte" element={<BecomeSantaOnboarding />} />
          <Route path="/tomte-dashboard" element={<SantaDashboard />} />
          <Route path="/betala/:id" element={<PaymentPage />} />
          <Route path="/wizard" element={<WizardDemo />} />
          <Route path="/logotyp" element={<LogoShowcase />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

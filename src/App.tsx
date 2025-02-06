
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CompanyRegistration from "./pages/CompanyRegistration";
import HealthcareProviderRegistration from "./pages/HealthcareProviderRegistration";
import RegisterChoice from "./pages/RegisterChoice";
import BookAppointment from "./pages/BookAppointment";
import ProfileVerification from "./pages/ProfileVerification";
import CompanyDashboard from "./pages/CompanyDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import Search from "./pages/Search";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<RegisterChoice />} />
          <Route path="/register/company" element={<CompanyRegistration />} />
          <Route path="/register/provider" element={<HealthcareProviderRegistration />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/profile/verify" element={<ProfileVerification />} />
          <Route path="/dashboard/company" element={<CompanyDashboard />} />
          <Route path="/dashboard/provider" element={<ProviderDashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

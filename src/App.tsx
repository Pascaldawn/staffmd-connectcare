
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/AuthProvider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import CompanyRegistration from "./pages/CompanyRegistration";
import HealthcareProviderRegistration from "./pages/HealthcareProviderRegistration";
import RegisterChoice from "./pages/RegisterChoice";
import BookAppointment from "./pages/BookAppointment";
import ProfileVerification from "./pages/ProfileVerification";
import CompanyDashboard from "./pages/CompanyDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import Search from "./pages/Search";
import CompanyProfile from "./pages/profile/CompanyProfile";
import ProviderProfile from "./pages/profile/ProviderProfile";
import ScheduleAppointment from "./pages/ScheduleAppointment";
import AppointmentConfirmation from "./pages/AppointmentConfirmation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<RegisterChoice />} />
            <Route path="/register/company" element={<CompanyRegistration />} />
            <Route path="/register/provider" element={<HealthcareProviderRegistration />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/schedule-appointment" element={<ScheduleAppointment />} />
            <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
            <Route path="/profile/verify" element={<ProfileVerification />} />
            <Route path="/dashboard/company" element={<CompanyDashboard />} />
            <Route path="/dashboard/provider" element={<ProviderDashboard />} />
            <Route path="/profile/company" element={<CompanyProfile />} />
            <Route path="/profile/provider" element={<ProviderProfile />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

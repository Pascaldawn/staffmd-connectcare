
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
import CalendarConnected from "./pages/CalendarConnected";
import TermsOfService from "./pages/TermsOfService";
import Messaging from "./pages/Messaging";
import FeedbackForm from "./pages/reviews/FeedbackForm";
import Analytics from "./pages/Analytics";
import PaymentHistory from "./pages/payments/PaymentHistory";
import StaffAccounts from "./pages/company/StaffAccounts";
import ProcessPayment from "./pages/payments/ProcessPayment";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
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
            <Route path="/calendar-connected" element={<CalendarConnected />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/messaging" element={<Messaging />} />
            <Route path="/feedback/:appointmentId" element={<FeedbackForm />} />
            <Route path="/analytics" element={<Analytics />} />
            {/* New payment and staff-related routes */}
            <Route path="/payments/history" element={<PaymentHistory />} />
            <Route path="/company/staff" element={<StaffAccounts />} />
            <Route path="/payments/process/:appointmentId" element={<ProcessPayment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;

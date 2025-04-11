
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LoanApplication from "./pages/LoanApplication";
import LoanApplicationDashboardPage from "./pages/LoanApplicationDashboard";
import LoanOffersPage from "./pages/LoanOffers";
import CivilScoreCheckPage from "./pages/CivilScoreCheck";
import ProfilePage from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Applications from "./pages/Applications";
import Payments from "./pages/Payments";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/loan-application" element={<LoanApplication />} />
            <Route path="/loan-application-dashboard" element={<LoanApplicationDashboardPage />} />
            <Route path="/loan-offers" element={<LoanOffersPage />} />
            <Route path="/civil-score-check" element={<CivilScoreCheckPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

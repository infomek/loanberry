
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import { default as Login } from "./pages/Login";
import { default as Register } from "./pages/Register";
import { default as Dashboard } from "./pages/Dashboard";
import { default as LoanApplication } from "./pages/LoanApplication";
import { default as LoanApplicationDashboardPage } from "./pages/LoanApplicationDashboard";
import { default as LoanOffersPage } from "./pages/LoanOffers";
import { default as CivilScoreCheckPage } from "./pages/CivilScoreCheck";
import { default as ProfilePage } from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { default as Applications } from "./pages/Applications";
import { default as Payments } from "./pages/Payments";
import { default as Documents } from "./pages/Documents";
import { default as Settings } from "./pages/Settings";

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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

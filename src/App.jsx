import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PartnerDetail from "./pages/PartnerDetail";

const queryClient = new QueryClient();

// Get the base URL from the environment variable or use a default
const baseUrl = import.meta.env.BASE_URL || `/`;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <HashRouter basename={baseUrl}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partners/:slug" element={<PartnerDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
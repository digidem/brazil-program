import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PartnerDetail from "./pages/PartnerDetail";

const queryClient = new QueryClient();

// Get the base URL from the environment variable or use a default
const baseUrl = import.meta.env.BASE_URL || `/`;
console.log('Starting with Base URL:', baseUrl); // More descriptive logging

const App = () => {
  console.log('App component rendering'); // Debug render

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <HashRouter basename={baseUrl}>
          <div style={{minHeight: '100vh'}}> {/* Ensure content takes full height */}
            <Routes>
              <Route
                path="/"
                element={<Home />}
                onError={(error) => console.error('Route error:', error)}
              />
              <Route
                path="/partners/:slug"
                element={<PartnerDetail />}
                onError={(error) => console.error('Partner route error:', error)}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
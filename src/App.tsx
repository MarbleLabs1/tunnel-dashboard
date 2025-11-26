import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import PortForwarding from "./pages/PortForwarding";
import SystemMonitor from "./pages/SystemMonitor";
import NetworkInterfaces from "./pages/NetworkInterfaces";
import Services from "./pages/Services";
import Settings from "./pages/Settings";
import Docker from "./pages/Docker";
import FileManager from "./pages/FileManager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/monitor" element={<SystemMonitor />} />
            <Route path="/interfaces" element={<NetworkInterfaces />} />
            <Route path="/port-forwarding" element={<PortForwarding />} />
            <Route path="/docker" element={<Docker />} />
            <Route path="/files" element={<FileManager />} />
            <Route path="/services" element={<Services />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

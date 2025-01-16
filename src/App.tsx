import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Home from "@/pages/home";
import Inbox from "@/pages/inbox";
import Calendar from "@/pages/calendar";
import Settings from "@/pages/settings";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <div className="font-poppins w-full">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <SidebarProvider>
            <Login />
            <AppSidebar />
            <SidebarTrigger />
            <Router>
              <Routes>
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Router>
          </SidebarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

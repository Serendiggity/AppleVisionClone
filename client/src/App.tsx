import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";
import Dashboard from "./routes/Dashboard";
import Settings from "./routes/Settings";
import Background from "./components/Background";

/**
 * @component App
 * @description Main application component with routing
 * 
 * State diagram:
 * Dashboard --click avatar--> Settings
 *     ^                |
 *     |------ ESC / Save -------|
 */
function App() {
  const [location, setLocation] = useLocation();
  const [showSettings, setShowSettings] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState("");

  // Handle background changes
  const handleBackgroundChange = (url) => {
    setBackgroundUrl(url);
    document.documentElement.style.setProperty('--bg-url', `url(${url})`);
  };

  // Open settings
  const openSettings = () => {
    setShowSettings(true);
  };

  // Close settings
  const closeSettings = () => {
    setShowSettings(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Background url={backgroundUrl} />
        <div className="relative min-h-screen flex">
          <Switch>
            <Route path="/">
              <Dashboard openSettings={openSettings} />
              {showSettings && (
                <Settings 
                  isOpen={showSettings} 
                  onClose={closeSettings}
                  onBackgroundChange={handleBackgroundChange}
                />
              )}
            </Route>
            <Route path="*">
              <Dashboard openSettings={openSettings} />
            </Route>
          </Switch>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

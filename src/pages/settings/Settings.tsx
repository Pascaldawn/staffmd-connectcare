
import { Link } from "react-router-dom";
import { Moon, Sun, Globe, AccessibilityIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if dark mode is enabled
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark");
    
    toast({
      title: `${newMode ? "Dark" : "Light"} Mode Enabled`,
      description: `Switched to ${newMode ? "dark" : "light"} mode.`,
    });
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="grid gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sun className="h-5 w-5 mr-2 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
              Dark Mode
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span>Enable dark mode</span>
            <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
          </CardContent>
        </Card>

        <Link to="/settings/language">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Language Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              Choose your preferred language
            </CardContent>
          </Card>
        </Link>

        <Link to="/settings/accessibility">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AccessibilityIcon className="h-5 w-5 mr-2" />
                Accessibility Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              Customize accessibility preferences
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Settings;

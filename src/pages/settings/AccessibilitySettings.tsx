
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const AccessibilitySettings = () => {
  const [screenReader, setScreenReader] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState([16]);
  const { toast } = useToast();

  const handleSettingChange = (setting: string, value: boolean | number[]) => {
    switch (setting) {
      case "screenReader":
        setScreenReader(value as boolean);
        break;
      case "highContrast":
        setHighContrast(value as boolean);
        break;
      case "fontSize":
        setFontSize(value as number[]);
        break;
    }

    toast({
      title: "Settings Updated",
      description: "Your accessibility preferences have been saved.",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <Link
        to="/settings"
        className="inline-flex items-center text-primary hover:text-primary/90 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Settings
      </Link>

      <h1 className="text-3xl font-bold mb-8">Accessibility Settings</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Screen Reader Support</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span>Enable screen reader support</span>
            <Switch
              checked={screenReader}
              onCheckedChange={(value) => handleSettingChange("screenReader", value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>High Contrast Mode</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span>Enable high contrast mode</span>
            <Switch
              checked={highContrast}
              onCheckedChange={(value) => handleSettingChange("highContrast", value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Font Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Slider
                value={fontSize}
                onValueChange={(value) => handleSettingChange("fontSize", value)}
                min={12}
                max={24}
                step={1}
                className="w-full max-w-xs"
              />
              <div className="text-sm text-muted-foreground">
                Current size: {fontSize}px
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccessibilitySettings;

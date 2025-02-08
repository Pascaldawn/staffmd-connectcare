
import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, History } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Section {
  title: string;
  content: string;
}

const sections: Section[] = [
  {
    title: "1. Introduction",
    content: "Welcome to StaffMD. By using our service, you agree to these terms. Please read them carefully."
  },
  {
    title: "2. Use of Service",
    content: "Our platform connects healthcare providers with companies. Users must provide accurate information and maintain confidentiality of their accounts."
  },
  {
    title: "3. Healthcare Provider Terms",
    content: "Healthcare providers must maintain valid licenses and credentials. They are responsible for the accuracy of their availability and the quality of care provided."
  },
  {
    title: "4. Company Terms",
    content: "Companies must ensure proper use of the platform for their employees. They are responsible for maintaining accurate company information and managing appointments responsibly."
  },
  {
    title: "5. Privacy & Data",
    content: "We protect your data according to our privacy policy. Medical information is handled in compliance with relevant healthcare privacy laws."
  },
  {
    title: "6. Termination",
    content: "We reserve the right to terminate accounts that violate these terms. Users may also terminate their accounts at any time."
  }
];

export default function TermsOfService() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const handleAgree = () => {
    if (!agreed) {
      toast({
        title: "Please Accept Terms",
        description: "You must check the box to accept the terms of service.",
        variant: "destructive"
      });
      return;
    }

    // Store agreement timestamp in local storage
    const agreement = {
      timestamp: new Date().toISOString(),
      version: "1.0"
    };
    
    const existingAgreements = JSON.parse(localStorage.getItem("tosAgreements") || "[]");
    localStorage.setItem("tosAgreements", JSON.stringify([...existingAgreements, agreement]));

    toast({
      title: "Terms Accepted",
      description: "Thank you for accepting our terms of service."
    });
    
    navigate("/");
  };

  const showHistory = () => {
    const agreements = JSON.parse(localStorage.getItem("tosAgreements") || "[]");
    if (agreements.length === 0) {
      toast({
        title: "No Previous Agreements",
        description: "You haven't accepted the terms of service before."
      });
      return;
    }

    const formattedHistory = agreements
      .map((a: { timestamp: string, version: string }) => 
        `Version ${a.version} accepted on ${new Date(a.timestamp).toLocaleDateString()}`)
      .join("\n");

    toast({
      title: "Agreement History",
      description: formattedHistory
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-primary hover:text-primary/90 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="space-y-4 mb-8">
          {sections.map((section) => (
            <Collapsible
              key={section.title}
              open={openSections[section.title]}
              onOpenChange={() => toggleSection(section.title)}
              className="border rounded-lg bg-white"
            >
              <CollapsibleTrigger className="flex justify-between items-center w-full p-4 font-medium text-left">
                {section.title}
                {openSections[section.title] ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 text-gray-600">
                {section.content}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I have read and agree to the terms of service
          </label>
        </div>

        <div className="flex space-x-4">
          <Button onClick={handleAgree} className="flex-1">
            Accept Terms
          </Button>
          <Button
            variant="outline"
            onClick={showHistory}
            className="flex items-center gap-2"
          >
            <History className="h-4 w-4" />
            View History
          </Button>
        </div>
      </div>
    </div>
  );
}

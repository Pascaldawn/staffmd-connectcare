
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";
import { useAuth } from "./use-auth";
import { supabase } from "@/integrations/supabase/client";
import type { BasicInfo, CompanyDetails } from "@/types/company-registration";

export function useCompanyRegistration() {
  const [step, setStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState<BasicInfo | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBasicInfoSubmit = (values: BasicInfo) => {
    setBasicInfo(values);
    setStep(2);
  };

  const handleCompanyDetailsSubmit = async (values: CompanyDetails) => {
    if (!user || !user.id) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "User information is missing. Please log in again.",
      });
      return;
    }

    if (!basicInfo) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please complete the basic information step first.",
      });
      return;
    }

    try {
      // Update the user type and profile information in profiles
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          user_type: "company",
          first_name: basicInfo.contactPerson.split(" ")[0] || "",
          last_name: basicInfo.contactPerson.split(" ").slice(1).join(" ") || "",
        })
        .eq("id", user.id);

      if (profileError) {
        console.error("Error updating profile:", profileError.message);
        throw new Error("Failed to update user profile.");
      }

      // Create or update the company profile
      const { error: companyError } = await supabase
        .from("company_profiles")
        .upsert({
          id: user.id,
          company_name: basicInfo.companyName,
          industry: values.industry,
          company_size: values.size,
          location: `${values.region}, ${selectedCountry}`,
          contact_email: basicInfo.email,
          contact_phone: basicInfo.phone,
        });

      if (companyError) {
        console.error("Error creating company profile:", companyError.message);
        throw new Error("Failed to create company profile.");
      }

      // Success message and navigation
      toast({
        title: "Registration Successful",
        description: "Welcome to StaffMD! Your company profile has been created.",
      });
      navigate("/dashboard/company");
    } catch (error: any) {
      console.error("Error during registration:", error.message);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description:
          error.message || "There was a problem creating your profile. Please try again.",
      });
    }
  };

  return {
    step,
    setStep,
    basicInfo,
    selectedCountry,
    setSelectedCountry,
    handleBasicInfoSubmit,
    handleCompanyDetailsSubmit,
  };
}

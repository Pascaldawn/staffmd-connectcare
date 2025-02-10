
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
    if (!basicInfo) return;
    
    try {
      // First update the user type in profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          user_type: 'company',
          first_name: basicInfo.contactPerson.split(' ')[0],
          last_name: basicInfo.contactPerson.split(' ').slice(1).join(' ')
        })
        .eq('id', user?.id);

      if (profileError) throw profileError;

      // Then create the company profile
      const { error: companyError } = await supabase
        .from('company_profiles')
        .insert({
          id: user?.id,
          company_name: basicInfo.companyName,
          industry: values.industry,
          company_size: values.size,
          location: `${values.region}, ${values.country}`,
          contact_email: basicInfo.email,
          contact_phone: basicInfo.phone
        });

      if (companyError) throw companyError;

      toast({
        title: "Registration Successful",
        description: "Welcome to StaffMD! Your company profile has been created.",
      });

      navigate('/dashboard/company');
    } catch (error) {
      console.error('Error during registration:', error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "There was a problem creating your profile. Please try again.",
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

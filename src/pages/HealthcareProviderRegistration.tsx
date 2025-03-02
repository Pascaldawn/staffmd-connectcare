
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { RegistrationForm } from "@/components/provider/RegistrationForm";
import type { ProviderFormValues } from "@/schemas/provider-registration";

export default function HealthcareProviderRegistration() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const onSubmit = async (values: ProviderFormValues) => {
    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          user_type: 'provider',
          first_name: values.fullName.split(' ')[0],
          last_name: values.fullName.split(' ').slice(1).join(' ')
        })
        .eq('id', user?.id);

      if (profileError) throw profileError;

      const { error: providerError } = await supabase
        .from('healthcare_provider_profiles')
        .insert({
          id: user?.id,
          specialties: [values.specialization],
          license_number: values.licenseNumber,
          practice_name: values.practice,
          verification_status: 'pending'
        });

      if (providerError) throw providerError;

      toast({
        title: "Registration successful",
        description: "Please proceed to verify your medical credentials.",
      });
      
      navigate("/profile/verify");
    } catch (error) {
      console.error('Error during registration:', error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "There was a problem creating your profile. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-secondary hover:text-secondary/90 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home Page
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Healthcare Provider Registration</h1>
        
        <RegistrationForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}

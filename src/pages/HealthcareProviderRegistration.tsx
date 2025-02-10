
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stethoscope, Mail, Phone, User, Building2, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

const providerFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  specialization: z.string().min(1, "Please select a specialization"),
  licenseNumber: z.string().min(1, "License number is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  practice: z.string().min(2, "Practice name must be at least 2 characters"),
});

export default function HealthcareProviderRegistration() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const form = useForm<z.infer<typeof providerFormSchema>>({
    resolver: zodResolver(providerFormSchema),
    defaultValues: {
      fullName: "",
      specialization: "",
      licenseNumber: "",
      email: "",
      phone: "",
      practice: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof providerFormSchema>) => {
    try {
      // First update the user type in profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          user_type: 'provider',
          first_name: values.fullName.split(' ')[0],
          last_name: values.fullName.split(' ').slice(1).join(' ')
        })
        .eq('id', user?.id);

      if (profileError) throw profileError;

      // Then create the healthcare provider profile
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
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input className="pl-10" placeholder="Enter your full name" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialization</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your specialization" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general-practitioner">General Practitioner</SelectItem>
                      <SelectItem value="pediatrician">Pediatrician</SelectItem>
                      <SelectItem value="cardiologist">Cardiologist</SelectItem>
                      <SelectItem value="dermatologist">Dermatologist</SelectItem>
                      <SelectItem value="psychiatrist">Psychiatrist</SelectItem>
                      <SelectItem value="nurse-practitioner">Nurse Practitioner</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Stethoscope className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input className="pl-10" placeholder="Enter your license number" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="practice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Practice Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input className="pl-10" placeholder="Enter your practice name" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input className="pl-10" type="email" placeholder="Enter email address" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input className="pl-10" type="tel" placeholder="Enter phone number" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary/90 transition-colors"
            >
              Register as Healthcare Provider
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}

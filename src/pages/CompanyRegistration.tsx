
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Building2, Mail, Phone, User, ArrowLeft, ArrowRight, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const basicInfoSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  contactPerson: z.string().min(2, "Contact person name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

const companyDetailsSchema = z.object({
  industry: z.string().min(2, "Industry must be at least 2 characters"),
  size: z.string().min(1, "Please enter company size"),
  location: z.string().min(2, "Location must be at least 2 characters"),
});

export default function CompanyRegistration() {
  const [step, setStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState<z.infer<typeof basicInfoSchema> | null>(null);
  
  const basicForm = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
    },
  });

  const detailsForm = useForm<z.infer<typeof companyDetailsSchema>>({
    resolver: zodResolver(companyDetailsSchema),
    defaultValues: {
      industry: "",
      size: "",
      location: "",
    },
  });

  const onSubmitBasicInfo = (values: z.infer<typeof basicInfoSchema>) => {
    setBasicInfo(values);
    setStep(2);
  };

  const onSubmitDetails = (values: z.infer<typeof companyDetailsSchema>) => {
    console.log("Form submitted:", { ...basicInfo, ...values });
    // TODO: Handle complete form submission
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-primary hover:text-primary/90 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home Page
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Register Your Company</h1>
        
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="w-full absolute top-1/2 h-0.5 bg-gray-200" />
            <div className="relative flex justify-between w-full">
              <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                2
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium">Basic Information</span>
            <span className="text-sm font-medium">Company Details</span>
          </div>
        </div>

        {step === 1 ? (
          <Form {...basicForm}>
            <form onSubmit={basicForm.handleSubmit(onSubmitBasicInfo)} className="space-y-6">
              <FormField
                control={basicForm.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input className="pl-10" placeholder="Enter company name" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={basicForm.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input className="pl-10" placeholder="Enter contact person name" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={basicForm.control}
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
                control={basicForm.control}
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
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                Next Step
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </Form>
        ) : (
          <Form {...detailsForm}>
            <form onSubmit={detailsForm.handleSubmit(onSubmitDetails)} className="space-y-6">
              <FormField
                control={detailsForm.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input className="pl-10" placeholder="Enter your industry" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={detailsForm.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Size</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input className="pl-10" placeholder="Enter number of employees" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={detailsForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input className="pl-10" placeholder="Enter company location" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous Step
                </button>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  Complete Registration
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}

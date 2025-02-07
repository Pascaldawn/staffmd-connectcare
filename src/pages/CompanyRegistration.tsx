
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Building2, Mail, Phone, User, ArrowLeft, ArrowRight, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Industry options
const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Construction",
  "Transportation",
  "Entertainment",
  "Other"
];

// Staff size options
const staffSizes = [
  "2-50",
  "51-100",
  "101-200",
  "201-500",
  "Above 500"
];

// Country options (simplified list - can be expanded)
const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  // Add more countries as needed
];

// States by country (simplified - can be expanded)
const statesByCountry: { [key: string]: string[] } = {
  "United States": [
    "California",
    "New York",
    "Texas",
    "Florida",
    // Add more states
  ],
  "Canada": [
    "Ontario",
    "Quebec",
    "British Columbia",
    // Add more provinces
  ],
  "United Kingdom": [
    "England",
    "Scotland",
    "Wales",
    "Northern Ireland"
  ],
  "Australia": [
    "New South Wales",
    "Victoria",
    "Queensland",
    // Add more states
  ]
};

const basicInfoSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  contactPerson: z.string().min(2, "Contact person name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

const companyDetailsSchema = z.object({
  industry: z.string().min(1, "Please select an industry"),
  size: z.string().min(1, "Please select company size"),
  country: z.string().min(1, "Please select a country"),
  region: z.string().min(1, "Please select a state/region"),
});

export default function CompanyRegistration() {
  const [step, setStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState<z.infer<typeof basicInfoSchema> | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const { toast } = useToast();
  
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
      country: "",
      region: "",
    },
  });

  const onSubmitBasicInfo = (values: z.infer<typeof basicInfoSchema>) => {
    setBasicInfo(values);
    setStep(2);
  };

  const onSubmitDetails = async (values: z.infer<typeof companyDetailsSchema>) => {
    const completeData = { ...basicInfo, ...values };
    console.log("Form submitted:", completeData);
    
    // Show success notification
    toast({
      title: "Registration Successful",
      description: `A confirmation email has been sent to ${basicInfo?.email}`,
    });

    // TODO: Integrate with backend to:
    // 1. Save company data
    // 2. Send confirmation email
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {staffSizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={detailsForm.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedCountry(value);
                        // Reset region when country changes
                        detailsForm.setValue("region", "");
                      }} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={detailsForm.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State/Region</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a state/region" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectedCountry && statesByCountry[selectedCountry]?.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

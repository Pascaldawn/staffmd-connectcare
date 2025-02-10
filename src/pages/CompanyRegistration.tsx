
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCompanyRegistration } from "@/hooks/use-company-registration";
import { BasicInfoForm } from "@/components/company/BasicInfoForm";
import { CompanyDetailsForm } from "@/components/company/CompanyDetailsForm";

export default function CompanyRegistration() {
  const {
    step,
    setStep,
    basicInfo,
    selectedCountry,
    setSelectedCountry,
    handleBasicInfoSubmit,
    handleCompanyDetailsSubmit,
  } = useCompanyRegistration();

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
          <BasicInfoForm onSubmit={handleBasicInfoSubmit} />
        ) : (
          <CompanyDetailsForm
            onSubmit={handleCompanyDetailsSubmit}
            onBack={() => setStep(1)}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        )}
      </div>
    </div>
  );
}

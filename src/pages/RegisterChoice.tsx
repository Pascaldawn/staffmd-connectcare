
import { Building2, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegisterChoice() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Choose Registration Type</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Link 
            to="/register/company" 
            className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
          >
            <Building2 className="h-16 w-16 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">Register as Company</h2>
            <p className="text-gray-600">
              Register your business and manage healthcare benefits for your employees
            </p>
          </Link>

          <Link 
            to="/register/provider" 
            className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
          >
            <UserRound className="h-16 w-16 text-secondary mb-4" />
            <h2 className="text-xl font-semibold mb-2">Register as Healthcare Provider</h2>
            <p className="text-gray-600">
              Join our platform to provide telehealth services to companies
            </p>
          </Link>
        </div>

        <p className="text-sm text-gray-600">
          By registering, you agree to our{" "}
          <Link to="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>
        </p>
      </div>
    </div>
  );
}

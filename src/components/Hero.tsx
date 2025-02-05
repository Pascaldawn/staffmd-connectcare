
import { ArrowRight, Building2, UserRound, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Affordable Healthcare Solutions for Your Business
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect your employees with healthcare professionals through our secure telehealth platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link to="/register/company" className="btn-primary flex items-center justify-center gap-2">
              Register Your Company
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/register/provider" className="btn-secondary flex items-center justify-center gap-2">
              Join as Healthcare Provider
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Link 
            to="/register/company" 
            className="bg-white p-6 rounded-lg shadow-md card-hover transition-all hover:scale-105"
          >
            <Building2 className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Company Registration</h3>
            <p className="text-gray-600">
              Register your business and manage healthcare benefits for your employees
            </p>
          </Link>

          <div className="bg-white p-6 rounded-lg shadow-md card-hover">
            <UserRound className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Healthcare Providers</h3>
            <p className="text-gray-600">
              Connect with businesses and provide telehealth services to their employees
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md card-hover">
            <Calendar className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
            <p className="text-gray-600">
              Book appointments with healthcare professionals at your convenience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

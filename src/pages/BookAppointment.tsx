
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BookAppointment() {
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
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Book an Appointment</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 mb-4">
            Please log in with your company account to book appointments for your employees.
          </p>
          <Link
            to="/login"
            className="btn-primary inline-flex items-center justify-center"
          >
            Login to Book Appointments
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}

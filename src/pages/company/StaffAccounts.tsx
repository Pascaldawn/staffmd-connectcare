
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AddStaffForm } from "./components/AddStaffForm";
import StaffList from "./components/StaffList";

const StaffAccounts = () => {
  return (
    <div className="container mx-auto p-6">
      <Link
        to="/dashboard/company"
        className="inline-flex items-center text-primary hover:text-primary/90 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-8">Manage Staff Accounts</h1>

      <div className="grid gap-8">
        <div className="p-6 border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-6">Add New Staff Member</h2>
          <AddStaffForm />
        </div>
        
        <StaffList />
      </div>
    </div>
  );
};

export default StaffAccounts;

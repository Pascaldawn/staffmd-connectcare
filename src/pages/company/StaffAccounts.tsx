// src/pages/company/StaffAccounts.tsx

import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AddStaffForm } from "./components/AddStaffForm";
import StaffList from "./components/StaffList";
import { useState } from "react";
import { z } from "zod";

const staffFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  role: z.enum(["admin", "worker"]),
});

type StaffFormValues = z.infer<typeof staffFormSchema>;

const StaffAccounts = () => {
  const [staffList, setStaffList] = useState<StaffFormValues[]>([]);

  // Define the onSubmit handler
  const handleAddStaff = (values: StaffFormValues) => {
    // Add the new staff member to the list
    setStaffList((prevList) => [...prevList, values]);
    console.log("New staff added:", values);
  };

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

      <div className="grid gap-6">
        {/* Pass the 'onSubmit' prop to AddStaffForm */}
        <AddStaffForm onSubmit={handleAddStaff} />
        <StaffList staffList={staffList} />
      </div>
    </div>
  );
};

export default StaffAccounts;

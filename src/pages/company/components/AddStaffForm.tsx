import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddStaffForm = () => {
  const [newStaffEmail, setNewStaffEmail] = useState<string>(""); // State to store the email input
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addStaffMutation = useMutation({
    mutationFn: async (email: string): Promise<void> => {
      // Fetch the authenticated user
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error("Not authenticated");

      // Check if the provided email exists in the profiles table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id") // Select only the required field
        .eq("email", email)
        .single();

      if (profileError || !profile) {
        throw new Error("User not found");
      }

      // Insert the staff account with the user's ID and company ID
      const { error } = await supabase
        .from("staff_accounts")
        .insert({
          company_id: user.user.id,
          user_id: profile.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      // Invalidate the staff accounts query to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["staff-accounts"] });
      toast({
        title: "Staff member added successfully",
      });
      setNewStaffEmail(""); // Clear the input field after successful addition
    },
    onError: (error: any) => {
      // Show an error toast with the specific error message
      toast({
        title: "Error adding staff member",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    },
  });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate the email input
    if (!newStaffEmail.trim()) {
      toast({
        title: "Email is required",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newStaffEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Trigger the mutation with the validated email
    addStaffMutation.mutate(newStaffEmail);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Staff Member</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddStaff} className="flex gap-4">
          <Input
            type="email"
            placeholder="Enter staff member's email"
            value={newStaffEmail}
            onChange={(e) => setNewStaffEmail(e.target.value)} // Update the state on input change
            className="flex-1"
          />
          <Button type="submit" disabled={!newStaffEmail.trim()}>
            {/* Disable the button if the email input is empty */}
            <Plus className="h-4 w-4 mr-2" />
            Add Staff
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddStaffForm;

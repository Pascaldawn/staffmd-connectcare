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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Role } from "@/hooks/use-permissions";

const AddStaffForm = () => {
  const [newStaffEmail, setNewStaffEmail] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<Role>("worker");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addStaffMutation = useMutation({
    mutationFn: async ({ email, role }: { email: string; role: Role }) => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error("Not authenticated");

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email)
        .single();

      if (profileError || !profile) {
        throw new Error("User not found");
      }

      const { error } = await supabase
        .from("staff_accounts")
        .insert({
          company_id: user.user.id,
          user_id: profile.id,
          role: selectedRole
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-accounts"] });
      toast({
        title: "Staff member added successfully",
      });
      setNewStaffEmail("");
      setSelectedRole("worker");
    },
    onError: (error: Error) => {
      toast({
        title: "Error adding staff member",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    },
  });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();

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

    addStaffMutation.mutate({ email: newStaffEmail, role: selectedRole });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Staff Member</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddStaff} className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="email"
              placeholder="Enter staff member's email"
              value={newStaffEmail}
              onChange={(e) => setNewStaffEmail(e.target.value)}
              className="flex-1"
            />
            <Select
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value as Role)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="worker">Worker</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={!newStaffEmail.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Staff
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddStaffForm;


import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type StaffProfile = {
  first_name: string | null;
  last_name: string | null;
  id: string;
};

type StaffAccount = {
  id: string;
  company_id: string;
  user_id: string;
  staff: StaffProfile;
};

const StaffAccounts = () => {
  const [newStaffEmail, setNewStaffEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: staffAccounts, isLoading } = useQuery({
    queryKey: ['staff-accounts'],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('staff_accounts')
        .select(`
          *,
          staff:profiles!user_id(first_name, last_name, id)
        `)
        .eq('company_id', user.user.id);

      if (error) throw error;
      return data as StaffAccount[];
    }
  });

  const addStaffMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      // First, get the user profile by email
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (profileError || !profiles) {
        throw new Error('User not found');
      }

      const { error } = await supabase
        .from('staff_accounts')
        .insert({
          company_id: user.user.id,
          user_id: profiles.id
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff-accounts'] });
      toast({
        title: "Staff member added successfully",
      });
      setNewStaffEmail("");
    },
    onError: (error) => {
      toast({
        title: "Error adding staff member",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const removeStaffMutation = useMutation({
    mutationFn: async (staffId: string) => {
      const { error } = await supabase
        .from('staff_accounts')
        .delete()
        .eq('id', staffId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staff-accounts'] });
      toast({
        title: "Staff member removed successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error removing staff member",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStaffEmail) {
      addStaffMutation.mutate(newStaffEmail);
    }
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
        <Card>
          <CardHeader>
            <CardTitle>Add New Staff Member</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddStaff} className="flex gap-4">
              <Input
                type="email"
                placeholder="Staff member's email"
                value={newStaffEmail}
                onChange={(e) => setNewStaffEmail(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={!newStaffEmail}>
                <Plus className="h-4 w-4 mr-2" />
                Add Staff
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Staff Members</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              <div className="space-y-4">
                {staffAccounts?.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">
                        {account.staff.first_name} {account.staff.last_name}
                      </h3>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeStaffMutation.mutate(account.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {staffAccounts?.length === 0 && (
                  <p className="text-center text-muted-foreground">
                    No staff members added yet
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffAccounts;

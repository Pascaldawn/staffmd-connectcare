
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
  const [newStaffEmail, setNewStaffEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addStaffMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

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

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStaffEmail) {
      addStaffMutation.mutate(newStaffEmail);
    }
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
  );
};

export default AddStaffForm;

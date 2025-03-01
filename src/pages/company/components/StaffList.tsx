
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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

const StaffList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: staffAccounts, isLoading } = useQuery({
    queryKey: ["staff_accounts"],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("staff_accounts")
        .select(`
          id,
          company_id,
          user_id,
          staff:user_id (
            first_name,
            last_name,
            id
          )
        `)
        .eq("company_id", user.user.id);

      if (error) throw error;
      return (data || []) as StaffAccount[];
    },
  });

  const removeStaffMutation = useMutation({
    mutationFn: async (staffId: string) => {
      const { error } = await supabase
        .from("staff_accounts")
        .delete()
        .eq("id", staffId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-accounts"] });
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
    },
  });

  return (
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
                    {account.staff.first_name || "Unknown"}{" "}
                    {account.staff.last_name || "Unknown"}
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
  );
};

export default StaffList;

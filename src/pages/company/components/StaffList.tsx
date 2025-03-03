
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
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import type { StaffProfile } from "@/types/staff";

const StaffList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: staffMembers, isLoading } = useQuery({
    queryKey: ["staff-members"],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error("Not authenticated");

      // Get all staff members associated with the company where the current user is an admin
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_type", "staff")
        .eq("company_id", (
          await supabase
            .from("profiles")
            .select("company_id")
            .eq("id", user.user.id)
            .single()
        ).data?.company_id);

      if (error) throw error;
      return data as StaffProfile[];
    },
  });

  const removeStaffMutation = useMutation({
    mutationFn: async (staffId: string) => {
      const { error } = await supabase
        .from("profiles")
        .update({ company_id: null })
        .eq("id", staffId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-members"] });
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
            {staffMembers?.map((staff) => (
              <div
                key={staff.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <h3 className="font-medium">
                    {staff.first_name || "Unknown"} {staff.last_name || "Unknown"}
                  </h3>
                  <p className="text-sm text-muted-foreground">{staff.email}</p>
                  <Badge variant="outline">{staff.role}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-destructive/10"
                    onClick={() => removeStaffMutation.mutate(staff.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
            {!staffMembers?.length && (
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


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const staffFormSchema = z.object({
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  firstName: z.string().min(2, "First name must be at least 2 characters").nonempty("First name is required"),
  lastName: z.string().min(2, "Last name must be at least 2 characters").nonempty("Last name is required"),
  role: z.enum(["admin", "staff"]).default("staff"),
});

type StaffFormValues = z.infer<typeof staffFormSchema>;

export function AddStaffForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      role: "staff",
    },
  });

  const addStaffMutation = useMutation({
    mutationFn: async (values: StaffFormValues) => {
      const { data: currentUser } = await supabase.auth.getUser();
      if (!currentUser.user) throw new Error("Not authenticated");

      // Get the company profile
      const { data: companyProfile } = await supabase
        .from("company_profiles")
        .select("id")
        .eq("id", currentUser.user.id)
        .single();

      if (!companyProfile) throw new Error("Company profile not found");

      // First create the auth user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: Math.random().toString(36).slice(-8), // Generate a random password
        options: {
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
            is_staff: true,
          },
        },
      });

      if (signUpError) throw signUpError;
      if (!data.user) throw new Error("Failed to create user");

      // Update the profile with company information
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          company_id: companyProfile.id,
          role: values.role,
          user_type: "staff",
        })
        .eq("id", data.user.id);

      if (updateError) throw updateError;

      return data.user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff-members"] });
      form.reset();
      toast({
        title: "Staff member added successfully",
        description: "An email has been sent with login instructions.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error adding staff member",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: StaffFormValues) {
    addStaffMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="staff@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* First Name Field */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name Field */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role Field */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={addStaffMutation.isPending}
        >
          {addStaffMutation.isPending ? "Adding..." : "Add Staff Member"}
        </Button>
      </form>
    </Form>
  );
}

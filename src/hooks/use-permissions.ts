
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Permission = {
  id: string;
  name: string;
  description: string;
};

export type Role = 'admin' | 'manager' | 'worker';

export const usePermissions = (role?: Role) => {
  return useQuery({
    queryKey: ["permissions", role],
    queryFn: async () => {
      if (!role) return [];
      
      const { data, error } = await supabase
        .from('role_permissions')
        .select(`
          permission:permissions (
            id,
            name,
            description
          )
        `)
        .eq('role', role);

      if (error) throw error;
      
      return data?.map(d => d.permission) as Permission[] || [];
    },
    enabled: !!role
  });
};

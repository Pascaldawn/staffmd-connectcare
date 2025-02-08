
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useGoogleCalendar() {
  const { toast } = useToast();

  const connectCalendar = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke('google-calendar');
      
      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error connecting to Google Calendar:', error);
      toast({
        title: 'Error',
        description: 'Failed to connect to Google Calendar. Please try again.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  return { connectCalendar };
}

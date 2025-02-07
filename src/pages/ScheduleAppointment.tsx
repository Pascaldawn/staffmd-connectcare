
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { addDays, format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

export default function ScheduleAppointment() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const navigate = useNavigate();

  const { data: availableProviders } = useQuery({
    queryKey: ['providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('provider_availability')
        .select(`
          *,
          profiles:provider_id (
            first_name,
            last_name
          )
        `)
        .eq('is_available', true);
      
      if (error) throw error;
      return data;
    }
  });

  const handleBookAppointment = async () => {
    if (!date || !selectedTime) {
      toast({
        title: "Please select both date and time",
        variant: "destructive",
      });
      return;
    }

    try {
      // Convert date and time to UTC timestamp
      const [hours, minutes] = selectedTime.split(':');
      const startTime = new Date(date);
      startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + 1);

      const { error } = await supabase
        .from('appointments')
        .insert({
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          provider_id: availableProviders?.[0]?.provider_id // For now, just use the first available provider
        });

      if (error) throw error;

      toast({
        title: "Appointment Booked!",
        description: `Your appointment is scheduled for ${format(date, "MMMM d, yyyy")} at ${selectedTime}`,
      });
      
      navigate("/appointment-confirmation", { 
        state: { 
          date, 
          time: selectedTime 
        } 
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Error booking appointment",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const disabledDays = {
    before: new Date(),
    after: addDays(new Date(), 30),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-primary hover:text-primary/90 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Schedule an Appointment</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Select Date</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={disabledDays}
              className="rounded-md border"
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Select Time</h2>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            size="lg"
            onClick={handleBookAppointment}
            disabled={!date || !selectedTime}
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}

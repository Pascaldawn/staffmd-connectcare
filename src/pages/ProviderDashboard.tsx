import { DollarSign, Briefcase, Calendar, Users, MessageSquare, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Appointment {
  id: string;
  company_id: string;
  start_time: string;
  end_time: string;
  status: string;
}

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [completedAppointments, setCompletedAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchCompletedAppointments = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from("appointments")
        .select("id, company_id, start_time, end_time, status")
        .eq("provider_id", user.user.id)
        .eq("status", "completed")
        .not("id", "in", `(
          SELECT appointment_id 
          FROM reviews 
          WHERE reviewer_id = '${user.user.id}'
        )`);

      if (!error && data) {
        setCompletedAppointments(data);
      }
    };

    fetchCompletedAppointments();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Provider Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,650</div>
            <p className="text-xs text-muted-foreground">
              +$450 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Available Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              +3 new opportunities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Next in 3 hours
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>Your latest conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">General Hospital</p>
                  <p className="text-xs text-muted-foreground">Interested in your availability...</p>
                </div>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Medical Center Inc.</p>
                  <p className="text-xs text-muted-foreground">Thank you for your time...</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/messaging')}
                className="w-full mt-4 text-sm text-primary hover:underline"
              >
                View all messages
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connected Companies</CardTitle>
            <CardDescription>Recent collaborations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Users className="h-4 h-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">City Hospital</p>
                  <p className="text-xs text-muted-foreground">3 completed shifts</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="h-4 h-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Private Practice LLC</p>
                  <p className="text-xs text-muted-foreground">1 upcoming shift</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/messaging')}
                className="flex items-center w-full px-4 py-2 text-sm text-left transition-colors rounded-md hover:bg-muted mt-4"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Open Messages
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {completedAppointments.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
            <CardDescription>
              Share your feedback about completed appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      Appointment on {new Date(appointment.start_time).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(appointment.start_time).toLocaleTimeString()} - {new Date(appointment.end_time).toLocaleTimeString()}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => navigate(`/feedback/${appointment.id}`)}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Submit Review
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProviderDashboard;

import { Activity, Search, Users, Calendar, MessageSquare, Star } from "lucide-react";
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
  provider_id: string;
  start_time: string;
  end_time: string;
  status: string;
}

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [completedAppointments, setCompletedAppointments] = useState<Appointment[]>([]);
  
  useEffect(() => {
    const fetchCompletedAppointments = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from("appointments")
        .select("id, provider_id, start_time, end_time, status")
        .eq("company_id", user.user.id)
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
      <h1 className="text-3xl font-bold mb-6">Company Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              +2 since last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Collaborations</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +3 since last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Next appointment in 2 days
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
                  <p className="text-sm font-medium">Dr. Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">Regarding next week's schedule...</p>
                </div>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Dr. Michael Chen</p>
                  <p className="text-xs text-muted-foreground">Thanks for the opportunity...</p>
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
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and searches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <button className="flex items-center w-full px-4 py-2 text-sm text-left transition-colors rounded-md hover:bg-muted">
                <Search className="w-4 h-4 mr-2" />
                Search Healthcare Providers
              </button>
              <button className="flex items-center w-full px-4 py-2 text-sm text-left transition-colors rounded-md hover:bg-muted">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule New Appointment
              </button>
              <button 
                onClick={() => navigate('/messaging')}
                className="flex items-center w-full px-4 py-2 text-sm text-left transition-colors rounded-md hover:bg-muted"
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

export default CompanyDashboard;

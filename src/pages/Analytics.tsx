
import { useEffect, useState } from "react";
import { Download, Users, Calendar, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsData {
  total_appointments: number;
  completed_appointments: number;
  pending_appointments: number;
  total_reviews_received: number;
  average_rating_received: number | null;
}

const Analytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data, error } = await supabase
        .from("user_analytics")
        .select("*")
        .single();

      if (error) {
        console.error("Error fetching analytics:", error);
        toast({
          title: "Error",
          description: "Failed to load analytics data",
          variant: "destructive",
        });
      } else if (data) {
        setAnalytics(data);
      }
      setIsLoading(false);
    };

    fetchAnalytics();
  }, [toast]);

  const handleExport = () => {
    if (!analytics) return;

    const csvContent = `
      Metric,Value
      Total Appointments,${analytics.total_appointments}
      Completed Appointments,${analytics.completed_appointments}
      Pending Appointments,${analytics.pending_appointments}
      Total Reviews,${analytics.total_reviews_received}
      Average Rating,${analytics.average_rating_received || "N/A"}
    `.trim();

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "analytics-report.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Analytics report has been downloaded",
    });
  };

  if (isLoading) {
    return <div className="container mx-auto p-6">Loading analytics...</div>;
  }

  if (!analytics) {
    return <div className="container mx-auto p-6">No analytics data available.</div>;
  }

  const chartData = [
    {
      name: "Appointments",
      total: analytics.total_appointments,
      completed: analytics.completed_appointments,
      pending: analytics.pending_appointments,
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <Button onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.total_appointments}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.pending_appointments} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Completed Appointments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.completed_appointments}</div>
            <p className="text-xs text-muted-foreground">
              Success rate: {((analytics.completed_appointments / analytics.total_appointments) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.average_rating_received?.toFixed(1) || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              From {analytics.total_reviews_received} reviews
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Overview</CardTitle>
          <CardDescription>Distribution of appointments by status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" name="Completed" fill="#22c55e" />
                <Bar dataKey="pending" name="Pending" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;

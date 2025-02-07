
import { useLocation, Link } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AppointmentConfirmation() {
  const location = useLocation();
  const { date, time } = location.state || {};

  if (!date || !time) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600">Invalid Appointment Details</h1>
          <p className="mt-4">Please try booking your appointment again.</p>
          <Link to="/schedule-appointment" className="mt-4 btn-primary inline-block">
            Return to Booking
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/schedule-appointment"
          className="inline-flex items-center text-primary hover:text-primary/90 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Calendar
        </Link>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Appointment Confirmed!</CardTitle>
            <CardDescription>
              Your appointment has been successfully scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="font-medium">
                  {format(new Date(date), "EEEE, MMMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">{time}</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <Button asChild className="w-full">
                <Link to="/dashboard/company">Go to Dashboard</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">Return to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

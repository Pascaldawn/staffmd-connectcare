
import { DollarSign, Briefcase, Calendar, Users, MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const ProviderDashboard = () => {
  const navigate = useNavigate();

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
    </div>
  );
};

export default ProviderDashboard;

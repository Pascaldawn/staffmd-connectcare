
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentHistory = () => {
  const { data: payments, isLoading } = useQuery({
    queryKey: ['payments-history'],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          paid_by_profile:profiles!paid_by(first_name, last_name),
          paid_to_profile:profiles!paid_to(first_name, last_name),
          appointment:appointments(start_time)
        `)
        .or(`paid_by.eq.${user.user.id},paid_to.eq.${user.user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="container mx-auto p-6">
      <Link
        to="/"
        className="inline-flex items-center text-primary hover:text-primary/90 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-8">Payment History</h1>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments?.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      {format(new Date(payment.created_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      Consultation with {payment.paid_to_profile?.first_name} {payment.paid_to_profile?.last_name}
                      <br />
                      <span className="text-sm text-muted-foreground">
                        {payment.appointment?.start_time && 
                          format(new Date(payment.appointment.start_time), 'MMM d, yyyy h:mm a')}
                      </span>
                    </TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        payment.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentHistory;

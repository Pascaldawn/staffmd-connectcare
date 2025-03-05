import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const ProcessPayment = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'flutterwave' | 'paystack'>('bank_transfer');
  const [bankReference, setBankReference] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { data: appointment, isLoading } = useQuery({
    queryKey: ['appointment', appointmentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          provider_profile:profiles!provider_id(first_name, last_name, id)
        `)
        .eq('id', appointmentId)
        .single();

      if (error) throw error;
      return data;
    }
  });

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return { user, profile };
    }
  });

  const processPaperwork = async () => {
    if (!file || !appointment) return null;
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `payment-proofs/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('payment-proofs')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    return filePath;
  };

  const processPaymentMutation = useMutation({
    mutationFn: async () => {
      if (!appointment || !currentUser?.profile) throw new Error('No appointment or user data');

      if (paymentMethod === 'bank_transfer') {
        const proofUrl = file ? await processPaperwork() : null;

        const { error: paymentError } = await supabase
          .from('payments')
          .insert({
            appointment_id: appointmentId,
            amount: 100, // Replace with actual amount
            status: 'pending',
            payment_method: 'bank_transfer',
            bank_transfer_reference: bankReference,
            paid_by: (await supabase.auth.getUser()).data.user?.id,
            paid_to: appointment.provider_id,
            payment_proof_url: proofUrl,
            notes: notes
          });

        if (paymentError) throw paymentError;

        const { error: appointmentError } = await supabase
          .from('appointments')
          .update({ payment_status: 'pending_verification' })
          .eq('id', appointmentId);

        if (appointmentError) throw appointmentError;
      } else {
        const paymentEndpoint = paymentMethod === 'flutterwave' 
          ? 'flutterwave-payment'
          : 'paystack-payment';

        const response = await supabase.functions.invoke(paymentEndpoint, {
          body: {
            amount: 100, // Replace with actual amount
            email: currentUser.user.email,
            name: `${currentUser.profile.first_name} ${currentUser.profile.last_name}`,
            appointmentId,
          },
        });

        if (response.error) throw response.error;

        // Redirect to payment gateway
        if (paymentMethod === 'flutterwave' && response.data.data.link) {
          window.location.href = response.data.data.link;
        } else if (paymentMethod === 'paystack' && response.data.data.authorization_url) {
          window.location.href = response.data.data.authorization_url;
        }
      }
    },
    onError: (error) => {
      toast({
        title: "Error processing payment",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  if (isLoading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Link
        to="/dashboard/company"
        className="inline-flex items-center text-primary hover:text-primary/90 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-8">Process Payment</h1>

      <div className="grid gap-6 max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              {appointment?.start_time && (
                <>
                  Appointment scheduled for {format(new Date(appointment.start_time), 'MMMM d, yyyy h:mm a')}
                  <br />
                  with Dr. {appointment?.provider_profile?.first_name} {appointment?.provider_profile?.last_name}
                </>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Payment Method
                </label>
                <Select 
                  value={paymentMethod}
                  onValueChange={(value: 'bank_transfer' | 'flutterwave' | 'paystack') => setPaymentMethod(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="flutterwave">Flutterwave</SelectItem>
                    <SelectItem value="paystack">Paystack</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paymentMethod === 'bank_transfer' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Bank Transfer Reference
                    </label>
                    <Input
                      value={bankReference}
                      onChange={(e) => setBankReference(e.target.value)}
                      placeholder="Enter bank transfer reference"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Upload Payment Proof
                    </label>
                    <Input
                      type="file"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      accept="image/*,.pdf"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Additional Notes
                    </label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any additional information about the payment"
                    />
                  </div>
                </>
              )}

              <Button
                className="w-full"
                onClick={() => processPaymentMutation.mutate()}
                disabled={paymentMethod === 'bank_transfer' && (!bankReference || !file)}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {paymentMethod === 'bank_transfer' ? 'Submit Payment Proof' : 'Proceed to Payment'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProcessPayment;

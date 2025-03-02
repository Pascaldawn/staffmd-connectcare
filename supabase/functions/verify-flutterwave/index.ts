
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle CORS preflight requests
const handleCors = (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
};

Deno.serve(async (req) => {
  // Handle CORS
  const corsResult = handleCors(req);
  if (corsResult) return corsResult;

  try {
    const { transaction_id, tx_ref } = await req.json();
    
    if (!transaction_id || !tx_ref) {
      throw new Error('Missing required parameters');
    }

    // Verify payment with Flutterwave
    const verifyUrl = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;
    const verifyResponse = await fetch(verifyUrl, {
      headers: {
        'Authorization': `Bearer ${Deno.env.get('FLUTTERWAVE_SECRET_KEY')}`,
        'Content-Type': 'application/json',
      },
    });

    const verifyData = await verifyResponse.json();
    console.log('Flutterwave verification response:', verifyData);

    if (verifyData.status === 'success' && verifyData.data.status === 'successful') {
      // Create Supabase client
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Update payment and appointment status
      const { error: paymentError } = await supabase
        .from('payments')
        .update({
          status: 'completed',
          payment_date: new Date().toISOString(),
        })
        .eq('id', tx_ref);

      if (paymentError) throw paymentError;

      // Get the appointment_id from the payment
      const { data: paymentData } = await supabase
        .from('payments')
        .select('appointment_id')
        .eq('id', tx_ref)
        .single();

      if (paymentData?.appointment_id) {
        const { error: appointmentError } = await supabase
          .from('appointments')
          .update({ payment_status: 'paid' })
          .eq('id', paymentData.appointment_id);

        if (appointmentError) throw appointmentError;
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Payment verified successfully' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    throw new Error('Payment verification failed');
  } catch (error) {
    console.error('Error verifying Flutterwave payment:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

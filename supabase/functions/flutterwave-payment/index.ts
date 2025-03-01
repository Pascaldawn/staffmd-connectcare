
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentRequest {
  amount: number;
  email: string;
  name: string;
  appointmentId: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, email, name, appointmentId }: PaymentRequest = await req.json();

    const response = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('FLUTTERWAVE_SECRET_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tx_ref: `app_${appointmentId}_${Date.now()}`,
        amount,
        currency: 'NGN',
        payment_options: 'card,banktransfer',
        customer: {
          email,
          name,
        },
        customizations: {
          title: 'Healthcare Appointment Payment',
          description: 'Payment for healthcare consultation',
        },
        redirect_url: `${req.headers.get('origin')}/payments/verify`,
        meta: {
          appointment_id: appointmentId,
        },
      }),
    });

    const data = await response.json();
    console.log('Flutterwave payment initiated:', data);

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error) {
    console.error('Error processing Flutterwave payment:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
});

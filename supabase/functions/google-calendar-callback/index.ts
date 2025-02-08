
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_OAUTH_CLIENT_ID')!
const GOOGLE_CLIENT_SECRET = Deno.env.get('GOOGLE_OAUTH_CLIENT_SECRET')!
const REDIRECT_URI = `${SUPABASE_URL}/functions/v1/google-calendar-callback`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state') // This contains the user ID
    
    if (!code || !state) {
      throw new Error('No code or state provided')
    }

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    })

    const tokens = await tokenResponse.json()

    if (tokens.error) {
      throw new Error(`Token error: ${tokens.error}`)
    }

    // Update user profile with tokens
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    
    // Sync existing appointments for this user
    const { data: appointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select('*')
      .or(`provider_id.eq.${state},company_id.eq.${state}`)
      .eq('sync_status', 'pending')

    if (!appointmentsError && appointments) {
      for (const appointment of appointments) {
        try {
          const calendarEvent = {
            summary: `Medical Appointment`,
            description: appointment.notes || 'No additional details provided',
            start: {
              dateTime: appointment.start_time,
              timeZone: 'UTC',
            },
            end: {
              dateTime: appointment.end_time,
              timeZone: 'UTC',
            },
          }

          const eventResponse = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${tokens.access_token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(calendarEvent),
          })

          const eventData = await eventResponse.json()

          if (eventData.id) {
            await supabase
              .from('appointments')
              .update({
                calendar_event_id: eventData.id,
                sync_status: 'synced'
              })
              .eq('id', appointment.id)
          }
        } catch (error) {
          console.error('Error syncing appointment:', error)
        }
      }
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        google_calendar_token: tokens,
        google_refresh_token: tokens.refresh_token,
        is_calendar_connected: true,
      })
      .eq('id', state)

    if (updateError) throw updateError

    // Redirect to success page
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': '/calendar-connected',
      },
    })
  } catch (error) {
    console.error('Error in google-calendar-callback:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

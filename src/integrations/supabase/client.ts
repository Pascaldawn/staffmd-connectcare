// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pzlkzzivojcrfooelyky.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6bGt6eml2b2pjcmZvb2VseWt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5NTI4MzgsImV4cCI6MjA1NDUyODgzOH0.Z-3pP-Fea7L8PGbpmKK_KNa8pCB3hABiVohDeIKVNQU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
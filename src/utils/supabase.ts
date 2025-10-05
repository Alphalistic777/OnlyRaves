import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dxduspxozfuyvjtwrujo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4ZHVzcHhvemZ1eXZqdHdydWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MTMyOTIsImV4cCI6MjA2NjI4OTI5Mn0.vNg2zhwh_6O47l6kRXrZJymjNiH1TfyLfR0xXAsSUbU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
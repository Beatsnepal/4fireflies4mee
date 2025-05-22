
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ssaxfvlcpjygsdyymlvy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzYXhmdmxjcGp5Z3NkeXltbHZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NTgwMTgsImV4cCI6MjA2MzEzNDAxOH0.lpq3C8QCZT3aW3kDb5SgYmr0fS3cvXAyaQDIqsmMDFE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

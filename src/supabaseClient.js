import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ljjftkoyemmltqqwefpv.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqamZ0a295ZW1tbHRxcXdlZnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyMTE5MzgsImV4cCI6MjAzMzc4NzkzOH0.xuDpu36IF5SIblZx9H84Unzaoh8x01AwmvSA-6kPmpE';

export const supabase = createClient(supabaseUrl, supabaseKey);

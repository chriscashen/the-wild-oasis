import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zokmmaphnvkwkwipdorx.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpva21tYXBobnZrd2t3aXBkb3J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgwMDQ5MzIsImV4cCI6MjAwMzU4MDkzMn0.TFGSUewd_ddlqbgwsV42jPb-ULYB9o5W2I-EZ0oERFk`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

import { SupabaseClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config();

const supabase = new SupabaseClient(process.env.SUPABASE_URL!, process.env.SUPABASE_API!);
export default supabase;
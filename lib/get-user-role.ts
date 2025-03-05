import "server-only";
import { createClient } from "@/lib/supabse/server";

export async function getUserRole() {
  const supabase = await createClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (error) {
    console.error("Error fetching user role:", error);
    return null;
  }

  return data?.role || "regular"; 
}

import "server-only";
import { createClient } from "@/lib/supabse/server";

const getUserRole = async (): Promise<string | null> => {
  const supabase = await createClient();

  // ✅ Fetch the authenticated user
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error("Error fetching authenticated user:", userError);
    return null;
  }

  console.log("Authenticated User ID:", user.id); // 🔍 Debugging

  // ✅ Fetch the role from `users` table
  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching user role:", error);
    return null;
  }

  console.log("Fetched Role from DB:", data?.role || "regular"); // 🔍 Debugging

  return data?.role || "regular"; // Default to "regular" if role is missing
};

export default getUserRole;

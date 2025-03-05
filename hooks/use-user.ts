import { useEffect, useState, useCallback } from "react";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabse/client";

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const supabase = createClient();

  const fetchUser = useCallback(async () => {
    try {
      // ✅ Force a session refresh
      await supabase.auth.refreshSession();

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw userError;

      setUser(user);

      // ✅ Fetch the latest role from the `users` table
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      setRole(data.role); // ✅ Always get the live role from DB
    } catch (err) {
      setError(err as AuthError);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { loading, error, session, user, role };
};

export default useUser;

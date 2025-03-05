import { useEffect, useState, useCallback } from "react";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "jwt-decode";
import { createClient } from "@/lib/supabse/client";

type SupabaseJwtPayload = JwtPayload & {
  app_metadata: { role: string };
};

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const supabase = createClient();

  const fetchUser = useCallback(async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      if (!session) return;

      setSession(session);
      setUser(session.user);

      const decodedJwt = jwtDecode<SupabaseJwtPayload>(session.access_token);
      setRole(decodedJwt.app_metadata.role);
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

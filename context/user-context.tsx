"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabse/client";

type User = { name: string; avatar_url: string } | null;

const UserContext = createContext<{ user: User; loading: boolean }>({ user: null, loading: true });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("users").select("name, avatar_url").single();

      if (error || !data) return setLoading(false);

      setUser(data);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

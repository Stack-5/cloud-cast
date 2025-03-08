"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabse/client";
import type { User } from "@/types/user"; 

const UserContext = createContext<{ user: User | null; loading: boolean }>({
  user: null,
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("users")
        .select("id, email, role, name, avatar_url")
        .single();

      if (error || !data) {
        setLoading(false);
        return;
      }

      setUser(data);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

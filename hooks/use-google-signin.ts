"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabse/client";
import { toast } from "sonner";

const useGoogleSignIn = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [next, setNext] = useState<string | null>(null);
  const supabase = createClient();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const searchParams = new URLSearchParams(window.location.search);
    const nextParam = searchParams.get("next");
    if (nextParam) {
      setNext(nextParam);
    }
  }, []);

  const signInWithGoogle = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback${
            next ? `?next=${encodeURIComponent(next)}` : ""
          }`,
        },
      });
      if (error) throw error;
    } catch {
      toast.error("There was an error logging in with Google.");
      setIsGoogleLoading(false);
    }
  };

  return { isGoogleLoading, signInWithGoogle, isClient };
};

export default useGoogleSignIn;

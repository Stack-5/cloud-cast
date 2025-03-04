"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// Google Sign-in
const loginWithGoogle = async () => {
  "use server";
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error("Google login error:", error.message);
    redirect("/error");
  }
};

export { loginWithGoogle };

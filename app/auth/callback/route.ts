import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabse/server";

const handleAuthCode = async (code: string, origin: string, next: string) => {
  const supabase = await createClient();

  // Use the code with signInWithOAuth method to exchange it for a session
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback?code=${code}`,
    },
  });

  if (error) {
    console.error("Error during code exchange:", error);
    return `${origin}/auth/auth-code-error`;  // Redirect to error page
  }

  // If user session is obtained, redirect to the next URL
  return `${origin}${next}`;
};

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard/client";

  // Handle authentication code and perform the redirect
  const redirectUrl = code
    ? await handleAuthCode(code, origin, next)
    : `${origin}/auth/auth-code-error`;

  return NextResponse.redirect(redirectUrl);
};

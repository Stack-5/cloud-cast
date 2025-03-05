import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabse/server";

const handleAuthCode = async (code: string, origin: string, next: string) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  return error ? `${origin}/auth/auth-code-error` : `${origin}${next}`;
};

export const GET = async (request: Request) => {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  const redirectUrl = code ? await handleAuthCode(code, origin, next) : `${origin}/auth/auth-code-error`;
  return NextResponse.redirect(redirectUrl);
};

"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabse/client";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/authentication/icons";
import Image from "next/image";

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

const SigninButton = ({ isLoading, onClick }: { isLoading: boolean; onClick: () => void }) => (
  <Button
    type="button"
    onClick={onClick}
    disabled={isLoading}
    className="w-full bg-[#0052CC] hover:bg-[#0747A6] text-white flex items-center justify-center gap-2 py-2 rounded-md"
  >
    {isLoading ? (
      <Icons.loaderCircle className="mr-2 size-4 animate-spin" />
    ) : (
      <Image src="/google.svg" alt="Google Logo" width={20} height={20} />
    )}
    Sign in with Google
  </Button>
);

const Signin = () => {
  const { isGoogleLoading, signInWithGoogle, isClient } = useGoogleSignIn();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F5F7] px-4">
      <Card className="w-full max-w-sm shadow-lg p-6 bg-white border border-[#C1C7D0] rounded-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-[#172B4D]">
            Welcome to CloudCast
          </CardTitle>
          <CardDescription className="text-center text-sm text-[#6B778C]">
            Powered and developed by Five-Stacks
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-[#172B4D] mb-4">
            Sign in with your institutional email address (<b>@neu.edu.ph</b>)
          </p>
          {isClient && <SigninButton isLoading={isGoogleLoading} onClick={signInWithGoogle} />}
          <p className="mt-4 text-xs text-[#6B778C]">
            By signing in, you agree to our <span className="text-[#0052CC] hover:underline cursor-pointer">Terms of Service</span> and <span className="text-[#0052CC] hover:underline cursor-pointer">Privacy Policy</span>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;

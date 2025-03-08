"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabse/client";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image"; 

const SignInButton = () => {
  const pathname = usePathname();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch {
      toast.error("There was an error logging in with Google.");
      setIsLoading(false);
    }
  };

  if (pathname === "/signin") {
    return (
      <button
        type="button"
        onClick={signInWithGoogle}
        disabled={isLoading}
        className={cn(
          "w-full flex items-center justify-center gap-2 rounded-md bg-[#0052CC] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#0747A6] focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:ring-offset-2"
        )}
      >
        {isLoading ? (
          <span className="size-4 animate-spin border-2 border-white border-t-transparent rounded-full"></span>
        ) : (
          <Image src="/google.svg" alt="Google Logo" width={20} height={20} />
        )}
        Sign in with Google
      </button>
    );
  }

  return (
    <Link
      href="/signin"
      className={cn(
        "inline-flex items-center gap-2 rounded-md bg-[#0052CC] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#0747A6] focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:ring-offset-2"
      )}
    >
      <Image src="/google.svg" alt="Google Logo" width={20} height={20} />
      Sign in
    </Link>
  );
};

export default SignInButton;

"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabse/client";
import { Button } from "@/components/ui/button";

const SignOutButton = () => {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/signin");
    router.refresh();
  };

  return <Button className="w-full" onClick={handleLogout}>Sign out</Button>;
};

export default SignOutButton;

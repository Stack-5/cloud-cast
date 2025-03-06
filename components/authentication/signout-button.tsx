"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabse/client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const SignOutButton = () => {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.push("/signin");
    router.refresh();
  };

  return (
    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
      {loading ? "Signing out..." : "Sign out"}
    </DropdownMenuItem>
  );
};

export default SignOutButton;

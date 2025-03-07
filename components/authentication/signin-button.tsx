"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/authentication/icons";

const SignInButton = () => {
  const pathname = usePathname();
  const shouldRender = pathname !== "/signin";

  if (!shouldRender) return null;

  return (
    <Link
      href="/signin"
      className={cn(
        "inline-flex items-center gap-2 rounded-md bg-[#0052CC] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#0747A6] focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:ring-offset-2"
      )}
    >
      <Icons.logIn className="size-4 text-white" />
      Sign in
    </Link>
  );
};

export default SignInButton;

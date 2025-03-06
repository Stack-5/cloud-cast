"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/authentication/icons";

const SignInButton = () => {
  const pathname = usePathname();
  const shouldRender = pathname !== "/signin";

  if (!shouldRender) return null;

  return (
    <Link href="/signin" className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}>
      <Icons.logIn className="mr-2 size-3.5" />
      Sign in
    </Link>
  );
};

export default SignInButton;

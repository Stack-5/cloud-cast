"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SignInButton from "@/components/authentication/signin-button";

const Signin = () => {
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
          {/* ✅ Uses SignInButton */}
          <SignInButton />
          <p className="mt-4 text-xs text-[#6B778C]">
            By signing in, you agree to our <span className="text-[#0052CC] hover:underline cursor-pointer">Terms of Service</span> and <span className="text-[#0052CC] hover:underline cursor-pointer">Privacy Policy</span>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;

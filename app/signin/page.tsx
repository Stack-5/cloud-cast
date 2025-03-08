"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SignInButton from "@/components/authentication/signin-button";

const Signin = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F5F7] px-6 md:px-8">
      <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-lg p-6 md:p-8 bg-white border border-[#C1C7D0] rounded-md">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-2xl font-bold text-[#172B4D]">
            Welcome to CloudCast
          </CardTitle>
          <CardDescription className="text-center text-xs sm:text-sm text-[#6B778C]">
            Powered and developed by Five-Stacks
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-xs sm:text-sm text-[#172B4D] mb-4">
            Sign in with your institutional email address (<b>@neu.edu.ph</b>)
          </p>
          {/* ✅ Uses SignInButton */}
          <SignInButton />
          <p className="mt-4 text-[10px] sm:text-xs text-[#6B778C]">
            By signing in, you agree to our{" "}
            <span className="text-[#0052CC] hover:underline cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-[#0052CC] hover:underline cursor-pointer">
              Privacy Policy
            </span>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;

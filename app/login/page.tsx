"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { loginWithGoogle } from "./actions";
import Image from "next/image";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F4F5F7] px-4">
      <Card className="w-full max-w-sm shadow-lg p-6 bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Welcome to CloudCast</CardTitle>
          <CardDescription className="text-center text-sm text-[#172B4D]">
            Powered and developed by Five-Stacks
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-[#172B4D] mb-4">
            Sign in with your institutional email address (<b>@neu.edu.ph</b>)
          </p>
          
          {/* Google Sign-in Button */}
          <form action={loginWithGoogle}>
            <Button type="submit" className="w-full bg-[#0052CC] hover:bg-[#0747A6] text-white flex items-center justify-center gap-2 py-2">
              <Image src="/google.svg" alt="Google Logo" width={20} height={20} />
              Sign in with Google
            </Button>
          </form>

          <p className="mt-4 text-xs text-[#172B4D]">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

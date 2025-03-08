import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import getUserRole from "../get-user-role";

export const updateSession = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({ request });

  // Create a Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get the current user from Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is logged out, redirect to sign-in page
  if (!user) {
    const url = request.nextUrl.clone();
    if (
      !request.nextUrl.pathname.startsWith("/signin") &&
      !request.nextUrl.pathname.startsWith("/auth")
    ) {
      url.pathname = "/signin";
      url.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  // Get user role (fix: default to "employee" if null)
  const role = (await getUserRole()) || "employee";

  // Role-based dashboard paths
  const roleToDashboard: Record<string, string> = {
    admin: "/dashboard/admin",
    "product-manager": "/dashboard/product-manager",
    employee: "/dashboard/employee",
  };

  // Ensure role exists in the mapping
  const dashboardPath = roleToDashboard[role] || "/dashboard/employee";

  // Redirect users trying to access the wrong dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!request.nextUrl.pathname.startsWith(dashboardPath)) {
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }
  }

  // Redirect users who are already logged in and trying to access /signin
  if (user && request.nextUrl.pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  return supabaseResponse;
};

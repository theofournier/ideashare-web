import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "./database.types";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check auth condition
  const authRoutes = ["/login", "/register", "/forgot-password"];
  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Protected routes
  const protectedRoutes = [
    "/profiles/*",
    "/account",
    "/account/*",
    "/ideas/submit",
    "/ideas/*/edit",
  ];
  const isProtectedRoute = protectedRoutes.some((route) => {
    if (route.includes("*")) {
      const routeParts = route.split("*");
      return (
        request.nextUrl.pathname.startsWith(routeParts[0]) &&
        (routeParts.length === 1 ||
          request.nextUrl.pathname.endsWith(routeParts[1]))
      );
    }
    return request.nextUrl.pathname.startsWith(route);
  });

  // Admin routes
  const adminRoutes = ["/admin"];
  const isAdminRoute = adminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // Redirect if needed
  if (isAuthRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isAdminRoute && (!user || user.role !== "admin")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

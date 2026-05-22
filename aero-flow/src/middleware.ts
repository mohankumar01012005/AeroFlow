import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { createServerClient } from "@supabase/ssr";

export async function middleware(
  request: NextRequest
) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env
      .NEXT_PUBLIC_SUPABASE_URL!,

    process.env
      .NEXT_PUBLIC_SUPABASE_ANON_KEY!,

    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)
            ?.value;
        },

        set(
          name: string,
          value: string
        ) {
          request.cookies.set({
            name,
            value,
          });

          response =
            NextResponse.next({
              request,
            });

          response.cookies.set({
            name,
            value,
          });
        },

        remove(name: string) {
          request.cookies.set({
            name,
            value: "",
          });

          response =
            NextResponse.next({
              request,
            });

          response.cookies.set({
            name,
            value: "",
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const protectedRoutes = [
    "/booking",
    "/booking/seats",
    "/booking/passenger-details",
    "/booking/review",
    "/booking/success",
  ];

  const isProtectedRoute =
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(
        route
      )
    );

  if (
    isProtectedRoute &&
    !user
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/booking/:path*",
  ],
};
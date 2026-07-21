// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // 1. Check if the token cookie exists
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // 2. Define EXPLICIT public routes (Updated to match your actual route!)
  const publicRoutes = ['/auth/login', '/auth/signup'];
  
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // 3. IF NOT LOGGED IN & tries to access any protected route -> redirect to /auth/login
  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/auth/login', request.url); // 👈 FIXED HERE
    return NextResponse.redirect(loginUrl);
  }

  // 4. IF LOGGED IN & tries to access public auth routes -> redirect to /dashboard
  if (token && isPublicRoute) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// 5. Matcher configuration
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
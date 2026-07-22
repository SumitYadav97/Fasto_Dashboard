import { NextResponse } from 'next/server';
export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;
  // 1. DEFAULT ROUTE ('/'): Serve Login directly without changing the URL
  if (pathname === '/') {
    // If logged in, send them straight to dashboard
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // If not logged in, rewrite '/' to render your login page component
    return NextResponse.rewrite(new URL('/auth/login', request.url));
  }
  const authRoutes = ['/auth/login', '/auth/signup'];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  // 2. Protect private routes: Redirect unauthenticated users to '/' (which shows Login)
  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  // 3. Prevent logged-in users from visiting auth pages explicitly
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
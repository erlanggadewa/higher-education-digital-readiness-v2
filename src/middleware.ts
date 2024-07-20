import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export default withAuth(
  function middleware(request) {
    if (request.nextauth.token?.role === 'reviewer') {
      if (request.nextUrl.pathname.startsWith('/reviewer')) return NextResponse.next();
      return NextResponse.redirect(new URL('/reviewer', request.url));
    }
    if (request.nextauth.token?.role === 'campus') {
      if (request.nextUrl.pathname.startsWith('/campus')) return NextResponse.next();
      return NextResponse.redirect(new URL('/campus', request.url));
    }
    if (request.nextauth.token?.role === 'admin') {
      if (request.nextUrl.pathname.startsWith('/admin')) return NextResponse.next();
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/admin/:path*', '/campus/:path*', '/reviewer/:path*'],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  // Bảo vệ route: Chỉ cho vào trang courses khi đã auth 
  if (!token && pathname.startsWith('/courses')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Nếu đã login thì không cho quay lại trang login [cite: 17]
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/courses', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/courses/:path*', '/login'],
};
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  // Bảo vệ các route courses
  if (!token && pathname.startsWith('/courses')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Chặn user đã login vào lại trang login
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/courses', request.url));
  }

  return NextResponse.next();
}

// Config này cực kỳ quan trọng để Next.js phân biệt với Proxy
export const config = {
  matcher: [
    /*
     * Khớp tất cả các request trừ:
     * - api (các route api nội bộ)
     * - _next/static (file tĩnh)
     * - _next/image (tối ưu ảnh)
     * - favicon.ico (icon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
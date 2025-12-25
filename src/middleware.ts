import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  // 1. Nếu đã đăng nhập mà cố vào trang login -> Đẩy về trang danh sách
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/courses', request.url));
  }

  // 2. Nếu chưa đăng nhập mà vào các trang quản lý -> Đẩy về trang login
  if (!token && pathname.startsWith('/courses')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. Trang chủ mặc định sẽ đẩy về trang login hoặc danh sách tùy trạng thái
  if (pathname === '/') {
    return NextResponse.redirect(new URL(token ? '/courses' : '/login', request.url));
  }

  return NextResponse.next();
}

// Chỉ định các đường dẫn mà middleware sẽ chạy qua
export const config = {
  matcher: ['/', '/login', '/courses/:path*'],
};
import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

  const {pathname} = req.nextUrl;

  const publicPaths = ['/', '/about', '/signup'];

  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)', // Apply to all paths except these
  ],
};

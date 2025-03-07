import { NextRequest, NextResponse, userAgent } from 'next/server';

export default function middleware(req: NextRequest): NextResponse | undefined {
  const { isBot } = userAgent(req);

  if (isBot) {
    return NextResponse.rewrite('/404');
  } else {
    const requestHeaders = new Headers(req.headers);

    return NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    });
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

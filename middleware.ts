import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/', '/forgot-password', '/_next', '/api', '/static'];
const PROTECTED_PREFIXES = ['/shop', '/subscriptions', '/account', '/cart', '/wishlist', '/orders', '/appointments', '/checkout'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // If visiting root, redirect to login if not authenticated
  if (pathname === '/') {
    const token = req.cookies.get('moms_sb_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    // Authenticated users should go to root home page
    return NextResponse.next();
  }

  // Allow public assets and the auth pages
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // If the path is one of the protected prefixes, ensure cookie exists
  const requiresAuth = PROTECTED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p));
  if (!requiresAuth) {
    return NextResponse.next();
  }

  const token = req.cookies.get('moms_sb_token')?.value;
  if (!token) {
    const homeUrl = new URL('/', req.url);
    homeUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(homeUrl);
  }

  // Validate token with Supabase Auth endpoint to ensure it's still valid
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) return NextResponse.redirect(new URL('/', req.url));
    const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    if (res.status !== 200) {
      const homeUrl = new URL('/', req.url);
      homeUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(homeUrl);
    }
  } catch (e) {
    const homeUrl = new URL('/', req.url);
    homeUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

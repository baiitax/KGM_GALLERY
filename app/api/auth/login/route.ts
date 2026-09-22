import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/session';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required.' }, { status: 400 });
    }

    const user = AuthService.authenticate(email, password);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid credentials. Please check your email and password.' }, { status: 401 });
    }

    const { passwordHash, ...userSafe } = user;

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      user: userSafe,
      token: `kgm_tok_${user.id}_${Date.now()}`,
    });

    // Set auth cookie
    response.cookies.set('kgm_auth_user', JSON.stringify(userSafe), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

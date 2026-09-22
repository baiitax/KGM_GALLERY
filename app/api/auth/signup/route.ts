import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/session';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, fullName, role } = body;

    if (!email || !password || !fullName) {
      return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    const newUser = AuthService.register({ email, password, fullName, role });
    const { passwordHash, ...userSafe } = newUser;

    const response = NextResponse.json({
      success: true,
      message: 'Account registered successfully',
      user: userSafe,
      token: `kgm_tok_${newUser.id}_${Date.now()}`,
    });

    response.cookies.set('kgm_auth_user', JSON.stringify(userSafe), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

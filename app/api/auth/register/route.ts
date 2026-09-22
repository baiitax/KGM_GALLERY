import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/session';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, fullName, role, department, organization, invitationToken } = body;

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { success: false, error: 'Full name, work email, and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    const user = AuthService.register({
      email,
      password,
      fullName,
      role,
      department,
      organization,
      invitationToken,
    });

    const { passwordHash, ...userSafe } = user;

    const response = NextResponse.json({
      success: true,
      message: 'Account created successfully. Welcome to KGM Cinematic Studio OS.',
      user: userSafe,
      token: `kgm_tok_${user.id}_${Date.now()}`,
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

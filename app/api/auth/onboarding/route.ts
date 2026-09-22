import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/session';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, role, preferences } = body;

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required.' }, { status: 400 });
    }

    const updated = AuthService.completeOnboarding(userId, role, preferences);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 });
    }

    const { passwordHash, ...userSafe } = updated;

    const response = NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully.',
      user: userSafe,
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
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

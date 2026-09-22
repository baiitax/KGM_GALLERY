import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/session';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json({ success: false, error: 'Reset token and new password are required.' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ success: false, error: 'Password must be at least 8 characters long.' }, { status: 400 });
    }

    const success = AuthService.resetPassword(token, password);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Invalid or expired password reset token.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully. You may now authenticate with your new credentials.',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

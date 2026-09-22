import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/session';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, code, action } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required.' }, { status: 400 });
    }

    if (action === 'resend') {
      const newCode = AuthService.requestVerificationCode(email);
      return NextResponse.json({
        success: true,
        message: 'A new 6-digit verification code has been dispatched to your work inbox.',
        codePreview: newCode,
      });
    }

    if (!code) {
      return NextResponse.json({ success: false, error: 'Verification code is required.' }, { status: 400 });
    }

    const verified = AuthService.verifyCode(email, code);
    if (!verified) {
      return NextResponse.json({ success: false, error: 'Invalid or expired 6-digit verification code.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Account verified successfully. Access granted to KGM Studio OS.',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

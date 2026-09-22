import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/session';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Work email is required.' }, { status: 400 });
    }

    const token = AuthService.requestPasswordReset(email);

    return NextResponse.json({
      success: true,
      message: 'If an account exists with this email, security instructions and a reset token have been dispatched.',
      tokenPreview: token, // Returned for dev and demo convenience
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

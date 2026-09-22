import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/session';

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.match(/kgm_auth_user=([^;]+)/);
    
    if (match) {
      try {
        const decoded = JSON.parse(decodeURIComponent(match[1]));
        return NextResponse.json({ success: true, user: decoded });
      } catch (e) {
        // Fall through
      }
    }

    // Default to the executive director profile if no session
    const defaultDirector = AuthService.getAllUsers()[0];
    return NextResponse.json({ success: true, user: defaultDirector });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

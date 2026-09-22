import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/session';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (token) {
    const inv = AuthService.getInvitationByToken(token);
    if (!inv) {
      return NextResponse.json({ success: false, error: 'Invitation token is invalid or has expired.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, invitation: inv });
  }

  const invitations = AuthService.getAllInvitations();
  return NextResponse.json({ success: true, invitations });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, fullName, role, department, invitedBy, accessPolicy } = body;

    if (!email || !fullName || !role) {
      return NextResponse.json(
        { success: false, error: 'Full name, work email, and role are required to issue an invitation.' },
        { status: 400 }
      );
    }

    const invitation = AuthService.createInvitation({
      email,
      fullName,
      role,
      department: department || 'Production',
      invitedBy: invitedBy || 'Studio Administrator',
      accessPolicy: accessPolicy || 'permanent',
    });

    return NextResponse.json({
      success: true,
      message: `Invitation successfully dispatched to ${email}`,
      invitation,
      activationUrl: `/auth/register?token=${invitation.token}`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

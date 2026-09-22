import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/security/auth';
import { getDb } from '@/lib/db/database';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || undefined;
    const user = AuthService.getCurrentUser(userId);
    const allUsers = AuthService.listAllUsers();
    return NextResponse.json({ user, allUsers });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;
    const user = AuthService.getCurrentUser(userId);
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

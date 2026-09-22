import { NextResponse } from 'next/server';
import { AdminAnalyticsService } from '@/lib/admin/analytics';

export async function GET(req: Request) {
  try {
    const data = AdminAnalyticsService.getGallery();
    return NextResponse.json({ success: true, ...data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

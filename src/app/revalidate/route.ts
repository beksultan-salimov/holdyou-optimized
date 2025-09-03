import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');
  if (!tag) {
    return NextResponse.json({ ok: false, now: Date.now() });
  }
  revalidateTag(tag!);
  return NextResponse.json({ ok: true, now: Date.now() });
}

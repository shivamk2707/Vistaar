import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag')
  if (tag) {
    revalidateTag(tag, { expire: 0 })
    return NextResponse.json({ revalidated: true, now: Date.now() })
  }
  return NextResponse.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing tag param',
  })
}

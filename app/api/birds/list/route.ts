import { NextResponse } from 'next/server';

export async function GET() {
  // ここはStep1では未使用。Step2でサーバ側から履歴返す想定。
  return NextResponse.json({ items: [] });
}
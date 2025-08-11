import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = (searchParams.get("keyword") || "").trim();
  const suggestions = keyword
    ? Array.from({ length: 10 }).map((_, i) => `${keyword} 建议 ${i + 1}`)
    : [];
  return NextResponse.json({ data: suggestions });
}



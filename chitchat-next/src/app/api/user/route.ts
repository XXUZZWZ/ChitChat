import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") || "";
  if (auth.startsWith("Bearer mock-token")) {
    return NextResponse.json({ username: "admin" });
  }
  return NextResponse.json({ message: "未登录" }, { status: 401 });
}



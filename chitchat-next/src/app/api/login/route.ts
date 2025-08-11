import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body || {};
  if (username === "admin" && password === "123456") {
    return NextResponse.json({ token: "mock-token", user: { username } });
  }
  return NextResponse.json({ message: "用户名或密码错误" }, { status: 401 });
}



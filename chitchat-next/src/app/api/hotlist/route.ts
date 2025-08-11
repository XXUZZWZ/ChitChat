import { NextResponse } from "next/server";

export async function GET() {
  const hot = [
    { id: "h1", role: "猫娘" },
    { id: "h2", role: "精灵" },
    { id: "h3", role: "占星师" },
    { id: "h4", role: "人鱼" },
    { id: "h5", role: "外星人" },
  ];
  return NextResponse.json({ data: hot });
}



import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { Generation } from "@/models/generation";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectToDatabase();

  const builds = await Generation.find({ userId: user.id })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  return NextResponse.json(builds);
}

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "CapacityOS API - payments endpoint", status: "ok" });
}

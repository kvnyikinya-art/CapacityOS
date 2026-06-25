import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "CapacityOS API - invoices endpoint", status: "ok" });
}

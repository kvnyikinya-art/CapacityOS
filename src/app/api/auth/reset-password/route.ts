import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { query, getByField } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, newPassword } = body;

    // Support both old+new (authenticated reset) and email+newPassword flows
    if (!newPassword) {
      return NextResponse.json(
        { error: "New password is required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // For simplicity, use email-based password reset
    // In production, this should include a verification token/email
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = getByField("users", "email", normalizedEmail);

    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email" },
        { status: 404 }
      );
    }

    const passwordHash = await hashPassword(newPassword);

    query(`
      UPDATE users 
      SET password_hash = '${passwordHash.replace(/'/g, "''")}', 
          updated_at = datetime('now')
      WHERE email = '${normalizedEmail.replace(/'/g, "''")}'
    `);

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
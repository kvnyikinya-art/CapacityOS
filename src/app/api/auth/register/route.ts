import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { query, getByField } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, role, phone, companyId } = body;

    // Validation
    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json(
        { error: "Missing required fields: email, password, firstName, lastName, role" },
        { status: 400 }
      );
    }

    if (!["shipper", "transporter", "driver"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role. Must be one of: shipper, transporter, driver" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already exists
    const existingUser = getByField("users", "email", normalizedEmail);
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const passwordHash = await hashPassword(password);

    // Insert the user into the database
    const result = query(`
      INSERT INTO users (email, password_hash, first_name, last_name, role, phone, company_id)
      VALUES (
        '${normalizedEmail.replace(/'/g, "''")}',
        '${passwordHash.replace(/'/g, "''")}',
        '${firstName.replace(/'/g, "''")}',
        '${lastName.replace(/'/g, "''")}',
        '${role}',
        ${phone ? `'${phone.replace(/'/g, "''")}'` : "NULL"},
        ${companyId ? `'${companyId.replace(/'/g, "''")}'` : "NULL"}
      )
    `);

    // Fetch the newly created user
    const newUser = getByField("users", "email", normalizedEmail);

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: newUser?.id,
          email: normalizedEmail,
          firstName,
          lastName,
          role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during registration" },
      { status: 500 }
    );
  }
}
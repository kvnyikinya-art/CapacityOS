import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from "bcryptjs";
import { query, getByField } from "@/lib/db";

export interface CapacityOSUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "shipper" | "transporter" | "driver" | "admin";
  companyId: string | null;
  isVerified: boolean;
  isActive: boolean;
}

/**
 * Hash a plaintext password for storage.
 */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

/**
 * Verify a plaintext password against a hash.
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return compare(password, hash);
}

/**
 * Convert a database user row to a sanitized session user object.
 */
function toSessionUser(row: Record<string, unknown>): CapacityOSUser {
  return {
    id: row.id as string,
    email: row.email as string,
    firstName: row.first_name as string,
    lastName: row.last_name as string,
    role: row.role as CapacityOSUser["role"],
    companyId: (row.company_id as string) || null,
    isVerified: (row.is_verified as number) === 1,
    isActive: (row.is_active as number) === 1,
  };
}

/**
 * NextAuth configuration for CapacityOS.
 * Uses CredentialsProvider to authenticate against the team-db users table.
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const email = credentials.email.toLowerCase().trim();

        // Look up user in the database
        const userRow = getByField("users", "email", email);
        if (!userRow) {
          throw new Error("No account found with this email address");
        }

        // Check if user is active
        if ((userRow.is_active as number) !== 1) {
          throw new Error("This account has been deactivated");
        }

        // Verify password
        const isValid = await verifyPassword(
          credentials.password,
          userRow.password_hash as string
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // Return sanitized user object (no password_hash)
        return toSessionUser(userRow);
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = (user as CapacityOSUser).firstName;
        token.lastName = (user as CapacityOSUser).lastName;
        token.role = (user as CapacityOSUser).role;
        token.companyId = (user as CapacityOSUser).companyId;
        token.isVerified = (user as CapacityOSUser).isVerified;
        token.isActive = (user as CapacityOSUser).isActive;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach user info to session
      session.user = {
        id: token.id as string,
        email: token.email as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        role: token.role as CapacityOSUser["role"],
        companyId: (token.companyId as string) || null,
        isVerified: token.isVerified as boolean,
        isActive: token.isActive as boolean,
      } as CapacityOSUser & { name?: string; image?: string };
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET || "capacityos-dev-secret-change-in-production",
};

/**
 * Role hierarchy for authorization checks.
 * Higher roles include all permissions of lower roles.
 */
export const ROLE_HIERARCHY: Record<string, number> = {
  driver: 1,
  shipper: 2,
  transporter: 2,
  admin: 10,
};

/**
 * Check if a user has the required role or higher.
 */
export function hasRole(
  userRole: string,
  requiredRole: string
): boolean {
  const userLevel = ROLE_HIERARCHY[userRole] ?? 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole] ?? 0;
  return userLevel >= requiredLevel;
}

/**
 * Check if a user has exactly one of the specified roles.
 */
export function hasAnyRole(
  userRole: string,
  allowedRoles: string[]
): boolean {
  return allowedRoles.includes(userRole);
}
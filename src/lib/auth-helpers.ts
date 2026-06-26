import { getServerSession } from "next-auth";
import { authOptions, hasAnyRole, type CapacityOSUser } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * Server-side session helper for API routes.
 * Use this in API route handlers to get the current user and enforce RBAC.
 */
export async function getAuthUser(): Promise<CapacityOSUser | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  return session.user as CapacityOSUser;
}

/**
 * Require authentication in an API route.
 * Returns the user if authenticated, or a 401 response.
 */
export async function requireAuth(): Promise<
  | { user: CapacityOSUser; error: null }
  | { user: null; error: NextResponse }
> {
  const user = await getAuthUser();
  if (!user) {
    return {
      user: null,
      error: NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      ),
    };
  }
  return { user, error: null };
}

/**
 * Require a specific role (or roles) in an API route.
 * Returns the user if authorized, or a 403 response.
 */
export async function requireRole(
  allowedRoles: string[]
): Promise<
  | { user: CapacityOSUser; error: null }
  | { user: null; error: NextResponse }
> {
  const auth = await requireAuth();
  if (auth.error) return auth;

  if (!hasAnyRole(auth.user.role, allowedRoles)) {
    return {
      user: null,
      error: NextResponse.json(
        {
          error: "Insufficient permissions",
          requiredRoles: allowedRoles,
          yourRole: auth.user.role,
        },
        { status: 403 }
      ),
    };
  }

  return { user: auth.user, error: null };
}
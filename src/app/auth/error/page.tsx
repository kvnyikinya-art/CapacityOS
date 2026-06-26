"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    CredentialsSignin: "Invalid email or password. Please try again.",
    SessionRequired: "Please sign in to access this page.",
    AccessDenied: "You do not have permission to access this resource.",
    Default: "An authentication error occurred. Please try again.",
  };

  const message = errorMessages[error || "Default"] || errorMessages.Default;

  return (
    <>
      <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Authentication Error</h1>
      <p className="text-slate-600 mb-6">{message}</p>
      <Link
        href="/auth/login"
        className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Back to Sign In
      </Link>
    </>
  );
}

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        <Suspense fallback={<div className="h-48 flex items-center justify-center">Loading...</div>}>
          <AuthErrorContent />
        </Suspense>
      </div>
    </div>
  );
}
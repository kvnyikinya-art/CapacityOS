import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth-helpers";
import {
  rejectPayment,
  getPaymentDetails,
  logPaymentAction,
} from "@/lib/payments";

/**
 * POST /api/payments/[id]/reject — Admin: reject a payment
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireRole(["admin"]);
    if (auth.error) return auth.error;

    const { id } = await params;
    const body = await request.json();

    const payment = rejectPayment({
      paymentId: id,
      adminUserId: auth.user.id,
      action: "reject",
      notes: body.notes || "Payment rejected by admin",
    });

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    logPaymentAction(auth.user.id, "payment_rejected", "payment", id, {
      reason: body.notes,
      rejectedBy: auth.user.email,
    });

    return NextResponse.json({
      message: "Payment rejected",
      payment,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
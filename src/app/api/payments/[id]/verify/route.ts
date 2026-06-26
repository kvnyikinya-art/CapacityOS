import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth-helpers";
import {
  verifyPayment,
  getPaymentDetails,
  logPaymentAction,
} from "@/lib/payments";

/**
 * POST /api/payments/[id]/verify — Admin: verify a payment
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

    const payment = verifyPayment({
      paymentId: id,
      adminUserId: auth.user.id,
      action: "verify",
      eftReferenceNumber: body.eftReferenceNumber,
      notes: body.notes,
    });

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    logPaymentAction(auth.user.id, "payment_verified", "payment", id, {
      eftReferenceNumber: body.eftReferenceNumber,
      verifiedBy: auth.user.email,
    });

    logPaymentAction(auth.user.id, "invoice_paid", "invoice", payment.invoice_id as string, {
      paymentId: id,
    });

    logPaymentAction(auth.user.id, "shipment_confirmed", "shipment", payment.shipment_id as string, {
      paymentId: id,
      invoiceId: payment.invoice_id,
    });

    return NextResponse.json({
      message: "Payment verified successfully. Invoice marked as paid. Shipment confirmed.",
      payment,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
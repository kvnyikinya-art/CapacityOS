import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth-helpers";
import {
  submitPayment,
  listPayments,
  getPaymentDetails,
  logPaymentAction,
} from "@/lib/payments";
import type { PaymentStatus } from "@/lib/payments";

/**
 * POST /api/payments — Submit payment proof (shipper)
 * GET /api/payments — List payments (admin/company)
 * GET /api/payments?id=xxx — Get single payment
 */
export async function POST(request: NextRequest) {
  try {
    const auth = await requireRole(["shipper", "admin"]);
    if (auth.error) return auth.error;

    const body = await request.json();
    const { invoiceId, shipmentId, amount, bankReference, notes } = body;

    if (!invoiceId || !shipmentId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: invoiceId, shipmentId, amount" },
        { status: 400 }
      );
    }

    const payment = submitPayment({
      invoiceId,
      shipmentId,
      payerCompanyId: auth.user.companyId || auth.user.id,
      payeeCompanyId: body.payeeCompanyId || "",
      amount,
      bankReference,
      notes,
    });

    if (!payment) {
      return NextResponse.json(
        { error: "Failed to create payment record" },
        { status: 500 }
      );
    }

    // Log the action
    logPaymentAction(auth.user.id, "payment_submitted", "payment", payment.id as string, {
      invoiceId,
      shipmentId,
      amount,
    });

    return NextResponse.json(
      { message: "Payment submitted for verification", payment },
      { status: 201 }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const auth = await requireRole(["shipper", "transporter", "admin"]);
    if (auth.error) return auth.error;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const status = searchParams.get("status") as PaymentStatus | null;
    const shipmentId = searchParams.get("shipmentId");
    const invoiceId = searchParams.get("invoiceId");

    // Single payment by ID
    if (id) {
      const payment = getPaymentDetails(id);
      if (!payment) {
        return NextResponse.json({ error: "Payment not found" }, { status: 404 });
      }
      return NextResponse.json(payment);
    }

    // List payments
    const payments = listPayments({
      status: status || undefined,
      companyId: auth.user.companyId || undefined,
      shipmentId: shipmentId || undefined,
      invoiceId: invoiceId || undefined,
    });

    return NextResponse.json({ payments, count: payments.length });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
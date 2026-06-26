import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth-helpers";
import { listPayments, clearPayment, logPaymentAction } from "@/lib/payments";
import { query } from "@/lib/db";

/**
 * GET /api/admin/payments — Admin payments dashboard overview
 */
export async function GET() {
  try {
    const auth = await requireRole(["admin"]);
    if (auth.error) return auth.error;

    // Get all payments
    const payments = listPayments();

    // Get counts by status
    const statusCounts = query(`
      SELECT status, COUNT(*) as count FROM payments GROUP BY status
    `);

    // Get pending verification count
    const pendingVerification = query(`
      SELECT COUNT(*) as count FROM payments WHERE status = 'awaiting_verification'
    `);

    // Get recent unverified payments
    const unverified = query(`
      SELECT p.*, inv.invoice_number, payer.name as payer_name, payee.name as payee_name
      FROM payments p
      LEFT JOIN invoices inv ON p.invoice_id = inv.id
      LEFT JOIN companies payer ON p.payer_company_id = payer.id
      LEFT JOIN companies payee ON p.payee_company_id = payee.id
      WHERE p.status = 'awaiting_verification'
      ORDER BY p.created_at ASC
    `);

    return NextResponse.json({
      totalPayments: payments.length,
      pendingVerification: pendingVerification[0]?.count || 0,
      statusBreakdown: statusCounts,
      unverified,
      recentPayments: payments.slice(0, 20),
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/**
 * POST /api/admin/payments — Admin actions on payments
 * Body: { paymentId, action: "clear", eftReferenceNumber?, notes? }
 */
export async function POST(request: NextRequest) {
  try {
    const auth = await requireRole(["admin"]);
    if (auth.error) return auth.error;

    const body = await request.json();
    const { paymentId, action, eftReferenceNumber, notes } = body;

    if (!paymentId || !action) {
      return NextResponse.json(
        { error: "Missing required fields: paymentId, action" },
        { status: 400 }
      );
    }

    if (action === "clear") {
      const payment = clearPayment({
        paymentId,
        adminUserId: auth.user.id,
        action: "clear",
        eftReferenceNumber,
        notes,
      });

      if (!payment) {
        return NextResponse.json({ error: "Payment not found" }, { status: 404 });
      }

      logPaymentAction(auth.user.id, "payment_cleared", "payment", paymentId, {
        eftReferenceNumber,
        clearedBy: auth.user.email,
      });

      return NextResponse.json({
        message: "Payment cleared successfully",
        payment,
      });
    }

    return NextResponse.json(
      { error: `Unknown action: ${action}. Supported: clear` },
      { status: 400 }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
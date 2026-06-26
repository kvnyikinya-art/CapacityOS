/**
 * CapacityOS Manual EFT Payment Service
 * 
 * Handles the complete payment lifecycle:
 * pending → awaiting_verification → verified → cleared
 * 
 * All payments are bank-to-bank EFT with manual admin verification.
 * No third-party payment gateways are supported.
 */

import { query, getById } from "@/lib/db";

export interface PaymentSubmission {
  invoiceId: string;
  shipmentId: string;
  payerCompanyId: string;
  payeeCompanyId: string;
  amount: number;
  currency?: string;
  bankReference?: string;
  proofDocumentPath?: string;
  notes?: string;
}

export interface PaymentVerification {
  paymentId: string;
  adminUserId: string;
  action: "verify" | "reject" | "clear";
  notes?: string;
  eftReferenceNumber?: string;
}

export type PaymentStatus =
  | "pending"
  | "awaiting_verification"
  | "verified"
  | "cleared"
  | "failed"
  | "refunded";

/**
 * Submit a new payment record (proof of EFT transfer).
 * Sets status to "awaiting_verification" for admin review.
 */
export function submitPayment(data: PaymentSubmission) {
  // Validate the invoice exists and is issued
  const invoice = getById("invoices", data.invoiceId);
  if (!invoice) {
    throw new Error("Invoice not found");
  }
  if (invoice.status !== "issued") {
    throw new Error("Invoice must be in 'issued' status to submit payment");
  }

  // Validate the shipment exists
  const shipment = getById("shipments", data.shipmentId);
  if (!shipment) {
    throw new Error("Shipment not found");
  }

  // Create payment record
  const result = query(`
    INSERT INTO payments (
      invoice_id, shipment_id, payer_company_id, payee_company_id,
      amount, currency, payment_method, bank_reference,
      proof_document_path, status, notes
    ) VALUES (
      '${data.invoiceId.replace(/'/g, "''")}',
      '${data.shipmentId.replace(/'/g, "''")}',
      '${data.payerCompanyId.replace(/'/g, "''")}',
      '${data.payeeCompanyId.replace(/'/g, "''")}',
      ${data.amount},
      '${(data.currency || "ZAR").replace(/'/g, "''")}',
      'eft',
      ${data.bankReference ? `'${data.bankReference.replace(/'/g, "''")}'` : "NULL"},
      ${data.proofDocumentPath ? `'${data.proofDocumentPath.replace(/'/g, "''")}'` : "NULL"},
      'awaiting_verification',
      ${data.notes ? `'${data.notes.replace(/'/g, "''")}'` : "NULL"}
    )
  `);

  // Get the newly created payment
  const payments = query(
    `SELECT * FROM payments WHERE invoice_id = '${data.invoiceId.replace(/'/g, "''")}' 
     ORDER BY created_at DESC LIMIT 1`
  );

  return payments[0] || null;
}

/**
 * Admin: Verify a payment (mark as verified).
 * Updates invoice status to 'paid' and shipment status to 'confirmed'.
 */
export function verifyPayment(data: PaymentVerification): Record<string, unknown> | null {
  const payment = getById("payments", data.paymentId);
  if (!payment) throw new Error("Payment not found");
  if (payment.status !== "awaiting_verification") {
    throw new Error(`Cannot verify payment in '${payment.status}' status`);
  }

  // Update payment status
  query(`
    UPDATE payments SET
      status = 'verified',
      admin_verified_by = '${data.adminUserId.replace(/'/g, "''")}',
      admin_verified_at = datetime('now'),
      eft_reference_number = ${data.eftReferenceNumber ? `'${data.eftReferenceNumber.replace(/'/g, "''")}'` : "eft_reference_number"},
      notes = CASE 
        WHEN notes IS NULL THEN ${data.notes ? `'${data.notes.replace(/'/g, "''")}'` : "NULL"}
        ELSE notes || ' | ${data.notes ? data.notes.replace(/'/g, "''") : "Verified by admin"}'
      END,
      updated_at = datetime('now')
    WHERE id = '${data.paymentId.replace(/'/g, "''")}'
  `);

  // Update invoice status to 'paid'
  const invoiceId = payment.invoice_id as string;
  query(`
    UPDATE invoices SET
      status = 'paid',
      updated_at = datetime('now')
    WHERE id = '${invoiceId.replace(/'/g, "''")}'
  `);

  // Update shipment status to 'confirmed'
  const shipmentId = payment.shipment_id as string;
  query(`
    UPDATE shipments SET
      status = 'confirmed',
      updated_at = datetime('now')
    WHERE id = '${shipmentId.replace(/'/g, "''")}'
  `);

  return getById("payments", data.paymentId);
}

/**
 * Admin: Reject a payment (mark as failed).
 */
export function rejectPayment(data: PaymentVerification): Record<string, unknown> | null {
  const payment = getById("payments", data.paymentId);
  if (!payment) throw new Error("Payment not found");
  if (payment.status !== "awaiting_verification") {
    throw new Error(`Cannot reject payment in '${payment.status}' status`);
  }

  query(`
    UPDATE payments SET
      status = 'failed',
      admin_verified_by = '${data.adminUserId.replace(/'/g, "''")}',
      admin_verified_at = datetime('now'),
      notes = CASE 
        WHEN notes IS NULL THEN ${data.notes ? `'${data.notes.replace(/'/g, "''")}'` : "'Rejected by admin'"}
        ELSE notes || ' | ${data.notes ? data.notes.replace(/'/g, "''") : "Rejected by admin"}'
      END,
      updated_at = datetime('now')
    WHERE id = '${data.paymentId.replace(/'/g, "''")}'
  `);

  return getById("payments", data.paymentId);
}

/**
 * Admin: Mark a verified payment as cleared (funds received).
 */
export function clearPayment(data: PaymentVerification): Record<string, unknown> | null {
  const payment = getById("payments", data.paymentId);
  if (!payment) throw new Error("Payment not found");
  if (payment.status !== "verified") {
    throw new Error(`Cannot clear payment in '${payment.status}' status`);
  }

  query(`
    UPDATE payments SET
      status = 'cleared',
      notes = CASE 
        WHEN notes IS NULL THEN ${data.notes ? `'${data.notes.replace(/'/g, "''")}'` : "'Payment cleared'"}
        ELSE notes || ' | ${data.notes ? data.notes.replace(/'/g, "''") : "Payment cleared"}'
      END,
      updated_at = datetime('now')
    WHERE id = '${data.paymentId.replace(/'/g, "''")}'
  `);

  return getById("payments", data.paymentId);
}

/**
 * Create an audit log entry for payment-related actions.
 */
export function logPaymentAction(
  userId: string,
  action: string,
  entityType: string,
  entityId: string,
  details: Record<string, unknown>
) {
  query(`
    INSERT INTO audit_log (user_id, action, entity_type, entity_id, details)
    VALUES (
      '${userId.replace(/'/g, "''")}',
      '${action.replace(/'/g, "''")}',
      '${entityType.replace(/'/g, "''")}',
      '${entityId.replace(/'/g, "''")}',
      '${JSON.stringify(details).replace(/'/g, "''")}'
    )
  `);
}

/**
 * List payments with optional filters.
 */
export function listPayments(filters: {
  status?: PaymentStatus;
  companyId?: string;
  shipmentId?: string;
  invoiceId?: string;
  limit?: number;
} = {}): Record<string, unknown>[] {
  const conditions: string[] = [];
  
  if (filters.status) {
    conditions.push(`p.status = '${filters.status}'`);
  }
  if (filters.companyId) {
    conditions.push(
      `(p.payer_company_id = '${filters.companyId.replace(/'/g, "''")}' 
       OR p.payee_company_id = '${filters.companyId.replace(/'/g, "''")}')`
    );
  }
  if (filters.shipmentId) {
    conditions.push(`p.shipment_id = '${filters.shipmentId.replace(/'/g, "''")}'`);
  }
  if (filters.invoiceId) {
    conditions.push(`p.invoice_id = '${filters.invoiceId.replace(/'/g, "''")}'`);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const limit = filters.limit || 50;

  return query(`
    SELECT p.*, 
           inv.invoice_number, 
           inv.total as invoice_total,
           s.agreed_rate as shipment_rate,
           s.origin_city, s.destination_city
    FROM payments p
    LEFT JOIN invoices inv ON p.invoice_id = inv.id
    LEFT JOIN shipments s ON p.shipment_id = s.id
    ${where}
    ORDER BY p.created_at DESC
    LIMIT ${limit}
  `);
}

/**
 * Get a single payment by ID with related invoice and shipment info.
 */
export function getPaymentDetails(paymentId: string): Record<string, unknown> | null {
  const results = query(`
    SELECT p.*, 
           inv.invoice_number, inv.total as invoice_total, inv.status as invoice_status,
           s.agreed_rate, s.origin_city, s.destination_city, s.status as shipment_status,
           payer.name as payer_company_name,
           payee.name as payee_company_name
    FROM payments p
    LEFT JOIN invoices inv ON p.invoice_id = inv.id
    LEFT JOIN shipments s ON p.shipment_id = s.id
    LEFT JOIN companies payer ON p.payer_company_id = payer.id
    LEFT JOIN companies payee ON p.payee_company_id = payee.id
    WHERE p.id = '${paymentId.replace(/'/g, "''")}'
  `);

  return results.length > 0 ? results[0] : null;
}
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Himedi <noreply@himedi.com>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@himedi.com";

interface EmailResult {
  success: boolean;
  error?: string;
}

export async function sendBookingConfirmation(params: {
  to: string;
  customerName: string;
  orderNumber: string;
  items: { title: string; price: number; quantity: number }[];
  total: number;
}): Promise<EmailResult> {
  const itemsHtml = params.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px;border-bottom:1px solid #eee">${item.title} x${item.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${(item.price * item.quantity).toLocaleString()}</td>
        </tr>`
    )
    .join("");

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: `Booking Confirmed - ${params.orderNumber}`,
    html: `
      <div style="max-width:600px;margin:0 auto;font-family:'Nunito',Arial,sans-serif;color:#333">
        <div style="background:linear-gradient(135deg,#2563eb,#1d4ed8);padding:32px;border-radius:12px 12px 0 0;text-align:center">
          <h1 style="margin:0;color:#fff;font-size:24px">Booking Confirmed!</h1>
          <p style="margin:8px 0 0;color:#bfdbfe">Order ${params.orderNumber}</p>
        </div>
        <div style="padding:24px;background:#fff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
          <p>Hi ${params.customerName},</p>
          <p>Thank you for choosing Himedi for your health screening. Your booking has been confirmed.</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <thead>
              <tr style="background:#f9fafb">
                <th style="padding:8px;text-align:left;border-bottom:2px solid #e5e7eb">Package</th>
                <th style="padding:8px;text-align:right;border-bottom:2px solid #e5e7eb">Price</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
            <tfoot>
              <tr>
                <td style="padding:12px 8px;font-weight:bold;font-size:18px">Total</td>
                <td style="padding:12px 8px;text-align:right;font-weight:bold;font-size:18px;color:#2563eb">$${params.total.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
          <div style="background:#fef3c7;border:1px solid #fde68a;border-radius:8px;padding:16px;margin:16px 0">
            <p style="margin:0 0 8px;font-weight:600">What Happens Next:</p>
            <ol style="margin:0;padding-left:20px;color:#666">
              <li>Our concierge team will contact you within 24-48 hours</li>
              <li>We'll schedule your appointment at a partner hospital</li>
              <li>You'll receive preparation instructions for your screening</li>
            </ol>
          </div>
          <p style="color:#666;font-size:14px">
            Reschedule free within 12 months | Full refund 7+ days before appointment<br>
            <a href="https://himedi.com/policies/refund" style="color:#2563eb">View full refund policy</a>
          </p>
        </div>
        <div style="text-align:center;padding:16px;color:#999;font-size:12px">
          Himedi - Korean Medical Tourism Concierge<br>
          <a href="https://himedi.com" style="color:#2563eb">himedi.com</a>
        </div>
      </div>
    `,
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function sendContactNotification(params: {
  fullName: string;
  email: string;
  phone?: string;
  nationality?: string;
  serviceInterest?: string;
  notes?: string;
}): Promise<EmailResult> {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Inquiry from ${params.fullName}`,
    html: `
      <div style="max-width:600px;margin:0 auto;font-family:Arial,sans-serif;color:#333">
        <h2 style="color:#2563eb">New Contact Inquiry</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600">Name</td><td style="padding:8px;border-bottom:1px solid #eee">${params.fullName}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600">Email</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${params.email}">${params.email}</a></td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600">Phone</td><td style="padding:8px;border-bottom:1px solid #eee">${params.phone || "N/A"}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600">Nationality</td><td style="padding:8px;border-bottom:1px solid #eee">${params.nationality || "N/A"}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600">Service Interest</td><td style="padding:8px;border-bottom:1px solid #eee">${params.serviceInterest || "N/A"}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600">Notes</td><td style="padding:8px;border-bottom:1px solid #eee">${params.notes || "N/A"}</td></tr>
        </table>
      </div>
    `,
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function sendContactAutoReply(params: {
  to: string;
  fullName: string;
}): Promise<EmailResult> {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: params.to,
    subject: "We received your inquiry - Himedi",
    html: `
      <div style="max-width:600px;margin:0 auto;font-family:'Nunito',Arial,sans-serif;color:#333">
        <div style="background:linear-gradient(135deg,#2563eb,#1d4ed8);padding:32px;border-radius:12px 12px 0 0;text-align:center">
          <h1 style="margin:0;color:#fff;font-size:24px">Thank You!</h1>
        </div>
        <div style="padding:24px;background:#fff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
          <p>Hi ${params.fullName},</p>
          <p>Thank you for your interest in Himedi's health screening services. We've received your inquiry and our concierge team will get back to you within 24-48 hours.</p>
          <p>In the meantime, feel free to browse our <a href="https://himedi.com/collections/all" style="color:#2563eb">health screening packages</a> or check our <a href="https://himedi.com/faq" style="color:#2563eb">FAQ page</a>.</p>
        </div>
      </div>
    `,
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactNotification, sendContactAutoReply } from "@/lib/email";
import { rateLimit, getClientKey } from "@/lib/rate-limit";
import { sanitizeText, isValidEmail } from "@/lib/validate";

export async function POST(request: NextRequest) {
  // Rate limit: 5 requests per minute per IP
  const rlKey = `contact:${getClientKey(request)}`;
  const rl = rateLimit(rlKey, { limit: 5, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  try {
    const body = await request.json();
    const fullName = sanitizeText(String(body.fullName || ""));
    const email = sanitizeText(String(body.email || ""));
    const phone = body.phone ? sanitizeText(String(body.phone)) : null;
    const nationality = body.nationality ? sanitizeText(String(body.nationality)) : null;
    const serviceInterest = body.serviceInterest ? sanitizeText(String(body.serviceInterest)) : null;
    const dateRange = body.dateRange ? sanitizeText(String(body.dateRange)) : null;
    const notes = body.notes ? sanitizeText(String(body.notes)) : null;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full name and email are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const inquiry = await prisma.contactInquiry.create({
      data: {
        fullName,
        email,
        phone,
        nationality,
        serviceInterest,
        preferredDateRange: dateRange,
        notes,
      },
    });

    // Send notification emails (non-blocking)
    sendContactNotification({
      fullName,
      email,
      phone: phone || undefined,
      nationality: nationality || undefined,
      serviceInterest: serviceInterest || undefined,
      notes: notes || undefined,
    }).catch((err) => console.error("Failed to send admin notification:", err));

    sendContactAutoReply({ to: email, fullName })
      .catch((err) => console.error("Failed to send auto-reply:", err));

    return NextResponse.json(
      {
        message: "Inquiry received successfully. We will respond within 24-48 hours.",
        id: inquiry.id,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to submit inquiry. Please try again." },
      { status: 500 }
    );
  }
}

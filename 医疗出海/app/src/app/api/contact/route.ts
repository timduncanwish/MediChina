import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactNotification, sendContactAutoReply } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, nationality, serviceInterest, dateRange, notes } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full name and email are required." },
        { status: 400 }
      );
    }

    const inquiry = await prisma.contactInquiry.create({
      data: {
        fullName,
        email,
        phone: phone || null,
        nationality: nationality || null,
        serviceInterest: serviceInterest || null,
        preferredDateRange: dateRange || null,
        notes: notes || null,
      },
    });

    // Send notification emails (non-blocking)
    sendContactNotification({
      fullName,
      email,
      phone,
      nationality,
      serviceInterest,
      notes,
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

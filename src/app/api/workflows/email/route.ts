import { NextRequest, NextResponse } from "next/server";
import emailjs from '@emailjs/nodejs';
import config from "@/lib/config";

export async function POST(req: NextRequest) {
  try {
    const { email, subject, message } = await req.json();

    await emailjs.send(
      config.env.emailjs.serviceId,
      config.env.emailjs.templateId,
      {
        to_email: email,
        subject: subject,
        message: message,
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
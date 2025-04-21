import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/database/drizzle";
import { payments, subscriptions } from "@/database/schema";
import { SUBSCRIPTION_PLANS } from "@/lib/razorpay";
import { add } from "date-fns";

// Verify Razorpay webhook signature
function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const isValid = verifyWebhookSignature(
      body,
      signature,
      process.env.RAZORPAY_WEBHOOK_SECRET!
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    const payload = JSON.parse(body);
    const { 
      payload: { payment: { entity } },
    } = payload;

    // Handle successful payment
    if (payload.event === "payment.captured") {
      const { notes, order_id, id: paymentId, amount } = entity;
      const { userId, planId } = notes;
      const plan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS];

      if (!plan) {
        throw new Error("Invalid plan");
      }

      // Start a transaction
      await db.transaction(async (tx) => {
        // Create subscription
        const [subscription] = await tx
          .insert(subscriptions)
          .values({
            userId,
            status: "ACTIVE",
            startDate: new Date(),
            endDate: add(new Date(), { days: plan.duration }),
            price: (amount / 100).toString(), // Convert from paise to rupees as string
          })
          .returning();

        // Create payment record
        await tx.insert(payments).values({
          subscriptionId: subscription.id,
          userId,
          amount: (amount / 100).toString(), // Convert from paise to rupees as string
          razorpayPaymentId: paymentId,
          razorpayOrderId: order_id,
          status: "success",
        });
      });

      return NextResponse.json({ success: true });
    }

    // Handle other webhook events if needed
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// Disable body parsing, verify raw body for signature
export const config = {
  api: {
    bodyParser: false,
  },
};
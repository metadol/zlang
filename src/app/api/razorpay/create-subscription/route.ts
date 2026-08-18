import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { razorpay } from "@/lib/razorpay";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID!,
      total_count: 12,
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
    });
  } catch (error) {
    console.error("Razorpay subscription error:", error);

    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
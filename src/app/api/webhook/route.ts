import { NextResponse } from "next/server";
import { headers } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  console.log("/api/webhook POST");

  const headersList = headers();
  const sig = headersList.get("stripe-signature");
  console.log("sig", sig);

  try {
    // const jsonBody = await req.json();  // working as well, and jsonBody is the event.
    // console.log("jsonBody", jsonBody);  // based on https://stripe.com/docs/webhooks#webhook-endpoint-def

    const body = await req.text();
    console.log("body", body);
    // console.log(
    //   "process.env.STRIPE_WEBHOOK_SIGNING_SECRET:",
    //   process.env.STRIPE_WEBHOOK_SIGNING_SECRET
    // );

    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SIGNING_SECRET
    );
    console.log("event", event);

    // event types:
    //            1. charge.succeeded
    //            2. checkout.session.completed
    //            3. payment_intent.succeeded
    //            4. payment_intent.created

    if (event.type === "checkout.session.completed") {
      const checkoutSessionCompleted = event.data.object;
      console.log("checkoutSessionCompleted object", checkoutSessionCompleted);
      console.log({ orderId: event.data?.object?.metadata?.orderId });
      const orderId = event?.data?.object.metadata?.orderId;
      const isPaid = event?.data?.object?.payment_status === "paid";
      if (isPaid) {
        await dbConnect();
        const updatedOrder = await Order.findByIdAndUpdate(
          orderId,
          { paid: true },
          { new: true }
        );

        return NextResponse.json(updatedOrder); // no need to reply
      }
    }

    return NextResponse.json("ok");
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }
}

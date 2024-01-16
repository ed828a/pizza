import { NextResponse } from "next/server";
import { headers } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order";
import { revalidatePath } from "next/cache";
import type { Stripe } from "stripe";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SIGNING_SECRET as string
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  // Successfully constructed event.
  console.log("✅ Success:", event.id);

  const permittedEvents: string[] = [
    "checkout.session.completed",
    "payment_intent.succeeded",
    "payment_intent.payment_failed",
  ];

  if (permittedEvents.includes(event.type)) {
    let data;

    try {
      switch (event.type) {
        case "checkout.session.completed":
          data = event.data.object as Stripe.Checkout.Session;
          console.log(`💰 CheckoutSession status: ${data.payment_status}`);
          const checkoutSessionCompleted = event.data.object;
          console.log(
            "checkoutSessionCompleted object",
            checkoutSessionCompleted
          );
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
          }

          revalidatePath(`/orders/${orderId}`);
          break;
        case "payment_intent.payment_failed":
          data = event.data.object as Stripe.PaymentIntent;
          console.log(`❌ Payment failed: ${data.last_payment_error?.message}`);
          break;
        case "payment_intent.succeeded":
          data = event.data.object as Stripe.PaymentIntent;
          console.log(`💰 PaymentIntent status: ${data.status}`);
          break;
        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Webhook handler failed" },
        { status: 500 }
      );
    }
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: "Received" }, { status: 200 });
}

// export async function POST(req: Request) {
//   console.log("/api/webhook POST");

//   const headersList = headers();
//   const sig = headersList.get("stripe-signature");
//   console.log("sig", sig);

//   try {
//     // const jsonBody = await req.json();  // working as well, and jsonBody is the event.
//     // console.log("jsonBody", jsonBody);  // based on https://stripe.com/docs/webhooks#webhook-endpoint-def

//     const body = await req.text();
//     console.log("body", body);
//     const pasredBody = JSON.parse(body);
//     console.log("body.type", pasredBody.type);
//     console.log(
//       "body.data.object.payment_status",
//       pasredBody.data.object.payment_status
//     );

//     if (pasredBody.type === "checkout.session.completed") {
//       const checkoutSessionCompleted = pasredBody.data.object;
//       console.log("checkoutSessionCompleted object", checkoutSessionCompleted);
//       console.log({ orderId: pasredBody.data?.object?.metadata?.orderId });
//       const orderId = pasredBody?.data?.object.metadata?.orderId;
//       const isPaid = pasredBody?.data?.object?.payment_status === "paid";
//       if (isPaid) {
//         await dbConnect();
//         const updatedOrder = await Order.findByIdAndUpdate(
//           orderId,
//           { paid: true },
//           { new: true }
//         );

//         revalidatePath(`/orders/${orderId}`);
//         return NextResponse.json(updatedOrder); // updatedOrder no need to reply
//       }
//     }

//     // console.log(
//     //   "process.env.STRIPE_WEBHOOK_SIGNING_SECRET:",
//     //   process.env.STRIPE_WEBHOOK_SIGNING_SECRET
//     // );

//     const event = stripe.webhooks.constructEvent(
//       body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SIGNING_SECRET
//     );
//     console.log("event.type", event.type);

// event types:
//            1. charge.succeeded
//            2. checkout.session.completed
//            3. payment_intent.succeeded
//            4. payment_intent.created

// if (event.type === "checkout.session.completed") {
//   const checkoutSessionCompleted = event.data.object;
//   console.log("checkoutSessionCompleted object", checkoutSessionCompleted);
//   console.log({ orderId: event.data?.object?.metadata?.orderId });
//   const orderId = event?.data?.object.metadata?.orderId;
//   const isPaid = event?.data?.object?.payment_status === "paid";
//   if (isPaid) {
//     await dbConnect();
//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       { paid: true },
//       { new: true }
//     );

//     revalidatePath(`/orders/${orderId}`);
//     return NextResponse.json(updatedOrder); // updatedOrder no need to reply
//   }
// }

//     return NextResponse.json("ok");
//   } catch (err: any) {
//     console.log("webhook error:", err.message);
//     return NextResponse.json(
//       { error: `Webhook Error: ${err.message}` },
//       { status: 400 }
//     );
//   }
// }

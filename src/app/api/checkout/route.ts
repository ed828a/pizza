import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order";

type Error = typeof Error;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  const postHeaders = headers();
  // console.log("postHeaders", postHeaders.get("Content-Type"));

  try {
    const { address, cartProducts } = await req.json();
    console.log({ address, cartProducts });

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    await dbConnect();
    const orderDoc = await Order.create({
      userEmail,
      ...address,
      cartProducts,
      paid: false,
    });

    // for how to define session, to see https://stripe.com/docs/api/checkout/sessions/create?lang=node
    const stripeLineItems = [];
    for (const product of cartProducts) {
      const productName = product.name;
      stripeLineItems.push({
        quantity: 1,
        price_data: {
          currency: "AUD",
          product_data: { name: productName },
          unit_amount: product.subPrice * 100,
        },
      });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      mode: "payment",
      customer_email: userEmail,
      success_url: `${
        process.env.NEXTAUTH_URL
      }/orders/${orderDoc._id.toString()}?clear-cart=1`, // this url is where the app goes after payment succeeded.
      cancel_url: `${process.env.NEXTAUTH_URL}/cart?cancelled=1`, // this url is where the app goes when the payment is cancelled
      metadata: {
        orderId: orderDoc._id.toString(), // this orderId is for webhook
      },
      payment_intent_data: {
        metadata: {
          orderId: orderDoc._id.toString(), // this orderId is for webhook
        },
      },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Delivery fee",
            type: "fixed_amount",
            fixed_amount: { amount: 500, currency: "AUD" },
          },
        },
      ],
    });

    console.log("stripeSession.url", stripeSession.url);

    return NextResponse.json(stripeSession.url);
  } catch (error: any) {
    console.log("error", error.message);

    return Response.json({ success: false }, { status: 400 });
  }
}

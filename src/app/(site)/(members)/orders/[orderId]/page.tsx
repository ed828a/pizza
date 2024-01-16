import ClearCart from "@/components/orders/ClearCart";
import OrderDetailsContent from "@/components/orders/OrderDetailsContent";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order";
import { RocketIcon } from "@radix-ui/react-icons";
import React from "react";

type Props = {
  params: {
    orderId: string;
  };
  searchParams: {
    "clear-cart"?: string;
    cancelled: string;
  };
};

const OrderDetailsPage = async ({ params, searchParams }: Props) => {
  const clearCart = searchParams["clear-cart"] === "1";
  const { orderId } = params;
  console.log("orderId", orderId);
  console.log("searchParams", searchParams);

  let orderfrmDB;
  try {
    await dbConnect();
    orderfrmDB = await Order.findById(orderId);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    if (error! instanceof Error) console.log(error);
    console.log(`❌ Error message: ${errorMessage}`);
  }

  if (!orderfrmDB) {
    return (
      <section className="section">
        <Alert className="max-w-2xl h-56 flex flex-col justify-between p-12 bg-gray-100">
          <div className="flex justify-center items-center gap-2 ">
            <RocketIcon className="h-4 w-4" style={{ color: "#ff0000" }} />
            <AlertTitle className="text-primary font-semibold text-2xl">
              Alert!
            </AlertTitle>
          </div>
          <AlertDescription className="text-center text-xl mb-4">
            Not found the order, please check the order id.
          </AlertDescription>
        </Alert>
      </section>
    );
  }

  const order = orderfrmDB.toObject();
  console.log("order", order);
  console.log("clearCart", clearCart);
  return (
    <section className="section flex flex-col">
      <OrderDetailsContent order={order} />
      <ClearCart />
    </section>
  );
};

export default OrderDetailsPage;

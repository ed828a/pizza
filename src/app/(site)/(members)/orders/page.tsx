import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import dbConnect from "@/lib/dbConnect";
import { cn, dbTimePretter } from "@/lib/utils";
import Order from "@/models/order";
import { RocketIcon } from "@radix-ui/react-icons";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

import React from "react";

type Props = {};

const OrdersPage = async (props: Props) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/api/auth/signin");
    }

    const userEmail = session?.user?.email;

    await dbConnect();
    const ordersFrmDB = await Order.find({ userEmail: userEmail });
    if (!ordersFrmDB) {
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
              Not found any orders, please check later.
            </AlertDescription>
          </Alert>
        </section>
      );
    }

    const orders = ordersFrmDB.map((o) => o.toObject());
    return (
      <section className="section">
        <div className="">
          {orders.length > 0 &&
            orders.map((order: any) => (
              <div
                className="bg-gray-100 mb-2 p-4 rounded-lg grid grid-cols-4 xs:grid-cols-5"
                key={order._id}
              >
                <div className="col-span-2">
                  <div className="">
                    {order.userEmail !== userEmail && order.userEmail}
                  </div>
                  <div className="text-gray-500">
                    {order.cartProducts.map((p: any) => p.name).join(", ")}
                  </div>
                </div>
                <div className="flex items-center justify-end ">
                  <span
                    className={cn(
                      "px-4 py-1 rounded-md text-white capitalize w-[100px] text-center",
                      {
                        "bg-green-500 border-green-500": order.paid,
                        "bg-red-500 border-primary": !order.paid,
                      }
                    )}
                  >
                    {order.paid ? "paid" : "pending"}
                  </span>
                </div>
                <div className="hidden xs:block">
                  <div className="flex flex-col items-end justify-center">
                    {dbTimePretter(order.createdAt).date}
                  </div>
                  <div className="flex flex-col items-end justify-center">
                    {dbTimePretter(order.createdAt).time}
                  </div>
                </div>
                <div className="text-center px-2 flex justify-end items-center">
                  <Link
                    href={`/orders/${order._id}`}
                    className={cn(
                      "text-center border px-2 py-1 rounded-lg font-bold ",
                      buttonVariants({ variant: "outline" }),
                      "hover:border-primary hover:text-primary"
                    )}
                  >
                    Show order
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>
    );
  } catch (error: any) {
    console.log("error", error.message);
    throw error;
  }
};

export default OrdersPage;

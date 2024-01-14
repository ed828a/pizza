import ShowAddress from "./ShowAddress";
import ShowOrderProducts from "./ShowOrderProducts";
import SectionHeader from "../menu/SectionHeader";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {
  order: OrderType;
};

const OrderDetailsContent = ({ order }: Props) => {
  return (
    <div className="max-w-5xl mx-auto text-center ">
      <Link href="/orders" className="flex items-center justify-end ">
        <ArrowLongLeftIcon className="w-8 h-4 text-primary " />
        <span className="text-primary/80 ">see all your orders</span>
      </Link>
      <div className="text-center mb-10">
        <SectionHeader mainHeader="Your order" />
        <div className="my-4">
          <p>Thanks for your order</p>
          <p>We will infom you when your order will be on the way</p>
        </div>
      </div>

      {order && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
          <div className="">
            <ShowOrderProducts
              cartProducts={order.cartProducts!}
              isPaid={order.paid!}
            />
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <ShowAddress
              phone={order.phone!}
              streetAddress={order.streetAddress!}
              city={order.city!}
              postcode={order.postcode!}
              country={order.country!}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsContent;

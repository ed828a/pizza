import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import CartContent from "@/components/cart/CartContent";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const CartPage = async (props: Props) => {
  await dbConnect();
  const session: any = await getServerSession(authOptions);
  // console.log("session", session);

  const user = (await User.findOne({ email: session.user.email })).toObject();
  // console.log("CartPage user.phone", user.phone);
  const profile: Partial<ProfileType> = {
    name: user.name,
    email: user.email,
    image: user.image,
    phone: user.phone,
    streetAddress: user.streetAddress,
    city: user.city,
    postcode: user.postcode,
    country: user.country,
  };

  // console.log("CartPage profile", profile);
  return (
    <section className="section">
      <CartContent profile={profile} />
    </section>
  );
};

export default CartPage;

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ProfileForm from "@/components/profile/ProfileForm";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const ProfilePage = async (props: Props) => {
  const session = await getServerSession(authOptions);
  // console.log("session", session);

  if (!session || !session.user) {
    return redirect("/login");
  }

  await dbConnect();

  const result = await User.findOne({ email: session.user.email });
  console.log("result", result);

  const {
    email,
    name,
    image,
    city,
    phone,
    country,
    postcode,
    streetAddress,
    role,
  } = JSON.parse(JSON.stringify(result));

  const user = {
    email,
    name,
    image,
    city,
    phone,
    country,
    postcode,
    streetAddress,
    role,
  };
  console.log("Profile page user", user);

  return (
    <section className="section">
      <ProfileForm user={user} callbackUrl="/" />
    </section>
  );
};

export default ProfilePage;

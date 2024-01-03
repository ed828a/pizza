import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import MemberNav from "@/components/subheader/MemberNav";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = { children: React.ReactNode };

const MembersLayout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions);
  console.log("session", session);

  if (!session || !session.user) {
    return redirect("/login");
  }

  await dbConnect();

  // @ts-expect-error
  const user = await User.findOne({ email: session.user.email });
  console.log("MembersLayout user", user);
  const admin = user.role === "admin";

  return (
    <section>
      <MemberNav admin={admin} />
      {children}
    </section>
  );
};

export default MembersLayout;

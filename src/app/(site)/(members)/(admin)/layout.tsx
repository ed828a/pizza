import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AdminLayout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions);
  console.log("AdminLayout session", session);

  if (!session || !session.user || session.user.role !== "admin") {
    return redirect("/unauthorized");
  }

  return <div>{children}</div>;
};

export default AdminLayout;

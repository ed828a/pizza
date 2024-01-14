import ProfileForm from "@/components/profile/ProfileForm";
import AlertComponent from "@/components/share/AlertComponent";
import dbConnect from "@/lib/dbConnect";
import { toPOJO } from "@/lib/utils";
import User from "@/models/user";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const UserDetailsPage = async ({ params: { id } }: Props) => {
  await dbConnect();
  const userFrmDB = await User.findById(id);

  if (!userFrmDB) {
    return (
      <AlertComponent
        title="Alert"
        description="User not found, please check user id."
      />
    );
  }

  const user = userFrmDB.toObject();
  console.log("user", user);
  return (
    <section className="section">
      <ProfileForm user={user} callbackUrl="/users" />
    </section>
  );
};

export default UserDetailsPage;

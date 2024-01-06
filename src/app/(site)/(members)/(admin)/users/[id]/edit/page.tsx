import ProfileForm from "@/components/profile/ProfileForm";
import { toPOJO } from "@/lib/utils";
import User from "@/models/user";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const UserDetailsPage = async ({ params: { id } }: Props) => {
  const user = await User.findById(id);
  const pojoUser = toPOJO(user);
  console.log("pojoUser", pojoUser);
  return (
    <section className="section">
      <ProfileForm user={pojoUser} callbackUrl="/users" />
    </section>
  );
};

export default UserDetailsPage;

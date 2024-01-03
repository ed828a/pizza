import { ProfileForm } from "@/components/profile/ProfileForm";
import React from "react";

type Props = {};

const ProfilePage = (props: Props) => {
  return (
    <section className="flex justify-center items-center">
      <ProfileForm />
    </section>
  );
};

export default ProfilePage;

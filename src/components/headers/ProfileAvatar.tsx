import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

type Props = {
  src?: string;
  //   onClick: () => void;
};

const ProfileAvatar = ({ src }: Props) => {
  const { data: session } = useSession();
  if (!session) return null;

  // console.log("ProfileAvatar session", session);
  const user: any = session.user;

  return (
    <Avatar>
      <AvatarImage
        src={user ? user.image : "/images/profile.jpg"}
        className=""
      />
      <AvatarFallback>profile</AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;

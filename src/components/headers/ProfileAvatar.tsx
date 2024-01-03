import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

type Props = {
  src?: string;
  //   onClick: () => void;
};

const ProfileAvatar = ({ src }: Props) => {
  const { data: session } = useSession();
  // @ts-expect-error
  src = session?.user.image;
  return (
    <Avatar>
      <AvatarImage src={src ? src : "/images/profile.jpg"} />
      <AvatarFallback>profile</AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;

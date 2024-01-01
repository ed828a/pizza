import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {};

const LogoAvatar = (props: Props) => {
  return (
    <div>
      <Avatar>
        <AvatarImage src="http://localhost:3000/feast-st-pizza.jpg" />
        <AvatarFallback>Pizza</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default LogoAvatar;

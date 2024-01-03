"use client";

import React from "react";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

type Props = {
  className: string | string[];
};

const RegisterSubmitButton = ({ className }: Props) => {
  const { pending } = useFormStatus();

  console.log("pending", pending);

  return (
    <div className={cn("relative", className)}>
      <Button
        className="w-full flex gap-4"
        aria-disabled={pending}
        disabled={pending}
      >
        <ReloadIcon
          className={cn("ml-auto h-5 w-5 text-gray-50", {
            "animate-spin": pending,
            hidden: !pending,
          })}
        />
        <span className=""> Submit</span>
      </Button>
    </div>
  );
};

export default RegisterSubmitButton;

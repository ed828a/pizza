"use client";

import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { useSession } from "next-auth/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  className?: string;
};

const RegisterButton = ({ className }: Props) => {
  const { data: session, status } = useSession();
  console.log("RegisterButton status", status);
  const router = useRouter();
  const pathname = usePathname();
  const disabled = pathname.includes("/register") || status === "loading";

  return (
    <>
      {session ? null : (
        <Button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "text-primary border-primary hover:text-white hover:bg-primary transition-all duration-300",
            { "text-gray-500 border-gray-500": disabled },
            className
          )}
          disabled={disabled}
          onClick={() => {
            router.push("/register");
          }}
        >
          Register
        </Button>
      )}
    </>
  );
};

export default RegisterButton;

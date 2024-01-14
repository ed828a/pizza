"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Props = {
  children: ReactNode;
  href: string;
};

const LinkButton = ({ children, href }: Props) => {
  const pathname = usePathname();
  return (
    <Link
      className={cn(
        buttonVariants({ variant: "outline" }),
        {
          active: pathname.startsWith(href),
        },
        "text-primary rounded-full",
        "hover:text-primary hover:border-primary hover:dark:text-inherit"
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default LinkButton;

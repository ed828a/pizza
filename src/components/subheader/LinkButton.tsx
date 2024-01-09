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
        "text-primary hover:border-primary ",
        buttonVariants({ variant: "outline" }),
        {
          active: pathname.startsWith(href),
        },
        "hover:text-primary hover:dark:text-inherit rounded-full"
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default LinkButton;

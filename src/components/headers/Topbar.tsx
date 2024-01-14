"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { cn, dancingScript } from "@/lib/utils";
import { ModeToggleButton } from "./ModeToggleButton";
import Image from "next/image";
import SignInOutButton from "./SignInOutButton";
import RegisterButton from "./RegisterButton";
import MobileMenu from "./MobileMenu";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import { useSession } from "next-auth/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { CartContext } from "../contexts/CartContextProvider";
import { buttonVariants } from "../ui/button";

type Props = {};

const Topbar = (props: Props) => {
  const userName = "edward";
  const { data: session } = useSession();
  console.log("Topbar session", session);

  const { cartProducts } = useContext(CartContext) as CartContextType;

  return (
    <div className="pt-4 ">
      <header className="flex justify-between items-center relative">
        <div className="flex items-center gap-16">
          <Link href="/" className={cn("text-primary font-semibold text-2xl")}>
            <div className="rounded-full">
              <Image
                src={"/hand_made_pizza_logo.png"}
                width={58}
                height={40}
                alt="logo"
                priority
              />
            </div>
          </Link>

          <Link
            href={"/profile"}
            className={`${dancingScript.className} whitespace-nowrap font-semibold hidden lg:flex gap-4 items-center text-3xl`}
          >
            <span className={``}>Welcome</span>
            <span className="text-primary capitalize font-bold text-3xl">
              {userName}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-gray-400 font-semibold">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link className="hover:text-primary" href="/menu">
              Menu
            </Link>
            <Link className="hover:text-primary" href="/#about">
              About
            </Link>
            <Link className="hover:text-primary" href="/#contact">
              Contact
            </Link>
          </nav>
        </div>

        <div>
          <nav className="flex items-center xs:gap-2 sm:gap-4 text-gray-400 font-semibold">
            <Link href={"/cart"} className="relative group">
              <ShoppingCartIcon className="w-8 h-8 group-hover:text-primary" />
              {cartProducts.length > 0 && (
                <span className="absolute -top-1 -right-3 text-xs bg-primary rounded-full text-white leading-3 px-2 py-1 ">
                  {cartProducts.length}
                </span>
              )}
            </Link>
            {session ? <ProfileDropdownMenu /> : null}

            <div className="hidden sm:flex gap-4 ">
              <RegisterButton />
              <SignInOutButton />
            </div>
            <ModeToggleButton />

            <div className="block sm:hidden">
              <MobileMenu userName={userName} />
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Topbar;

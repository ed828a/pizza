"use client";

import Link from "next/link";
import React from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { cn, dancingScript } from "@/lib/utils";
import { ModeToggleButton } from "./ModeToggleButton";
import Image from "next/image";
import LogoAvatar from "./LogoAvatar";
import { Button } from "../ui/button";
import SignInOutButton from "./SignInOutButton";
import RegisterButton from "./RegisterButton";

type Props = {};

const Topbar = (props: Props) => {
  const userName = "edward";
  const signOut = () => {};
  const showMobileNav = "showMobileNav";
  const status = "authenticated";

  return (
    <div>
      <header className="flex justify-between items-center relative">
        <div className="flex items-center gap-16">
          <Link href="/" className="text-primary font-semibold text-2xl">
            <div className=" rounded-full">
              {/* <LogoAvatar /> */}
              <Image
                src={"/hand_made_pizza_logo.png"}
                width={58}
                height={40}
                alt="logo"
              />
            </div>
          </Link>

          <Link
            href={"/profile"}
            className={`${dancingScript.className} whitespace-nowrap font-semibold hidden sm:flex gap-4 items-center `}
          >
            <span className={`text-primary text-3xl`}>Welcome</span>
            <span className="capitalize font-bold text-3xl">{userName}</span>
          </Link>

          <nav className="hidden sm:flex items-center gap-8 text-gray-400 font-semibold">
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/#about">About</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        </div>

        <div>
          <nav className="flex items-center sm:gap-4 text-gray-400 font-semibold">
            <div className="hidden sm:flex gap-4 ">
              <RegisterButton />
              <SignInOutButton />
            </div>
            <ModeToggleButton />

            <div className="block sm:hidden">
              <button
                type="button"
                className="border-0 px-4"
                onClick={() => {
                  console.log("sandwitch called", showMobileNav);
                  // setShowMobileNav((prev) => !prev);
                }}
              >
                <HamburgerMenuIcon />
              </button>
            </div>

            {/* <Link href={"/cart"} className="relative">
              <ShoppingCart className="w-8 h-8" />
              {cartProducts.length > 0 && (
                <span className="absolute -top-1 -right-3 text-xs bg-primary rounded-full text-white leading-3 px-2 py-1 ">
                  {cartProducts.length}
                </span>
              )}
            </Link> */}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Topbar;

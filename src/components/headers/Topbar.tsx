"use client";

import Link from "next/link";
import React from "react";
import { dancingScript } from "@/lib/utils";
import { ModeToggleButton } from "./ModeToggleButton";
import Image from "next/image";
import SignInOutButton from "./SignInOutButton";
import RegisterButton from "./RegisterButton";
import MobileMenu from "./MobileMenu";
import ProfileAvatar from "./ProfileAvatar";
import ProfileDropdownMenu from "./ProfileDropdownMenu";

type Props = {};

const Topbar = (props: Props) => {
  const userName = "edward";
  const showMobileNav = "showMobileNav";

  return (
    <div className="pt-4 ">
      <header className="flex justify-between items-center relative">
        <div className="flex items-center gap-16">
          <Link href="/" className="text-primary font-semibold text-2xl">
            <div className=" rounded-full">
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
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/#about">About</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
        </div>

        <div>
          <nav className="flex items-center xs:gap-2 sm:gap-4 text-gray-400 font-semibold">
            <ProfileDropdownMenu />
            <div className="hidden sm:flex gap-4 ">
              <RegisterButton />
              <SignInOutButton />
            </div>
            <ModeToggleButton />

            <div className="block sm:hidden">
              <MobileMenu userName={userName} />
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

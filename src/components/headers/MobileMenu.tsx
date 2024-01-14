"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, dancingScript } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import RegisterButton from "./RegisterButton";
import SignInOutButton from "./SignInOutButton";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
  userName: string;
};

const MobileMenu = ({ userName }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="hover:border-primary">
          <HamburgerMenuIcon className="text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 mr-4 mt-2 bg-gray-50 dark:bg-gray-900/90">
        <DropdownMenuLabel
          className={cn(dancingScript.className, "w-full flex gap-4 text-xl")}
        >
          <span className={``}>Welcome</span>
          <span className="text-primary capitalize font-bold text-xl">
            {userName}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/")}>
            Home
            <DropdownMenuShortcut>⇧⌘H</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/menu")}>
            Menu
            <DropdownMenuShortcut>⌘M</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/#about")}>
            About
            <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/#contact")}>
            Contact
            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {session ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                Profile
                <DropdownMenuShortcut>⌘+P</DropdownMenuShortcut>
              </DropdownMenuItem>

              {session.user.role === "admin" ? (
                <>
                  <DropdownMenuItem onClick={() => router.push("/categories")}>
                    Categories
                    <DropdownMenuShortcut>⌘+K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/menu-items")}>
                    Menu Items
                    <DropdownMenuShortcut>⌘+I</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/users")}>
                    Users
                    <DropdownMenuShortcut>⌘+U</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </>
              ) : null}

              <DropdownMenuItem onClick={() => router.push("/orders")}>
                Orders
                <DropdownMenuShortcut>⌘+O</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        ) : null}

        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Email</DropdownMenuItem>
              <DropdownMenuItem>Message</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>More...</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={cn("flex", "justify-between")}>
          <RegisterButton className="" />
          <SignInOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileMenu;

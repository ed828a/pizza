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
import RegisterButton from "./RegisterButton";
import SignInOutButton from "./SignInOutButton";
import { useRouter } from "next/navigation";
import ProfileAvatar from "./ProfileAvatar";

type Props = {
  userName: string;
};

const ProfileDropdownMenu = ({ userName }: Props) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="">
          <ProfileAvatar />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4 mt-2 bg-gray-50 dark:bg-inherit">
        <DropdownMenuLabel
          className={cn(dancingScript.className, "w-full flex gap-4 text-xl")}
        >
          <span className="text-primary capitalize font-bold text-xl">
            Profile
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            Profile Editor
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/categories")}>
            Categories
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/menu-items")}>
            Menu Items
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/users")}>
            Users
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/orders")}>
            Orders
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdownMenu;

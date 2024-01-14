import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";

export type UserCellType = {
  id: string;
  email: string;
  name: string;
};

type Props = {
  user: UserCellType;
};

const UserListCell = ({ user }: Props) => {
  return (
    <div className="min-w-96 w-[320px] sm:w-[512px] bg-gray-200 rounded-lg mb-2 py-2  px-4 flex justify-between items-center dark:bg-inherit dark:border">
      <div className="flex flex-col">
        <div className="text-gray-700 dark:text-white">
          {!!user.name ? (
            <span>{user.name}</span>
          ) : (
            <span className="italic">{"No name"}</span>
          )}
        </div>

        <span className="text-gray-400 dark:text-white">{user.email}</span>
      </div>
      <div className="">
        <Link
          className={cn(
            buttonVariants({ variant: "outline" }),
            "block w-full text-gray-700 font-semibold border border-gray-300 rounded-xl px-6 py-2",
            "hover:border-primary hover:text-primary",
            "dark:bg-inherit dark:text-white"
          )}
          href={`/users/${user.id}/edit`}
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default UserListCell;

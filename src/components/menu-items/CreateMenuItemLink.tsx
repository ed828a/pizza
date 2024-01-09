import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

type Props = {};

const CreateMenuItemLink = (props: Props) => {
  return (
    <div className=" ">
      <div className="xs:min-w-[320px] md:min-w-[512px] mx-auto">
        <Link
          href={"/menu-items/new-item"}
          className="flex justify-center gap-8 w-full text-gray-700 font-semibold border border-gray-300 rounded-xl px-6 py-2"
        >
          <span>Create new menu item</span>
          <ArrowRightIcon className="w-6 h-6 rounded-full border-2 border-gray-400" />
        </Link>
      </div>
    </div>
  );
};

export default CreateMenuItemLink;

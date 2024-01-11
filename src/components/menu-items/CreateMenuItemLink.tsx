import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

type Props = {};

const CreateMenuItemLink = (props: Props) => {
  return (
    <div className="group ">
      <div className="xs:min-w-[320px] md:min-w-[512px] mx-auto">
        <Link
          href={"/menu-items/new-item"}
          className="flex justify-center gap-8 w-full text-gray-700 font-semibold border border-gray-300 hover:border-primary rounded-xl px-6 py-2 "
        >
          <span className="group-hover:text-primary">Create new menu item</span>
          <ArrowRightIcon className="w-6 h-6 border-2 rounded-full border-gray-400 group-hover:border-primary group-hover:text-primary " />
        </Link>
      </div>
    </div>
  );
};

export default CreateMenuItemLink;

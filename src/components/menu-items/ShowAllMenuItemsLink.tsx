import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

type Props = {};

const ShowAllMenuItemsLink = (props: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 xs:min-w-[320px] md:min-w-[512px] mx-auto">
      <div className="group ">
        <Link
          href={"/menu-items"}
          className="flex justify-center gap-8 w-full text-gray-700 group-hover:text-primary font-semibold border border-gray-300 group-hover:border-primary rounded-xl px-6 py-2"
        >
          <ArrowLeftIcon className="w-6 h-6 rounded-full border-2 border-gray-400 group-hover:border-primary group-hover:text-primary" />
          <span>Show all menu items</span>
        </Link>
      </div>
      <div className="flex gap-4">
        <div className="group">
          <Link
            href={"/menu-items/sizes"}
            className="flex justify-center gap-2 w-full text-gray-700 font-semibold border border-gray-300 group-hover:border-primary rounded-xl px-6 py-2"
          >
            <span className="group-hover:text-primary">Sizes</span>
            <ArrowRightIcon className="w-6 h-6 rounded-full border-2 border-gray-400 group-hover:border-primary group-hover:text-primary" />
          </Link>
        </div>
        <div className="group">
          <Link
            href={"/menu-items/extra-gredients"}
            className="flex justify-center gap-2 w-full text-gray-700 font-semibold border border-gray-300 rounded-xl px-6 py-2 group-hover:border-primary "
          >
            <span className="group-hover:text-primary">Extra Ingredients</span>
            <ArrowRightIcon className="w-6 h-6 rounded-full border-2 border-gray-400 group-hover:text-primary group-hover:border-primary" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowAllMenuItemsLink;

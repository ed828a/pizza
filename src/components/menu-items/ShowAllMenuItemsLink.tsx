import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

type Props = {};

const ShowAllMenuItemsLink = (props: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 xs:min-w-[320px] md:min-w-[512px] mx-auto">
      <div className=" ">
        <Link
          href={"/menu-items"}
          className="flex justify-center gap-8 w-full text-gray-700 font-semibold border border-gray-300 rounded-xl px-6 py-2"
        >
          <ArrowLeftIcon className="w-6 h-6 rounded-full border-2 border-gray-400" />
          <span>Show all menu items</span>
        </Link>
      </div>
      <div className="flex gap-4">
        <div className="">
          <Link
            href={"/menu-items/sizes"}
            className="flex justify-center gap-2 w-full text-gray-700 font-semibold border border-gray-300 rounded-xl px-6 py-2"
          >
            <span>Sizes</span>
            <ArrowRightIcon className="w-6 h-6 rounded-full border-2 border-gray-400" />
          </Link>
        </div>
        <div className="">
          <Link
            href={"/menu-items/extra-gredients"}
            className="flex justify-center gap-2 w-full text-gray-700 font-semibold border border-gray-300 rounded-xl px-6 py-2 "
          >
            <span>Extra Ingredients</span>
            <ArrowRightIcon className="w-6 h-6 rounded-full border-2 border-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowAllMenuItemsLink;

import React from "react";
import Right from "../icons/Right";
import Image from "next/image";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="grid grid-cols-10 mt-4 min-w-sm">
      <div className="py-12 col-span-10 sm:col-span-4">
        <h1 className="text-center sm:text-left text-4xl font-semibold">
          Everything <br className="hidden sm:block" />
          is better <br /> with a <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm text-center sm:text-left">
          Pizza is the missing piece that makes every complete, a simple yet
          delicious joy in life
        </p>
        <div className="flex justify-center gap-x-8 text-sm w-full">
          <Link
            href="/menu"
            className="group bg-primary border-primary border hover:bg-inherit text-white px-6 py-2 rounded-full "
          >
            <div className="flex items-center justify-center gap-2">
              <span className="uppercase whitespace-nowrap group-hover:text-primary ">
                Order now
              </span>
              <ArrowRightCircleIcon className="w-6 h-6 group-hover:text-primary" />
            </div>
          </Link>
          <Link
            href="/menu"
            className="group bg-inherit border-transparent border hover:border-primary text-white px-6 py-2 rounded-full "
          >
            <div className="flex items-center justify-center gap-2">
              <span className="whitespace-nowrap text-gray-600 font-semibold group-hover:text-primary ">
                Learn more
              </span>
              <ArrowRightCircleIcon className="w-6 h-6 text-gray-800 group-hover:text-primary" />
            </div>
          </Link>
        </div>
      </div>

      <div className="relative hidden sm:block sm:col-span-6">
        <Image
          src="/images/pizza.png"
          fill
          className="object-contain"
          alt="pizza image"
        />
      </div>
    </div>
  );
};

export default Hero;

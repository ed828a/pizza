import KickOutIcon from "@/components/icons/KickOut";
import { cn, merriweather } from "@/lib/utils";
import React from "react";

type Props = {};

const UnauthorizedPage = (props: Props) => {
  return (
    <section className="h-full flex justify-center items-center">
      <div className="rounded-lg bg-primary -mt-12">
        <div className="flex justify-center items-center gap-12 py-12 px-24">
          <div className="flex flex-col items-center text-white">
            <h1 className="text-[184px] ">401</h1>
            <h3 className="text-4xl uppercase -mt-10">unauthorized</h3>
          </div>
          <div className="">
            <KickOutIcon colorInHex="#ffffff" className="" />
          </div>
        </div>
        <div className="bg-white w-full p-6">
          <h1
            className={cn(
              "text-xl uppercase text-center font-bold dark:text-primary",
              merriweather.className
            )}
          >
            access is allowed only for authorized users
          </h1>
        </div>
        <div className="w-full h-10"></div>
      </div>
    </section>
  );
};

export default UnauthorizedPage;
